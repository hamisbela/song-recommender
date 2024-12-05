import React, { useState } from 'react';
import { searchSimilarTracks, searchSimilarArtists } from '../services/lastfm';
import { Recommendation } from '../types';
import SearchForm from '../components/SearchForm';
import RecommendationList from '../components/RecommendationList';
import { Music2, Search, Headphones, HelpCircle } from 'lucide-react';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<'track' | 'artist'>('track');
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      let results: Recommendation[] = [];
      
      if (searchType === 'track') {
        const [artist, track] = searchTerm.split('-').map(s => s.trim());
        if (!artist || !track) {
          throw new Error('Please enter both artist and track name separated by a hyphen (-)');
        }
        results = await searchSimilarTracks(artist, track) || [];
      } else {
        const artist = searchTerm.trim();
        if (!artist) {
          throw new Error('Please enter an artist name');
        }
        results = await searchSimilarArtists(artist) || [];
      }

      if (results.length === 0) {
        setError('No recommendations found. Try a different search.');
      }
      
      setRecommendations(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-purple-900">
            Find Your Next Favorite Song
          </h1>

          <SearchForm
            searchTerm={searchTerm}
            searchType={searchType}
            loading={loading}
            onSearchTermChange={setSearchTerm}
            onSearchTypeChange={setSearchType}
            onSubmit={handleSearch}
          />

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {recommendations.length > 0 && (
            <RecommendationList
              recommendations={recommendations}
              searchType={searchType}
            />
          )}

          <section className="mt-16">
            <h2 className="text-3xl font-bold text-purple-900 mb-8 text-center">
              Your Ultimate Song Recommender
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
                <div className="flex items-center mb-4">
                  <Music2 className="w-8 h-8 text-purple-600 mr-3" />
                  <h3 className="text-xl font-semibold text-purple-900">
                    Intelligent Song Recommender
                  </h3>
                </div>
                <p className="text-gray-700">
                  Our advanced song recommender uses cutting-edge algorithms to analyze millions of 
                  music data points, ensuring you discover songs that perfectly match your taste. 
                  The song recommender tool considers various musical elements to provide accurate 
                  recommendations.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
                <div className="flex items-center mb-4">
                  <Search className="w-8 h-8 text-purple-600 mr-3" />
                  <h3 className="text-xl font-semibold text-purple-900">
                    How Our Song Recommender Works
                  </h3>
                </div>
                <p className="text-gray-700">
                  Simply enter your favorite track or artist, and let our song recommender do the magic. 
                  Our tool analyzes your input and generates personalized music recommendations, 
                  complete with direct links to popular streaming platforms.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl p-8 mb-12">
              <h3 className="text-2xl font-bold text-purple-900 mb-6">
                Why Choose Our Song Recommender?
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Headphones className="w-5 h-5 text-purple-600 mr-2" />
                    <span>Advanced music matching algorithm</span>
                  </li>
                  <li className="flex items-center">
                    <Headphones className="w-5 h-5 text-purple-600 mr-2" />
                    <span>Instant song recommendations</span>
                  </li>
                  <li className="flex items-center">
                    <Headphones className="w-5 h-5 text-purple-600 mr-2" />
                    <span>Cross-platform streaming links</span>
                  </li>
                </ul>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Headphones className="w-5 h-5 text-purple-600 mr-2" />
                    <span>Free song recommender service</span>
                  </li>
                  <li className="flex items-center">
                    <Headphones className="w-5 h-5 text-purple-600 mr-2" />
                    <span>No registration required</span>
                  </li>
                  <li className="flex items-center">
                    <Headphones className="w-5 h-5 text-purple-600 mr-2" />
                    <span>Regular updates to recommendations</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <HelpCircle className="w-8 h-8 text-purple-600 mr-3" />
                <h3 className="text-2xl font-bold text-purple-900">
                  Song Recommender FAQ
                </h3>
              </div>
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h4 className="font-semibold text-lg mb-2">How accurate is this song recommender?</h4>
                  <p className="text-gray-700">
                    Our song recommender uses sophisticated algorithms and real user data to ensure 
                    highly accurate music recommendations. The more specific your search, the better 
                    the recommendations will be.
                  </p>
                </div>
                <div className="border-b border-gray-200 pb-4">
                  <h4 className="font-semibold text-lg mb-2">Can I discover new genres with this song recommender?</h4>
                  <p className="text-gray-700">
                    Absolutely! Our song recommender tool can suggest music across various genres 
                    while maintaining relevance to your search. It's a great way to explore new 
                    musical territories.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">Is this song recommender free to use?</h4>
                  <p className="text-gray-700">
                    Yes, our song recommender is completely free and doesn't require any registration. 
                    You can use it as often as you like to discover new music that matches your taste.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;