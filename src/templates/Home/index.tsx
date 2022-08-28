import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { AddPokemonPage } from '../../pages/Create';
import { HomePage } from '../../pages/home';
import { UpdatePage } from '../../pages/Update/indext';
import '../../styles/global.scss';

export const Home = () => {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-pokemon" element={<AddPokemonPage />} />
          <Route path="/update-pokemon/:id" element={<UpdatePage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
};
