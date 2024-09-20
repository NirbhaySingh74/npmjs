import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import SearchPage from "./components/SearchPage";
import PackageDetailPage from "./components/PackageDetailPage";
import VersionPage from "./components/VersionPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/package/:packageName" element={<PackageDetailPage />} />
        <Route
          path="/package/:packageName/version/:version"
          element={<VersionPage />}
        />
      </Routes>
    </Router>
  );
};

export default App;
