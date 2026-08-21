// src/App.jsx
import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';

import { LoginForm } from './components/Auth/LoginForm';
import { RegisterForm } from './components/Auth/RegisterForm';

import { Header } from './components/Layout/Header';
import { Navigation } from './components/Layout/Navigation';
import { Dashboard } from './components/Dashboard/Dashboard';
import { TransactionsPage } from './components/Transactions/TransactionsPage';
import { GoalsPage } from './components/Goals/GoalsPage';
import { ReportsPage } from './components/Reports/ReportsPage';
import { AchievementsPage } from './components/Achievements/AchievementsPage';
import { NotificationsPage } from './components/Notifications/NotificationsPage';
import { ProfilePage } from './components/Profile/ProfilePage';

function AuthScreen() {
  const [mode, setMode] = useState('login');
  const { signIn, signUp } = useAuth();

  const handleLogin = async (email, password) => {
    await signIn(email, password);
    // se der erro, o signIn lança e o LoginForm mostra a mensagem
  };

  // ordem: fullName, email, password, profileType
  const handleRegister = async (fullName, email, password, profileType) => {
    await signUp(fullName, email, password, profileType);
    // signUp já faz login automático via signIn
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex items-center justify-center">
        {/* Lado esquerdo – texto e cards */}
        <div className="hidden lg:block lg:w-1/2 pr-12">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl">
                <span className="text-white font-bold text-3xl">$</span>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">FinanceEs</h1>
                <p className="text-gray-600">Gestão Financeira Pessoal</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Controle Total</h3>
                <p className="text-gray-600 text-sm">
                  Gerencie suas receitas e despesas com facilidade
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Metas Financeiras</h3>
                <p className="text-gray-600 text-sm">
                  Defina objetivos e acompanhe seu progresso
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Gamificação</h3>
                <p className="text-gray-600 text-sm">
                  Ganhe pontos e conquistas enquanto melhora suas finanças
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Lado direito – login / registro */}
        <div className="w-full lg:w-1/2">
          {mode === 'login' ? (
            <LoginForm
              onSubmit={handleLogin}
              onToggleMode={() => setMode('register')}
            />
          ) : (
            <RegisterForm
              onSubmit={handleRegister}
              onToggleMode={() => setMode('login')}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function MainApp() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'transactions':
        return <TransactionsPage />;
      case 'goals':
        return <GoalsPage />;
      case 'reports':
        return <ReportsPage />;
      case 'achievements':
        return <AchievementsPage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNavigate={setCurrentPage} currentPage={currentPage} />
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="pb-8">
        {renderPage()}
      </main>
    </div>
  );
}

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent" />
          <p className="text-gray-600 mt-4">Carregando...</p>
        </div>
      </div>
    );
  }

  // se user for truthy -> app logado
  return user ? <MainApp /> : <AuthScreen />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
