import * as Icons from 'lucide-react';

export const RecentTransactions = ({ transactions }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  const getIcon = (iconName) => {
    const Icon = Icons[iconName] || Icons.Circle;
    return Icon;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Transações Recentes
      </h3>
      <div className="space-y-3">
        {transactions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Nenhuma transação registrada</p>
            <p className="text-sm text-gray-400 mt-1">Comece adicionando suas primeiras movimentações!</p>
          </div>
        ) : (
          transactions.map(transaction => {
            const Icon = getIcon(transaction.categories?.icon);
            const isIncome = transaction.type === 'income';

            return (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${transaction.categories?.color}20` }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: transaction.categories?.color }}
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {transaction.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      {transaction.categories?.name} • {formatDate(transaction.date)}
                    </p>
                  </div>
                </div>
                <span
                  className={`font-semibold ${
                    isIncome ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {isIncome ? '+' : '-'} {formatCurrency(transaction.amount)}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
