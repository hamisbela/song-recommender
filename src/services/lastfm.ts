import axios from 'axios';
import { LASTFM_CONFIG } from '../config/api';
import { Recommendation } from '../types';
import { LastFMTrackResponse, LastFMArtistResponse, LastFMImage } from '../types/api';
import { handleAPIError } from '../utils/api';

const validateSearchInput = (input: string, type: 'track' | 'artist'): void => {
  if (!input.trim()) {
    throw new Error(`Please enter a ${type} to search for`);
  }

  if (type === 'track') {
    const parts = input.split('-');
    if (parts.length !== 2 || !parts[0].trim() || !parts[1].trim()) {
      throw new Error('Please enter both artist and track name separated by a hyphen (-)');
    }
  }
};

const processImages = (images: LastFMImage[] = []): Record<string, string> => {
  const result: Record<string, string> = {};
  const validImages = images.filter(img => img['#text']);
  
  // Find the best quality image for each size
  const sizes: (keyof typeof result)[] = ['small', 'medium', 'large', 'extralarge'];
  let bestImage = '';
  
  // Start from largest to smallest for best quality fallback
  [...sizes].reverse().forEach(size => {
    const image = validImages.find(img => img.size === size);
    if (image?.['#text']) {
      bestImage = image['#text'];
    }
    result[size] = bestImage;
  });

  // If no images found, create a dynamic unsplash fallback
  if (!bestImage) {
    const fallbackUrl = `https://source.unsplash.com/800x800/?album,music`;
    sizes.forEach(size => {
      result[size] = fallbackUrl;
    });
  }

  return result;
};

const makeLastFMRequest = async (params: Record<string, string>) => {
  try {
    const response = await axios.get(LASTFM_CONFIG.BASE_URL, {
      params: {
        ...params,
        api_key: LASTFM_CONFIG.API_KEY,
        format: 'json'
      }
    });
    return response.data;
  } catch (error) {
    throw handleAPIError(error);
  }
};

export const searchSimilarTracks = async (artist: string, track: string): Promise<Recommendation[]> => {
  try {
    validateSearchInput(`${artist} - ${track}`, 'track');

    // Get similar tracks and track info in parallel
    const [similarResponse, trackInfoResponse] = await Promise.all([
      makeLastFMRequest({
        method: 'track.getsimilar',
        artist: artist.trim(),
        track: track.trim(),
        limit: LASTFM_CONFIG.LIMIT.toString(),
        autocorrect: '1'
      }),
      makeLastFMRequest({
        method: 'track.getInfo',
        artist: artist.trim(),
        track: track.trim(),
        autocorrect: '1'
      })
    ]);

    const tracks = similarResponse?.similartracks?.track;
    if (!tracks?.length) {
      return [];
    }

    // Get track info for all similar tracks in parallel
    const trackInfoPromises = tracks.map(track => 
      makeLastFMRequest({
        method: 'track.getInfo',
        artist: track.artist.name,
        track: track.name,
        autocorrect: '1'
      }).catch(() => null) // Handle individual track info failures gracefully
    );

    const trackInfos = await Promise.all(trackInfoPromises);

    return tracks.map((track, index) => {
      const trackInfo = trackInfos[index]?.track;
      const images = processImages(trackInfo?.album?.image || track.image);
      
      return {
        name: track.name,
        artist: {
          name: track.artist.name,
          url: track.artist.url
        },
        mbid: track.mbid || trackInfo?.mbid,
        match: parseFloat(track.match) || 0,
        duration: trackInfo?.duration || track.duration,
        playcount: trackInfo?.playcount || track.playcount,
        listeners: trackInfo?.listeners || track.listeners,
        url: track.url,
        image: images
      };
    });
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch similar tracks');
  }
};

export const searchSimilarArtists = async (artistName: string): Promise<Recommendation[]> => {
  try {
    validateSearchInput(artistName, 'artist');

    // Get artist info and similar artists in parallel
    const [artistInfoResponse, similarResponse] = await Promise.all([
      makeLastFMRequest({
        method: 'artist.getInfo',
        artist: artistName.trim(),
        autocorrect: '1'
      }),
      makeLastFMRequest({
        method: 'artist.getSimilar',
        artist: artistName.trim(),
        limit: LASTFM_CONFIG.LIMIT.toString(),
        autocorrect: '1'
      })
    ]);

    const artists = similarResponse?.similarartists?.artist;
    if (!artists?.length) {
      return [];
    }

    // Get detailed info for each similar artist in parallel
    const artistInfoPromises = artists.map(artist =>
      makeLastFMRequest({
        method: 'artist.getInfo',
        artist: artist.name,
        autocorrect: '1'
      }).catch(() => null)
    );

    const artistInfos = await Promise.all(artistInfoPromises);

    return artists.map((artist, index) => {
      const artistInfo = artistInfos[index]?.artist;
      const images = processImages(artistInfo?.image || artist.image);

      return {
        name: artist.name,
        mbid: artist.mbid || artistInfo?.mbid,
        match: parseFloat(artist.match) || 0,
        url: artist.url,
        image: images,
        listeners: artistInfo?.stats?.listeners,
        playcount: artistInfo?.stats?.playcount
      };
    });
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch similar artists');
  }
};