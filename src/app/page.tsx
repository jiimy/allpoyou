import PublicTeamFeed from '@/components/publicTeam/PublicTeamFeed';
import {
  getPublicTeamsFromDb,
  getUserLikedTeamIds,
} from '@/app/public-teams/actions';
import { getCurrentUser } from '@/utils/auth/dal';
import s from './main.module.scss';

export default async function Home() {
  const user = await getCurrentUser();
  const [teams, likedTeamIds] = await Promise.all([
    getPublicTeamsFromDb(),
    user ? getUserLikedTeamIds(user.id) : Promise.resolve([]),
  ]);

  return (
    <div>
      <PublicTeamFeed
        teams={teams}
        likedTeamIds={likedTeamIds}
        currentUserDbId={user?.id ?? null}
      />
    </div>
  );
}
