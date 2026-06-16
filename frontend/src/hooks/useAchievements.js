import { useAuth } from '../contexts/AuthContext';

export const ACHIEVEMENTS = [
  {
    id: 'FIRST_INCOME',
    title: 'Primeira Receita',
    description: 'Cadastre sua primeira receita',
    points: 30
  },
  {
    id: 'FIRST_EXPENSE',
    title: 'Primeira Despesa',
    description: 'Cadastre sua primeira despesa',
    points: 30
  },
  {
    id: 'FIRST_FINANCIAL_GOAL',
    title: 'Primeira Meta',
    description: 'Crie sua primeira meta financeira',
    points: 30
  },
  {
    id: 'TEN_TRANSACTIONS',
    title: 'Organizado',
    description: 'Cadastre 10 transações',
    points: 50
  },
  {
    id: 'FIFTY_TRANSACTIONS',
    title: 'Mestre do Controle',
    description: 'Cadastre 50 transações',
    points: 100
  },
  {
    id: 'GOAL_ACHIEVED',
    title: 'Meta Alcançada',
    description: 'Conclua uma meta financeira',
    points: 75
  }
];

export const useAchievements = () => {
  const { profile } = useAuth();

  const unlockedIds = profile?.achievements || [];

  const unlockedAchievements = ACHIEVEMENTS.filter(a =>
    unlockedIds.includes(a.id)
  );

  const lockedAchievements = ACHIEVEMENTS.filter(a =>
    !unlockedIds.includes(a.id)
  );

  return {
    allAchievements: ACHIEVEMENTS,
    unlockedAchievements,
    lockedAchievements,
    userAchievements: unlockedIds,
    loading: false,
    refreshAchievements: () => {}
  };
};