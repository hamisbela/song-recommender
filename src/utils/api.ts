import axios, { AxiosError } from 'axios';
import { LastFMError } from '../types/api';

export class APIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'APIError';
  }
}

export const handleAPIError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<LastFMError>;
    const errorData = axiosError.response?.data;
    
    if (errorData?.error === 6) {
      throw new APIError('Invalid parameters. Please check your input and try again.');
    }
    
    if (errorData?.message) {
      throw new APIError(errorData.message);
    }
    
    if (axiosError.response?.status === 429) {
      throw new APIError('Too many requests. Please try again later.');
    }
  }
  
  throw new APIError('An unexpected error occurred. Please try again later.');
};