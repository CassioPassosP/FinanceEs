import { Home, TrendingUp, Target, BarChart3 } from 'lucide-react';

export const Navigation = ({ currentPage, onNavigate }) => {
  const navItems = [
    { id: 'dashboard', label: 'Painel', icon: Home },
    { id: 'transactions', label: 'Transações', icon: TrendingUp },
    { id: 'goals', label: 'Metas', icon: Target },
    { id: 'reports', label: 'Relatórios', icon: BarChart3 },
  ];

  return (
    <nav className="
      fixed bottom-0 left-0 right-0 z-50
    bg-white border-t border-gray-200
      md:static md:border-b md:border-t-0
    ">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex justify-around md:justify-start md:space-x-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`
                  flex flex-col md:flex-row items-center justify-center
                  text-xs md:text-sm
                  px-2 md:px-4 py-2 md:py-3
                  border-t-2 md:border-b-2 md:border-t-0
                  transition
                  ${isActive
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-600'}
                  `}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium hidden md:block">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
