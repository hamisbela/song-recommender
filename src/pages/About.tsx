import React from 'react';
import { Music2, Heart, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-purple-900">
            About SongRecommender
          </h1>
          
          <div className="prose max-w-none">
            <div className="mb-12">
              <p className="text-xl text-gray-700 leading-relaxed">
                SongRecommender was born from a simple idea: helping music lovers discover their next favorite song. 
                We believe that great music should be easily discoverable, and our platform makes that possible through 
                advanced recommendation algorithms and a user-friendly interface.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center p-6 bg-white rounded-lg shadow-md">
                <Music2 className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                <h3 className="text-xl font-semibold mb-2">Music Discovery</h3>
                <p className="text-gray-600">
                  Find new songs and artists based on your current favorites
                </p>
              </div>

              <div className="text-center p-6 bg-white rounded-lg shadow-md">
                <Heart className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                <h3 className="text-xl font-semibold mb-2">Personalized</h3>
                <p className="text-gray-600">
                  Get recommendations tailored to your music taste
                </p>
              </div>

              <div className="text-center p-6 bg-white rounded-lg shadow-md">
                <Users className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                <h3 className="text-xl font-semibold mb-2">Community</h3>
                <p className="text-gray-600">
                  Join a community of music enthusiasts
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md mb-12">
              <h2 className="text-2xl font-bold text-purple-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 mb-4">
                At SongRecommender, our mission is to connect people with music they'll love. We understand that 
                finding new music can be overwhelming with millions of songs available across different platforms. 
                That's why we've created a simple yet powerful tool that helps you discover music based on your 
                current favorites.
              </p>
              <p className="text-gray-700">
                We use advanced algorithms and data from multiple sources to ensure our recommendations are 
                accurate and relevant. Whether you're looking for similar songs to your current favorites or 
                wanting to explore new artists, we're here to help you on your musical journey.
              </p>
            </div>

            <div className="bg-purple-100 p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-purple-900 mb-4">Why Choose Us?</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Advanced recommendation algorithm</li>
                <li>Direct links to popular streaming platforms</li>
                <li>User-friendly interface</li>
                <li>Free to use</li>
                <li>No registration required</li>
                <li>Regular updates and improvements</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;