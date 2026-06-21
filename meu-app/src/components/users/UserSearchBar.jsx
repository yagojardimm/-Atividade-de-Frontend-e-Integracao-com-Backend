import { Search } from 'lucide-react';

export function UserSearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="flex bg-white p-5 rounded-2xl shadow-sm border border-slate-100 items-center">
      <div className="relative w-full max-w-2xl">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type="text"
          placeholder="Localize contas através do nome de usuário ou permissão..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-700 shadow-inner transition-all font-medium"
        />
      </div>
    </div>
  );
}
