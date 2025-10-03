import Layout from "./pages/Layout.tsx";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.tsx";
import GeneratorPage from "./pages/GeneratorPage/GeneratorPage.tsx";
import HistoryPage from "./pages/HistoryPage/HistoryPage.tsx";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/generate" element={<GeneratorPage />} />
          <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
