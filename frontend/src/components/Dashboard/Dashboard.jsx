import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Wallet, Target } from 'lucide-react';
import { useTransactions } from '../../hooks/useTransactions';
import { useGoals } from '../../hooks/useGoals';
import { useAuth } from '../../contexts/AuthContext';
import { StatCard } from './StatCard';
import { RecentTransactions } from './RecentTransactions';
import { FinancialChart } from './FinancialChart';
import { GoalsProgress } from './GoalsProgress';

export const Dashboard = () => {
  const { profile } = useAuth();
  const { transactions } = useTransactions();
  const { goals } = useGoals();
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
    activeGoals: 0
  });

  useEffect(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const monthTransactions = transactions.filter(t => {
      const date = new Date(t.date);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    });

    const income = monthTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);

    const expenses = monthTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);

    const activeGoalsCount = goals.filter(g => g.status === 'active').length;

    setStats({
      totalIncome: income,
      totalExpenses: expenses,
      balance: income - expenses,
      activeGoals: activeGoalsCount
    });
  }, [transactions, goals]);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          Olá, {profile?.name}!
        </h2>
        <p className="text-gray-600 mt-1">
          Aqui está um resumo das suas finanças este mês
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Receitas"
          value={stats.totalIncome}
          icon={TrendingUp}
          color="green"
        />
        <StatCard
          title="Despesas"
          value={stats.totalExpenses}
          icon={TrendingDown}
          color="red"
        />
        <StatCard
          title="Saldo"
          value={stats.balance}
          icon={Wallet}
          color={stats.balance >= 0 ? 'blue' : 'red'}
        />
        <StatCard
          title="Metas Ativas"
          value={stats.activeGoals}
          icon={Target}
          color="purple"
          isCount
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <FinancialChart transactions={transactions} />
        <GoalsProgress goals={goals} />
      </div>

      <RecentTransactions transactions={transactions.slice(0, 10)} />
    </div>
  );
};
