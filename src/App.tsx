import Layout from "./ui/Layout/Layout.tsx";
import HomePage from "./pages/HomePage/HomePage";
import AccountPage from "./pages/AccountPage/AccountPage.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import MoviePage from "./pages/MoviePage/MoviePage.tsx";
import GenresPage from "./pages/GenresPage/GenresPage.tsx";

function App() {
  return (
    <BrowserRouter basename="/VkMarusya">
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/genres" element={<GenresPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/movie/:id" element={<MoviePage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
