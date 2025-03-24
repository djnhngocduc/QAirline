import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Banner from './components/Banner';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
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
