import React, { useState } from "react";
import axios from "axios";

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!searchTerm) return;

    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://registry.npmjs.org/-/v1/search?text=${searchTerm}`
      );
      setResults(response.data.objects);
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Search NPM Packages
      </h1>
      <div className="flex justify-center mb-4">
        <input
          type="text"
          className="border border-gray-300 rounded-md p-2 w-1/2"
          placeholder="Enter package name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white rounded-md px-4 ml-2"
        >
          Search
        </button>
      </div>

      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-red-500 text-center">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((pkg) => (
          <div key={pkg.package.name} className="border rounded-md p-4">
            <h2 className="text-xl font-bold">{pkg.package.name}</h2>
            <p>{pkg.package.description}</p>
            <a
              href={`/package/${pkg.package.name}`}
              className="text-blue-500 underline"
            >
              View Details
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
