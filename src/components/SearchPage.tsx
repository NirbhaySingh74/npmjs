import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("term") || "";
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
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

    fetchResults();
  }, [searchTerm]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">
        Search Results for "{searchTerm}"
      </h1>

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
