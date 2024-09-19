import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const VersionPage: React.FC = () => {
  const { packageName, version } = useParams<{
    packageName: string;
    version: string;
  }>();
  const [versionInfo, setVersionInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVersionDetails = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `https://registry.npmjs.org/${packageName}/${version}`
        );
        setVersionInfo(response.data);
      } catch (err) {
        setError("Failed to fetch version details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchVersionDetails();
  }, [packageName, version]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      {versionInfo ? (
        <>
          <h1 className="text-3xl font-bold">
            {versionInfo.name} - {versionInfo.version}
          </h1>
          <p>{versionInfo.description}</p>
          <div>
            <h3 className="font-bold">Dependencies:</h3>
            <ul>
              {versionInfo.dependencies ? (
                Object.keys(versionInfo.dependencies).map((dep) => (
                  <li key={dep}>
                    {dep}: {versionInfo.dependencies[dep]}
                  </li>
                ))
              ) : (
                <p>No dependencies for this version.</p>
              )}
            </ul>
          </div>
        </>
      ) : (
        <div>No version information found.</div>
      )}
    </div>
  );
};

export default VersionPage;
