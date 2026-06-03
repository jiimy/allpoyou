'use client';

import React from 'react';
import Team from '@/components/team/Team';
import TeamSelector from '@/components/team/TeamSelector';
import { useTeamEditor } from '@/hooks/useTeamEditor';

const TeamEditor = () => {
  const { teamProps, pokemonListError, switchActiveTeam } = useTeamEditor();

  return (
    <>
      {pokemonListError ? (
        <p style={{ color: '#c00', fontSize: 13, marginBottom: 8 }}>
          {pokemonListError}
        </p>
      ) : null}
      <TeamSelector onSwitchTeam={switchActiveTeam} />
      <Team {...teamProps} />
    </>
  );
};

export default TeamEditor;
