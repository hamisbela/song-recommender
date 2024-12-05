import React from 'react';
import { Search, Info } from 'lucide-react';

interface SearchFormProps {
  searchTerm: string;
  searchType: 'track' | 'artist';
  loading: boolean;
  onSearchTermChange: (value: string) => void;
  onSearchTypeChange: (value: 'track' | 'artist') => void;
  onSubmit: (e: React.FormEvent) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
  searchTerm,
  searchType,
  loading,
  onSearchTermChange,
  onSearchTypeChange,
  onSubmit
}) => {
  const getInputHint = () => {
    if (searchType === 'track') {
      return 'Format: Artist - Track (e.g., "The Beatles - Hey Jude")';
    }
    return 'Enter artist name (e.g., "The Beatles")';
  };

  const isValidFormat = () => {
    if (searchType === 'track') {
      return searchTerm.includes('-') && searchTerm.split('-').every(part => part.trim().length > 0);
    }
    return searchTerm.trim().length > 0;
  };

  return (
    <form onSubmit={onSubmit} className="mb-12">
      <div className="flex flex-col md:flex-row gap-4 mb-2">
        <select
          value={searchType}
          onChange={(e) => onSearchTypeChange(e.target.value as 'track' | 'artist')}
          className="p-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-500 outline-none"
        >
          <option value="track">Track</option>
          <option value="artist">Artist</option>
        </select>
        
        <div className="flex-1">
          <input
            type="text"
            placeholder={searchType === 'track' ? "Artist - Track" : "Artist name"}
            value={searchTerm}
            onChange={(e) => onSearchTermChange(e.target.value)}
            className={`w-full p-3 rounded-lg border ${
              searchTerm && !isValidFormat() 
                ? 'border-red-300 focus:ring-red-500' 
                : 'border-purple-200 focus:ring-purple-500'
            } focus:ring-2 outline-none`}
          />
        </div>
        
        <button
          type="submit"
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading || !searchTerm || !isValidFormat()}
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <>
              <Search className="w-5 h-5 mr-2" />
              Search
            </>
          )}
        </button>
      </div>

      <div className="flex items-start space-x-2 text-sm text-gray-600">
        <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <p>{getInputHint()}</p>
      </div>
    </form>
  );
};

export default SearchForm;