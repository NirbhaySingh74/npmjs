import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import debounce from "lodash.debounce";

const LandingPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  // Function to handle search input and get suggestions
  const fetchSuggestions = debounce(async (term: string) => {
    if (!term) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `https://registry.npmjs.org/-/v1/search?text=${term}&size=5`
      );
      setSuggestions(response.data.objects);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, 300); // Debounce by 300ms

  // Handle input change and trigger suggestion search
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    setShowSuggestions(true);
    fetchSuggestions(term);
  };

  // Handle search submission
  const handleSearch = () => {
    if (searchTerm) {
      navigate(`/search?term=${searchTerm}`);
      setShowSuggestions(false);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: any) => {
    navigate(`/package/${suggestion.package.name}`);
    setShowSuggestions(false);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">
          Build amazing things with npm
        </h1>
        <p className="text-lg mb-8">
          npm is the world's largest software registry, with over a million
          packages of JavaScript code.
        </p>

        {/* Search Bar */}
        <div className="relative flex justify-center">
          <div className="relative w-1/2">
            <input
              type="text"
              className="w-full p-4 rounded-l-lg text-gray-900"
              placeholder="Search packages"
              value={searchTerm}
              onChange={handleInputChange}
            />
            {/* Suggestions Dropdown */}
            {showSuggestions && searchTerm && suggestions.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 z-10">
                {loading ? (
                  <div className="p-4 text-center">Loading...</div>
                ) : (
                  <ul>
                    {suggestions.map((suggestion) => (
                      <li
                        key={suggestion.package.name}
                        className="p-4 hover:bg-gray-100 cursor-pointer flex justify-between items-start"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {/* Package Name and Description */}
                        <div className="flex flex-col">
                          {/* Package Name */}
                          <strong className="text-gray-900 text-left">
                            {suggestion.package.name}
                          </strong>
                          {/* Package Description */}
                          <p className="text-sm text-gray-500 text-left">
                            {suggestion.package.description}
                          </p>
                        </div>
                        {/* Version Number */}
                        <div className="text-gray-500 self-center text-right">
                          {suggestion.package.version}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
          <button
            onClick={handleSearch}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-4 rounded-r-lg font-semibold"
          >
            Search
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 text-center">
        <p>&copy; {new Date().getFullYear()} npm, Inc. | Terms | Privacy</p>
      </footer>
    </div>
  );
};

export default LandingPage;
