import PublicTeamFeed from '@/components/publicTeam/PublicTeamFeed';
import {
  getPublicTeamsFromDb,
  getUserLikedTeamIds,
} from '@/app/public-teams/actions';
import { getCurrentUser } from '@/utils/auth/dal';

export default async function Home() {
  const user = await getCurrentUser();
  const [teams, likedTeamIds] = await Promise.all([
    getPublicTeamsFromDb(),
    user ? getUserLikedTeamIds(user.id) : Promise.resolve([]),
  ]);

  return (
    <div className="flex flex-col items-center justify-center flex-1 font-sans ">
      <PublicTeamFeed
        teams={teams}
        likedTeamIds={likedTeamIds}
        currentUserDbId={user?.id ?? null}
      />
    </div>
  );
}
