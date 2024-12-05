export interface LastFMError {
  error: number;
  message: string;
}

export interface LastFMImage {
  '#text': string;
  size: 'small' | 'medium' | 'large' | 'extralarge';
}

export interface LastFMAlbum {
  artist: string;
  title: string;
  mbid?: string;
  url: string;
  image: LastFMImage[];
}

export interface LastFMTrackInfo {
  name: string;
  mbid?: string;
  url: string;
  duration?: string;
  listeners?: string;
  playcount?: string;
  artist: {
    name: string;
    mbid?: string;
    url: string;
  };
  album?: LastFMAlbum;
  image: LastFMImage[];
}

export interface LastFMArtistInfo {
  name: string;
  mbid?: string;
  url: string;
  image: LastFMImage[];
  stats?: {
    listeners?: string;
    playcount?: string;
  };
}

export interface LastFMTrackResponse {
  similartracks?: {
    track: Array<{
      name: string;
      artist: {
        name: string;
        url: string;
      };
      mbid?: string;
      match?: number;
      duration?: string;
      playcount?: string;
      listeners?: string;
      url: string;
      image: LastFMImage[];
    }>;
  };
}

export interface LastFMArtistResponse {
  similarartists?: {
    artist: Array<{
      name: string;
      mbid?: string;
      match?: number;
      url: string;
      image: LastFMImage[];
    }>;
  };
}