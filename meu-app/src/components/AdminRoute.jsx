import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function AdminRoute() {
  const { user } = useAuth();

  return user && user.funcao === 'admin' ? <Outlet /> : <Navigate to="/inventario" replace />;
}
