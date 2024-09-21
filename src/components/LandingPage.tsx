import React from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../store/useStore";
import HeroSection from "./HeroSection";
import SearchBar from "./SearchBar";
import Footer from "./Footer";

const LandingPage: React.FC = () => {
  const {
    searchTerm,
    suggestions,
    loading,
    showSuggestions,
    setSearchTerm,
    fetchSuggestions,
    setShowSuggestions,
  } = useStore(); // Access Zustand state
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm) {
      navigate(`/search?term=${searchTerm}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: any) => {
    navigate(`/package/${suggestion.package.name}`);
    setShowSuggestions(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        fetchSuggestions={fetchSuggestions}
        suggestions={suggestions}
        loading={loading}
        handleSearch={handleSearch}
        showSuggestions={showSuggestions}
        setShowSuggestions={setShowSuggestions}
        handleSuggestionClick={handleSuggestionClick}
      />
      <div className="flex-grow"></div>
      <Footer />
    </div>
  );
};

export default LandingPage;
