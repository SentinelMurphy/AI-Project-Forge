import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Landing_Page_1 from './pages/Landing_Page_1';
import Items from './pages/Items';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/landing_page" element={<Landing_Page_1 />} />
        <Route path="/items" element={<Items />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;