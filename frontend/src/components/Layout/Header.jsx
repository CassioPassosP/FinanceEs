import { Bell, LogOut, User, Award } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../hooks/useNotifications';

export const Header = ({ onNavigate, currentPage }) => {
  const { profile, signOut } = useAuth();
  const { unreadCount } = useNotifications();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg">
              <span className="text-white font-bold text-lg">$</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">FinanceFlow</h1>
              <p className="text-xs text-gray-500">Gestão Financeira</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => onNavigate('achievements')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition ${
                currentPage === 'achievements'
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Award className="w-5 h-5" />
              <span className="hidden sm:inline text-sm font-medium">Conquistas</span>
            </button>

            <button
              onClick={() => onNavigate('notifications')}
              className="relative p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            <div className="flex items-center space-x-3 border-l border-gray-200 pl-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{profile?.full_name}</p>
                <p className="text-xs text-gray-500">
                  Nível {profile?.current_level} • {profile?.total_points} pts
                </p>
              </div>
              <button
                onClick={() => onNavigate('profile')}
                className={`p-2 rounded-lg transition ${
                  currentPage === 'profile'
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <User className="w-5 h-5" />
              </button>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition"
                title="Sair"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
