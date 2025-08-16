import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App.tsx";
import "./index.scss";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";

export const Genres = () => {
  return (
    <div>
      <h1>Жанры</h1>
      <p>Список жанров будет здесь.</p>
    </div>
  );
};

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/genres" element={<Genres />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
