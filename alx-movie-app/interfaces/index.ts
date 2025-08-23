import { ReactNode } from "react";

export interface ComponentProps {
  children: ReactNode
}

export interface ButtonProps {
  title: string
  action?: () => void
}

export interface MovieProps {
  id?: string
  posterImage: string
  releaseYear: string
  title: string
}

interface PrimaryImage {
  url: string
}

interface TitleText {
  text: string
}

interface ReleaseYear {
  year: string
}

export interface MoviesProps {
  primaryImage: PrimaryImage
  titleText: TitleText
  releaseYear: ReleaseYear
}


export interface MoviesProps {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
}
