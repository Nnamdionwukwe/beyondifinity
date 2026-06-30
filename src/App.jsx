import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/order" element={<LandingPage />} />
        {/* Add more routes here as your site grows */}
        {/* <Route path="/products" element={<ProductsPage />} /> */}
        {/* <Route path="/about" element={<AboutPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
