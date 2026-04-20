import * as Icons from 'lucide-react';
import { Lock } from 'lucide-react';

export const AchievementCard = ({ achievement, unlocked }) => {
  const getIcon = (iconName) => {
    const Icon = Icons[iconName] || Icons.Trophy;
    return Icon;
  };

  const Icon = getIcon(achievement.icon);

  const getRequirementText = (type, value) => {
    switch (type) {
      case 'transactions_count':
        return `Registre ${value} transaç${value === 1 ? 'ão' : 'ões'}`;
      case 'goals_created':
        return `Crie ${value} meta${value === 1 ? '' : 's'}`;
      case 'goals_completed':
        return `Complete ${value} meta${value === 1 ? '' : 's'}`;
      case 'savings_amount':
        return `Economize R$ ${value.toLocaleString('pt-BR')}`;
      default:
        return 'Requisito não especificado';
    }
  };

  return (
    <div
      className={`rounded-xl shadow-sm border-2 p-6 transition-all ${
        unlocked
          ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300'
          : 'bg-gray-50 border-gray-200 opacity-60'
      }`}
    >
      <div className="flex items-start space-x-4">
        <div
          className={`p-3 rounded-lg ${
            unlocked
              ? 'bg-yellow-100 text-yellow-600'
              : 'bg-gray-200 text-gray-400'
          }`}
        >
          {unlocked ? (
            <Icon className="w-8 h-8" />
          ) : (
            <Lock className="w-8 h-8" />
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">
            {achievement.title}
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            {achievement.description}
          </p>
          {!unlocked && (
            <p className="text-xs text-gray-500 italic">
              {getRequirementText(
                achievement.requirement_type,
                achievement.requirement_value
              )}
            </p>
          )}
          <div className="mt-3">
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                unlocked
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {achievement.points} pontos
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
