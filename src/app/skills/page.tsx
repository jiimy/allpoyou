import { Suspense } from 'react';

import MovesPageContent from '@/app/moves/MovesPageContent';

const SkillsPage = () => {
  return (
    <Suspense fallback={null}>
      <MovesPageContent />
    </Suspense>
  );
};

export default SkillsPage;
