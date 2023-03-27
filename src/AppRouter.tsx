import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routes from './constants/routes';
import RegisterManagement from './pages/admin/RegisterManagement';
import ListUser from './pages/ListUser';
import Register from './pages/Register';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.register.url} element={<Register />} />
        <Route path={routes.listUser.url} element={<ListUser />} />
        <Route path={routes.registerManagement.url} element={<RegisterManagement />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
