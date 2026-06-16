// frontend/src/components/Profile/ProfilePage.jsx
import { useState, useEffect } from 'react';
import { User, Award, TrendingUp, Save } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const ProfilePage = () => {
  const { profile, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    currentLevel: 1,
    name: '',
    totalPoints: '',
    profileType: 'moderado',
    monthlyBudget: ''
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        currentLevel: profile.currentLevel || 1,
        name: profile.name || '',
        totalPoints: profile.totalPoints ?? '',
        profileType: profile.profileType || 'moderado',
        monthlyBudget: profile.monthlyBudget ?? ''
      });
    }
  }, [profile]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
    ...prev,
    [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile(formData);
      setEditing(false);
    } catch (error) {
      alert('Erro ao atualizar perfil');
    } finally {
      setSaving(false);
    }
  };

  const totalPoints = profile?.totalPoints ?? 0;
  const currentLevel = profile?.currentLevel ?? 1;
  const levelProgress = ((totalPoints % 100) / 100) * 100;
  const pointsToNextLevel = 100 - (totalPoints % 100);

  const profileTypeLabels = {
    conservador: 'Conservador',
    moderado: 'Moderado',
    impulsivo: 'Impulsivo'
  };

  const profileTypeDescriptions = {
    conservador: 'Você prefere economizar e evitar riscos',
    moderado: 'Você busca equilíbrio entre gastar e poupar',
    impulsivo: 'Você tende a gastar com mais facilidade'
  };

  const profileLabel = profileTypeLabels[profile?.profileType] || 'Moderado';
  const profileDesc = profileTypeDescriptions[profile?.profileType] || profileTypeDescriptions.moderado;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Meu Perfil</h2>
        <p className="text-gray-600 mt-1">Gerencie suas informações pessoais</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-sm p-6 text-white">
          <div className="flex items-center space-x-3 mb-4">
            <Award className="w-8 h-8" />
            <div>
              <p className="text-sm opacity-90">Nível</p>
              <p className="text-3xl font-bold">{currentLevel}</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Progresso</span>
              <span>{totalPoints % 100}/100 pts</span>
            </div>
            <div className="w-full bg-white bg-opacity-30 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${levelProgress}%` }}
              ></div>
            </div>
            <p className="text-xs opacity-90">
              {pointsToNextLevel} pontos para o próximo nível
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-2">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Total de Pontos</h3>
          </div>
          <p className="text-3xl font-bold text-blue-600">{totalPoints}</p>
          <p className="text-sm text-gray-500 mt-1">Pontos acumulados</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-2">
            <User className="w-6 h-6 text-purple-600" />
            <h3 className="font-semibold text-gray-900">Perfil Financeiro</h3>
          </div>
          <p className="text-lg font-semibold text-purple-600">
            {profileLabel}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {profileDesc}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Informações Pessoais
          </h3>
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="px-4 py-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
            >
              Editar
            </button>
          )}
        </div>

        {editing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome Completo
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Perfil Financeiro
              </label>
              <select
                name="profileType"
                value={formData.profileType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="conservador">Conservador</option>
                <option value="moderado">Moderado</option>
                <option value="impulsivo">Impulsivo</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Orçamento Mensal
              </label>
              <input
                type="number"
                name="monthlyBudget"
                value={formData.monthlyBudget}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setEditing(false);
                  if (profile) {
                    setFormData({
                      name: profile.name || '',
                      profileType: profile.profileType || 'moderado',
                      monthlyBudget: profile.monthlyBudget ?? 0
                    });
                  }
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Salvando...' : 'Salvar'}</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Nome Completo
              </label>
              <p className="text-gray-900">{profile?.name}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Perfil Financeiro
              </label>
              <p className="text-gray-900">
                {profileLabel}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Orçamento Mensal
              </label>
              <p className="text-gray-900">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(profile?.monthlyBudget || 0)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
