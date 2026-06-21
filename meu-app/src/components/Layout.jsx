import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Users, Package, LogOut, Menu, X, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

export function Layout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isAdmin = user?.funcao?.toLowerCase() === 'admin';

  const navigation = [
    ...(isAdmin ? [{ name: 'Colaboradores', href: '/colaboradores', icon: Users }] : []),
    { name: 'Inventário', href: '/inventario', icon: Package },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-white shadow-sm border-b border-slate-100 p-4 flex justify-between items-center relative z-20">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-indigo-600" />
          <h1 className="text-xl font-extrabold text-slate-800 tracking-tight">CorpPanel</h1>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-10 md:hidden" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} 
        flex flex-col bg-white border-r border-slate-100 shadow-xl md:shadow-none shadow-slate-200/50 fixed md:relative z-20 h-full w-72 transition-transform duration-300 ease-in-out
      `}>
        <div className="p-8 hidden md:flex items-center gap-3">
          <ShieldCheck className="h-8 w-8 text-indigo-600" />
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">CorpPanel</h1>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 mt-16 md:mt-0">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`
                  flex items-center px-4 py-3.5 text-sm font-bold rounded-xl transition-all
                  ${isActive 
                    ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100/50' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }
                `}
              >
                <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center px-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-200 border border-indigo-300 flex flex-shrink-0 items-center justify-center text-indigo-700 font-bold">
              {user?.user?.charAt(0).toUpperCase()}
            </div>
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-bold text-slate-800 truncate">{user?.user || 'Usuário'}</p>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5 truncate">{user?.funcao}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex w-full items-center justify-center px-4 py-2.5 text-sm font-bold text-rose-600 bg-white border border-rose-100 rounded-xl hover:bg-rose-50 active:scale-95 transition-all shadow-sm"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Encerrar Sessão
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-0 overflow-hidden bg-slate-50">
        <div className="flex-1 overflow-y-auto p-4 md:p-8 w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
