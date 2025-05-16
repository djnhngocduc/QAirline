import { BrowserRouter } from 'react-router-dom';
import Banner from './layouts/Banner';
import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';
import AppRoutes from './AppRoutes';

function App() {
  return (
    <>
      <BrowserRouter>
        <>
          <Banner />
          <Navbar />
        </>
        <AppRoutes />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
