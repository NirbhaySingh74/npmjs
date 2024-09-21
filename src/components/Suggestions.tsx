interface SuggestionsProps {
  suggestions: any[];
  loading: boolean;
  showSuggestions: boolean;
  searchTerm: string;
  handleSuggestionClick: (suggestion: any) => void;
}

const Suggestions: React.FC<SuggestionsProps> = ({
  suggestions,
  loading,
  showSuggestions,
  searchTerm,
  handleSuggestionClick,
}) => {
  if (!showSuggestions || !searchTerm || suggestions.length === 0) return null;

  return (
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
              <div className="flex flex-col">
                <strong className="text-gray-900 text-left">
                  {suggestion.package.name}
                </strong>
                <p className="text-sm text-gray-500 text-left">
                  {suggestion.package.description}
                </p>
              </div>
              <div className="text-gray-500 self-center text-right">
                {suggestion.package.version}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Suggestions;
