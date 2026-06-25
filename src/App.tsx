import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import TailorPage from "./pages/TailorPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/tailor" element={<TailorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
