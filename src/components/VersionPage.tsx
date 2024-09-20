import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const VersionPage: React.FC = () => {
  const { packageName, version } = useParams();
  const [versionData, setVersionData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVersionData = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get(
          `https://registry.npmjs.org/${packageName}/${version}`
        );
        setVersionData(response.data);
      } catch (err) {
        setError("Failed to fetch version data.");
      } finally {
        setLoading(false);
      }
    };

    fetchVersionData();
  }, [packageName, version]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      {versionData && (
        <div>
          <h1 className="text-3xl font-bold">
            {packageName} - {version}
          </h1>
          <p>{versionData.description}</p>

          {/* Add more version-specific data */}
        </div>
      )}
    </div>
  );
};

export default VersionPage;
