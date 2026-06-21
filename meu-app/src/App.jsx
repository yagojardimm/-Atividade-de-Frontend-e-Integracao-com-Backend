import { BrowserRouter as Router, useRoutes, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminRoute } from './components/AdminRoute';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';

import { UsersList } from './pages/UsersList';
import { ItemsList } from './pages/ItemsList';

function ApplicationRoutes() {
  const routesConfig = useRoutes([
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/',
      element: <ProtectedRoute />,
      children: [
        {
          element: <Layout />,
          children: [
            { path: '/', element: <Navigate to="/inventario" replace /> },
            { path: 'inventario', element: <ItemsList /> },
            {
              element: <AdminRoute />,
              children: [
                { path: 'colaboradores', element: <UsersList /> }
              ]
            }
          ]
        }
      ]
    },
    {
      path: '*',
      element: <Navigate to="/" replace />
    }
  ]);

  return routesConfig;
}

export default function App() {
  return (
    <Router>
      <ApplicationRoutes />
    </Router>
  );
}
