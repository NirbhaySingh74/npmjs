import React from "react";
import Suggestions from "./Suggestions";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  fetchSuggestions: (term: string) => void;
  suggestions: any[];
  loading: boolean;
  handleSearch: () => void;
  showSuggestions: boolean;
  setShowSuggestions: (value: boolean) => void;
  handleSuggestionClick: (suggestion: any) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  fetchSuggestions,
  suggestions,
  loading,
  handleSearch,
  showSuggestions,
  setShowSuggestions,
  handleSuggestionClick,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    setShowSuggestions(true);
    fetchSuggestions(term);
  };

  return (
    <div className="relative flex justify-center mt-8 px-4">
      <div className="relative w-full max-w-lg">
        <input
          type="text"
          className="w-full p-4 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          placeholder="Search packages"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <Suggestions
          suggestions={suggestions}
          loading={loading}
          showSuggestions={showSuggestions}
          searchTerm={searchTerm}
          handleSuggestionClick={handleSuggestionClick}
        />
      </div>
      <button
        onClick={handleSearch}
        className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-4 rounded-lg font-semibold transition duration-200"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
