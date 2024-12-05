import React from 'react';
import { ExternalLink, Music, Users, Play } from 'lucide-react';
import { Recommendation } from '../types';

interface RecommendationListProps {
  recommendations: Recommendation[];
  searchType: 'track' | 'artist';
}

const RecommendationList: React.FC<RecommendationListProps> = ({ recommendations, searchType }) => {
  const getSpotifySearchUrl = (track: string, artist: string) => {
    const query = encodeURIComponent(`${track} ${artist}`);
    return `https://open.spotify.com/search/${query}`;
  };

  const getAppleMusicSearchUrl = (track: string, artist: string) => {
    const query = encodeURIComponent(`${track} ${artist}`);
    return `https://music.apple.com/us/search?term=${query}`;
  };

  const formatNumber = (num?: string) => {
    if (!num) return '';
    const n = parseInt(num);
    return new Intl.NumberFormat('en-US', { notation: 'compact' }).format(n);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-purple-900 mb-4">
        Recommended {searchType === 'track' ? 'Tracks' : 'Artists'}
      </h2>
      
      <div className="grid gap-6 md:grid-cols-2">
        {recommendations.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
          >
            <div className="relative">
              {item.image?.large ? (
                <img
                  src={item.image.large}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
                  {searchType === 'track' ? (
                    <Music className="w-16 h-16 text-white opacity-50" />
                  ) : (
                    <Users className="w-16 h-16 text-white opacity-50" />
                  )}
                </div>
              )}
              {item.match && (
                <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                  {Math.round(item.match * 100)}% match
                </div>
              )}
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 line-clamp-1">{item.name}</h3>
              {item.artist?.name && (
                <p className="text-gray-600 mb-4">by {item.artist.name}</p>
              )}

              {(item.listeners || item.playcount) && (
                <div className="flex space-x-4 text-sm text-gray-500 mb-4">
                  {item.listeners && (
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {formatNumber(item.listeners)} listeners
                    </div>
                  )}
                  {item.playcount && (
                    <div className="flex items-center">
                      <Play className="w-4 h-4 mr-1" />
                      {formatNumber(item.playcount)} plays
                    </div>
                  )}
                </div>
              )}
              
              <div className="flex space-x-4">
                <a
                  href={getSpotifySearchUrl(item.name, item.artist?.name || '')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors flex items-center"
                >
                  <span>Spotify</span>
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
                <a
                  href={getAppleMusicSearchUrl(item.name, item.artist?.name || '')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition-colors flex items-center"
                >
                  <span>Apple Music</span>
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationList;