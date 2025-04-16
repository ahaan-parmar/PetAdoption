import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  const location = useLocation();
  
  // Pages that should not show navigation
  const hideNavigation = [
    '/login',
    '/signup',
    '/forgot-password',
    '/reset-password',
    '/404'
  ].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {!hideNavigation && <Navbar />}
      <main className="flex-1">
        <Outlet />
      </main>
      {!hideNavigation && <Footer />}
    </div>
  );
};

export default Layout; 