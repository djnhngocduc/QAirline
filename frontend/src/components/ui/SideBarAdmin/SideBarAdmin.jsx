import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === 'Escape') {
        setSidebarOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [setSidebarOpen, sidebarOpen]);

  return (
    <aside
      className={`absolute left-0 top-0 z-50 flex h-screen w-72 flex-col bg-secondary-foreground p-5 text-white transition-transform duration-300 lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="mb-8 flex">
        <img
          src="/assets/logo.png" // Path to your image
          alt="Logo"
          className="h-10 w-12" // Adjust size and ensure it fits inside the circle
        />

        {/* Tên hãng */}
        <span className="font-serif text-2xl tracking-wider">QAirline</span>
      </div>

      <nav className="flex flex-col space-y-4">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/admin/post-information"
              className={`flex items-center gap-3 rounded-lg p-3 text-sm font-medium transition hover:bg-secondary ${
                pathname.includes('post-information') ? 'bg-secondary' : ''
              }`}
            >
              <span>📋</span>
              Manage Posts
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/add-airplanes"
              className={`flex items-center gap-3 rounded-lg p-3 text-sm font-medium transition hover:bg-secondary ${
                pathname.includes('add-airplanes') ? 'bg-secondary' : ''
              }`}
            >
              <span>✈️</span>
              Manage Airplanes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/add-flights"
              className={`flex items-center gap-3 rounded-lg p-3 text-sm font-medium transition hover:bg-secondary ${
                pathname.includes('add-flights') ? 'bg-secondary' : ''
              }`}
            >
              <span>🛫</span>
              Manage Flights
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/view-statistics"
              className={`flex items-center gap-3 rounded-lg p-3 text-sm font-medium transition hover:bg-secondary ${
                pathname.includes('view-statistics') ? 'bg-secondary' : ''
              }`}
            >
              <span>📊</span>
              View and Analyze Bookings
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
