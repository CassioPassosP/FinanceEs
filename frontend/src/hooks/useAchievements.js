export const useAchievements = () => {
  return {
    allAchievements: [],
    unlockedAchievements: [],
    lockedAchievements: [],
    userAchievements: [],
    loading: false,
    refreshAchievements: () => {}
  };
};
