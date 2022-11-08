import { BrowserRouter, Routes, Route } from "react-router-dom";
import "tailwindcss/tailwind.css";

import Confirm from "./pages/Confirm";
import Detail from "./pages/Detail";
import Page from "./pages/Page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/confirm" element={<Confirm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
