export interface Recommendation {
  name: string;
  artist?: {
    name: string;
    url?: string;
  };
  mbid?: string;
  match?: number;
  duration?: string;
  playcount?: string;
  listeners?: string;
  url?: string;
  image?: {
    small?: string;
    medium?: string;
    large?: string;
    extralarge?: string;
  };
}