export const GoalsProgress = ({ goals }) => {
  const activeGoals = goals.filter(g => g.status === 'active').slice(0, 3);

  const getProgressPercentage = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Progresso das Metas
      </h3>
      <div className="space-y-4">
        {activeGoals.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Nenhuma meta ativa no momento</p>
            <p className="text-sm text-gray-400 mt-1">Crie uma meta para começar!</p>
          </div>
        ) : (
          activeGoals.map(goal => {
            const progress = getProgressPercentage(
              parseFloat(goal.current_amount),
              parseFloat(goal.target_amount)
            );

            return (
              <div key={goal.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">
                    {goal.title}
                  </span>
                  <span className="text-sm text-gray-600">
                    {progress.toFixed(0)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{formatCurrency(goal.current_amount)}</span>
                  <span>{formatCurrency(goal.target_amount)}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
