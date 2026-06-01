'use client';

import React from 'react';
import Team from '@/components/team/Team';
import { useTeamEditor } from '@/hooks/useTeamEditor';

const TeamEditor = () => {
  const { teamProps, pokemonListError } = useTeamEditor();

  return (
    <>
      {pokemonListError ? (
        <p style={{ color: '#c00', fontSize: 13, marginBottom: 8 }}>
          {pokemonListError}
        </p>
      ) : null}
      <Team {...teamProps} />
    </>
  );
};

export default TeamEditor;
