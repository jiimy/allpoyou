'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState, useTransition } from 'react';
import cn from 'classnames';
import ModalFrame from '@/components/portalModal/ModalFrame';
import { loadUserTeamsFromDb, saveTeamToDb } from '@/app/make-team/actions';
import type { PublicTeam } from '@/app/public-teams/actions';
import {
  createDefaultTeams,
  MAX_TEAMS,
  usePokemonTeamStore,
  type SavedTeam,
} from '@/store/PokemonTeamStore';
import { hasTeamPokemonData } from '@/store/teamDbMappers';
import { cloneTeamPokemons } from '@/utils/cloneTeam';
import s from './cloneTeamModal.module.scss';

const TEAM_SIZE = 6;

function getTeamTitle(team: PublicTeam): string {
  return team.teamName || (team.teamSlot > 0 ? `팀 ${team.teamSlot}` : '저장된 팀');
}

function countFilledPokemon(team: SavedTeam | undefined): number {
  return team?.pokemons.filter((slot) => slot?.pokemonId != null).length ?? 0;
}

type CloneTeamModalProps = {
  team: PublicTeam;
  onClose: () => void;
};

export default function CloneTeamModal({ team, onClose }: CloneTeamModalProps) {
  const replaceTeamAtSlot = usePokemonTeamStore((state) => state.replaceTeamAtSlot);
  const hydrateTeamsFromServer = usePokemonTeamStore(
    (state) => state.hydrateTeamsFromServer,
  );

  const [userTeams, setUserTeams] = useState<SavedTeam[]>(() =>
    usePokemonTeamStore.getState().teams,
  );
  const [loadError, setLoadError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [successSlot, setSuccessSlot] = useState<number | null>(null);
  const [loadingTeams, setLoadingTeams] = useState(true);
  const [pendingSlot, setPendingSlot] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  const sourceTitle = getTeamTitle(team);
  const clonedPokemons = cloneTeamPokemons(team.pokemons);

  const handleModalChange: React.Dispatch<React.SetStateAction<boolean>> = (
    value,
  ) => {
    const next = typeof value === 'function' ? value(true) : value;
    if (!next) onClose();
  };

  useEffect(() => {
    let cancelled = false;

    loadUserTeamsFromDb()
      .then((result) => {
        if (cancelled) return;

        if (!result) {
          setUserTeams(usePokemonTeamStore.getState().teams);
          return;
        }

        if ('error' in result) {
          setLoadError(result.error);
          setUserTeams(usePokemonTeamStore.getState().teams);
          return;
        }

        const teams =
          result.hasDbRows || result.teams.some(hasTeamPokemonData)
            ? result.teams
            : createDefaultTeams();

        hydrateTeamsFromServer(teams);
        setUserTeams(teams);
      })
      .catch(() => {
        if (!cancelled) {
          setLoadError('팀 슬롯 정보를 불러오지 못했습니다.');
          setUserTeams(usePokemonTeamStore.getState().teams);
        }
      })
      .finally(() => {
        if (!cancelled) setLoadingTeams(false);
      });

    return () => {
      cancelled = true;
    };
  }, [hydrateTeamsFromServer]);

  const handleCloneToSlot = useCallback(
    (teamId: number) => {
      setActionError(null);
      setSuccessSlot(null);
      setPendingSlot(teamId);

      startTransition(async () => {
        const nextTeam: SavedTeam = {
          teamId,
          teamName: sourceTitle,
          pokemons: clonedPokemons,
        };

        replaceTeamAtSlot(teamId, sourceTitle, clonedPokemons);

        const saveResult = await saveTeamToDb(nextTeam);
        if ('error' in saveResult) {
          setActionError(saveResult.error);
          setPendingSlot(null);
          return;
        }

        setUserTeams((prev) =>
          prev.map((entry) => (entry.teamId === teamId ? nextTeam : entry)),
        );
        setSuccessSlot(teamId);
        setPendingSlot(null);
      });
    },
    [clonedPokemons, replaceTeamAtSlot, sourceTitle],
  );

  return (
    <ModalFrame
      setOnModal={handleModalChange}
      isDim
      dimClick
      onClose
      className={s.cloneModal}
    >
        <h2 className={s.title}>팀 복제</h2>
        <p className={s.subtitle}>
          <span className={s.sourceName}>{sourceTitle}</span>
          {team.ownerUsername ? ` · ${team.ownerUsername}` : null}
          <br />
          아래 슬롯 중 하나를 선택하면 해당 슬롯에 팀이 복제됩니다.
        </p>

        <div className={s.preview}>
          {clonedPokemons.map((slot, index) => (
            <div
              key={index}
              className={cn(s.previewSlot, { [s.previewEmpty]: !slot })}
            >
              {slot?.nameKo ?? `빈 슬롯 ${index + 1}`}
            </div>
          ))}
        </div>

        <p className={s.sectionLabel}>복제할 슬롯 선택</p>

        {loadingTeams ? (
          <p className={s.loading}>슬롯 정보 불러오는 중…</p>
        ) : (
          <div className={s.slotGrid}>
            {Array.from({ length: MAX_TEAMS }, (_, index) => {
              const teamId = index + 1;
              const slotTeam = userTeams.find((entry) => entry.teamId === teamId);
              const slotLabel = slotTeam?.teamName?.trim() || '비어 있음';
              const pokemonCount = countFilledPokemon(slotTeam);
              const hasData = hasTeamPokemonData(
                slotTeam ?? {
                  teamId,
                  teamName: '',
                  pokemons: [],
                },
              );

              return (
                <button
                  key={teamId}
                  type="button"
                  className={s.slotBtn}
                  disabled={isPending}
                  onClick={() => handleCloneToSlot(teamId)}
                >
                  <span className={s.slotNumber}>{teamId}</span>
                  <span
                    className={cn(s.slotName, {
                      [s.slotNameFilled]: hasData || Boolean(slotTeam?.teamName),
                    })}
                  >
                    {slotLabel}
                  </span>
                  <span
                    className={cn(s.slotPokemonCount, {
                      [s.slotPokemonCountFilled]: pokemonCount > 0,
                    })}
                  >
                    포켓몬 {pokemonCount}/{TEAM_SIZE}마리
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {loadError ? (
          <p className={cn(s.message, s.error)} role="alert">
            {loadError}
          </p>
        ) : null}

        {actionError ? (
          <p className={cn(s.message, s.error)} role="alert">
            {actionError}
          </p>
        ) : null}

        {successSlot != null ? (
          <p className={cn(s.message, s.success)} role="status">
            슬롯 {successSlot}에 팀이 복제되었습니다.
          </p>
        ) : null}

        {pendingSlot != null ? (
          <p className={s.loading}>슬롯 {pendingSlot}에 복제 중…</p>
        ) : null}

        <div className={s.actions}>
          {successSlot != null ? (
            <Link href="/make-team" className={s.linkBtn}>
              팀 만들기에서 보기
            </Link>
          ) : null}
          <button type="button" className={s.cancelBtn} onClick={onClose}>
            닫기
          </button>
        </div>
    </ModalFrame>
  );
}
