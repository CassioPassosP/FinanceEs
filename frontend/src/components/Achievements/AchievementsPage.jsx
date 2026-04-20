import { useAchievements } from '../../hooks/useAchievements';
import { AchievementCard } from './AchievementCard';
import { Trophy } from 'lucide-react';

export const AchievementsPage = () => {
  const { unlockedAchievements, lockedAchievements, loading } = useAchievements();

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-gray-500">Carregando conquistas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <Trophy className="w-8 h-8 text-yellow-500" />
          <h2 className="text-2xl font-bold text-gray-900">Conquistas</h2>
        </div>
        <p className="text-gray-600">
          Você desbloqueou {unlockedAchievements.length} de{' '}
          {unlockedAchievements.length + lockedAchievements.length} conquistas
        </p>
      </div>

      {unlockedAchievements.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Desbloqueadas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {unlockedAchievements.map(achievement => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                unlocked={true}
              />
            ))}
          </div>
        </div>
      )}

      {lockedAchievements.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Bloqueadas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lockedAchievements.map(achievement => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                unlocked={false}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
