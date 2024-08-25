import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { List } from "./pages/list";
import { Contents } from "./pages/contents";
import { Header } from "./components/header";

export const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/list" element={<List />} />
        <Route path="/list/:id" element={<Contents />} />
      </Routes>
    </BrowserRouter>
  );
};
