import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const useAchievements = () => {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState([]);
  const [userAchievements, setUserAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAchievements = async () => {
    if (!user) {
      setAchievements([]);
      setUserAchievements([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const [allAchievementsRes, userAchievementsRes] = await Promise.all([
        supabase.from('achievements').select('*').order('points', { ascending: true }),
        supabase
          .from('user_achievements')
          .select('*, achievements(*)')
          .eq('user_id', user.id)
          .order('unlocked_at', { ascending: false })
      ]);

      if (allAchievementsRes.error) throw allAchievementsRes.error;
      if (userAchievementsRes.error) throw userAchievementsRes.error;

      setAchievements(allAchievementsRes.data || []);
      setUserAchievements(userAchievementsRes.data || []);
    } catch (err) {
      console.error('Error loading achievements:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAchievements();
  }, [user]);

  const unlockedIds = new Set(userAchievements.map(ua => ua.achievement_id));
  const unlockedAchievements = userAchievements.map(ua => ua.achievements);
  const lockedAchievements = achievements.filter(a => !unlockedIds.has(a.id));

  return {
    allAchievements: achievements,
    unlockedAchievements,
    lockedAchievements,
    userAchievements,
    loading,
    refreshAchievements: loadAchievements
  };
};
