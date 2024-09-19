import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PackageDetailPage: React.FC = () => {
  const { packageName } = useParams<{ packageName: string }>();
  const [packageInfo, setPackageInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPackageDetails = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `https://registry.npmjs.org/${packageName}`
        );
        setPackageInfo(response.data);
      } catch (err) {
        setError("Failed to fetch package details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPackageDetails();
  }, [packageName]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      {packageInfo ? (
        <>
          <h1 className="text-3xl font-bold">{packageInfo.name}</h1>
          <p>{packageInfo.description}</p>
          <div>
            <h3 className="font-bold">Versions:</h3>
            <ul>
              {Object.keys(packageInfo.versions).map((version) => (
                <li key={version}>
                  <a
                    href={`/package/${packageName}/version/${version}`}
                    className="text-blue-500 underline"
                  >
                    {version}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <div>No package found.</div>
      )}
    </div>
  );
};

export default PackageDetailPage;
