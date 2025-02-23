import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import SearchPage from './pages/SearchPage';
import ProductPage from './pages/ProductPage';

function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/product/:productId" element={<ProductPage />}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
