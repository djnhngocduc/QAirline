import { BrowserRouter, useLocation } from 'react-router-dom';
import Banner from './layouts/Banner';
import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';
import AppRoutes from './AppRoutes';
import { NavbarBooking } from './layouts/Navbar/NavbarBooking';

function LayoutSelector() {
  const { pathname } = useLocation();
  if (pathname.startsWith('/admin') || pathname.startsWith('/booking')) {
    return <AppRoutes />
  }
  return (
    <>
      <>
        <Banner />
        <Navbar />
      </>
      <AppRoutes />
      <Footer />
    </>
  )
}

function App() {
  return (
    <>
      <BrowserRouter>
        <LayoutSelector />
      </BrowserRouter>
    </>
  );
}

export default App;
