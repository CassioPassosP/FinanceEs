import { useMemo } from 'react';
import { useTransactions } from '../../hooks/useTransactions';
import { useCategories } from '../../hooks/useCategories';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const ReportsPage = () => {
  const { transactions } = useTransactions();
  const { categories } = useCategories();

  const monthlyData = useMemo(() => {
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      months.push({
        month: date.getMonth(),
        year: date.getFullYear(),
        label: date.toLocaleDateString('pt-BR', {
          month: 'short',
          year: '2-digit',
        }),
      });
    }

    return months.map(({ month, year, label }) => {
      const monthTransactions = (transactions || []).filter((t) => {
        const tDate = new Date(t.date);
        return (
          tDate.getMonth() === month && tDate.getFullYear() === year
        );
      });

      const income = monthTransactions
        .filter((t) => t.type === 'income')
        .reduce((sum, t) => sum + Number(t.amount || 0), 0);

      const expenses = monthTransactions
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + Number(t.amount || 0), 0);

      return { label, income, expenses, balance: income - expenses };
    });
  }, [transactions]);

  const categoryData = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // mapa id -> categoria (pra pegar nome/cor pela transaction.category_id)
    const categoriesMap = new Map(
      (categories || []).map((c) => [c.id, c])
    );

    const monthTransactions = (transactions || []).filter((t) => {
      const date = new Date(t.date);
      return (
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear &&
        t.type === 'expense'
      );
    });

    const expensesByCategory = {};

    monthTransactions.forEach((t) => {
      const cat = categoriesMap.get(t.category_id);
      const categoryName = cat?.name || 'Outros';
      const color = cat?.color || '#6B7280';

      if (!expensesByCategory[categoryName]) {
        expensesByCategory[categoryName] = {
          amount: 0,
          color,
        };
      }
      expensesByCategory[categoryName].amount += Number(t.amount || 0);
    });

    return expensesByCategory;
  }, [transactions, categories]);

  const barChartData = {
    labels: monthlyData.map((d) => d.label),
    datasets: [
      {
        label: 'Receitas',
        data: monthlyData.map((d) => d.income),
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
      },
      {
        label: 'Despesas',
        data: monthlyData.map((d) => d.expenses),
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
      },
    ],
  };

  const categoryLabels = Object.keys(categoryData);
  const categoryValues = Object.values(categoryData).map(c => c.amount);

  // paleta de cores fixa (pode ajustar se quiser)
  const palette = [
    '#22c55e', // verde
    '#ef4444', // vermelho
    '#3b82f6', // azul
    '#eab308', // amarelo
    '#ec4899', // rosa
    '#8b5cf6', // roxo
    '#14b8a6', // teal
    '#f97316', // laranja
    '#64748b', // cinza
  ];

  const doughnutData = {
    labels: categoryLabels,
    datasets: [
      {
        data: categoryValues,
        backgroundColor: categoryLabels.map(
          (_, idx) => palette[idx % palette.length]
        ),
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  };


  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            label += new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(context.parsed.y || context.parsed || 0);
            return label;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return 'R$ ' + Number(value).toLocaleString('pt-BR');
          },
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(context.parsed || 0);
            const total = context.dataset.data.reduce(
              (a, b) => a + b,
              0
            );
            const percentage = total
              ? ((context.parsed / total) * 100).toFixed(1)
              : 0;
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Relatórios</h2>
        <p className="text-gray-600 mt-1">
          Análise detalhada das suas finanças
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Evolução Mensal (Últimos 6 meses)
          </h3>
          <div className="h-80">
            <Bar data={barChartData} options={chartOptions} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Despesas por Categoria (Mês Atual)
          </h3>
          <div className="h-80">
            {Object.keys(categoryData).length > 0 ? (
              <Doughnut data={doughnutData} options={doughnutOptions} />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Nenhuma despesa registrada neste mês
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Resumo Mensal
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Mês
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                  Receitas
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                  Despesas
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                  Saldo
                </th>
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((data, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4 text-sm text-gray-900 capitalize">
                    {data.label}
                  </td>
                  <td className="py-3 px-4 text-sm text-right text-green-600 font-medium">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(data.income)}
                  </td>
                  <td className="py-3 px-4 text-sm text-right text-red-600 font-medium">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(data.expenses)}
                  </td>
                  <td
                    className={`py-3 px-4 text-sm text-right font-semibold ${
                      data.balance >= 0
                        ? 'text-blue-600'
                        : 'text-red-600'
                    }`}
                  >
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(data.balance)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
