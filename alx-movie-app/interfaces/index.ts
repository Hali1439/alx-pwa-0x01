import { ReactNode } from "react";

export interface ComponentProps {
  children: ReactNode;
}

export interface ButtonProps {
  title: string;
  action?: () => void;
}

export interface MovieProps {
  id?: string;
  posterImage: string;
  releaseYear: string;
  title: string;
}

// ✅ Final TMDB Movie interface
export interface MoviesProps {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
}
