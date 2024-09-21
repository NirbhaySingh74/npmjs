import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PackageDetailPage: React.FC = () => {
  const { packageName } = useParams<{ packageName: string }>();
  const [packageData, setPackageData] = useState<any>(null);

  // Fetch package data using npm registry API
  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        const response = await axios.get(
          `https://registry.npmjs.org/${packageName}`
        );
        setPackageData(response.data);
      } catch (error) {
        console.error("Error fetching package data", error);
      }
    };

    if (packageName) {
      fetchPackageData();
    }
  }, [packageName]);

  if (!packageData) {
    return <div>Loading...</div>;
  }

  const latestVersion = packageData["dist-tags"].latest;
  const packageInfo = packageData.versions[latestVersion];
  console.log("repo", packageInfo.repository.url);
  const repositoryUrl = packageInfo.repository.url;
  const cleanedUrl = repositoryUrl.replace(/^git\+/, "");
  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold">{packageData.name}</h1>
          <div className="text-sm text-gray-500">
            {latestVersion} • Public • Published{" "}
            {new Date(packageInfo.time).toLocaleDateString()}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {/* Tags and Metadata */}
          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs">
            {packageInfo.license}
          </span>
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-xs">
            {Object.keys(packageInfo.dependencies || {}).length} Dependency
          </span>
          <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-md text-xs">
            {packageData.maintainers.length} Maintainers
          </span>
        </div>
      </div>

      {/* Tabs for Readme and Code */}
      <div className="mt-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <a
            href="#"
            className="border-indigo-500 text-indigo-600 px-1 pb-4 text-sm font-medium"
          >
            Readme
          </a>
          <a
            href="#"
            className="border-transparent text-gray-500 hover:text-gray-700 px-1 pb-4 text-sm font-medium"
          >
            Code
          </a>
        </nav>
      </div>

      {/* Content Section */}
      <div className="py-4">
        <h2 className="text-2xl font-bold mb-4">README</h2>
        <p className="text-gray-700">{packageInfo.description}</p>
        {/* Render package readme if available */}
        {packageInfo.readme ? (
          <div className="prose max-w-none">{packageInfo.readme}</div>
        ) : (
          <p>No README available.</p>
        )}
      </div>

      {/* Sidebar Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        <div className="col-span-1">
          <h3 className="text-lg font-bold">Install</h3>
          <pre className="bg-gray-100 p-4 rounded-lg">
            npm i {packageData.name}
          </pre>
          <h3 className="text-lg font-bold mt-6">Repository</h3>
          <a
            href={cleanedUrl}
            className="text-blue-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            {cleanedUrl}
          </a>
        </div>
        <div className="col-span-3">
          {/* Additional sections like version history or stats */}
        </div>
      </div>
    </div>
  );
};

export default PackageDetailPage;
