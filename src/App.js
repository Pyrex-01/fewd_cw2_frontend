import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout";
import Home from "./pages/home";
import SP from "./pages/scotPar";
import UP from "./pages/ukPar";
import Info from "./pages/parliamentInfo";
import NoPage from "./pages/noPage";
import './App.css';



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="sp" element={<SP />} />
          <Route path="up" element={<UP />} />
          <Route path="info" element={<Info />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
