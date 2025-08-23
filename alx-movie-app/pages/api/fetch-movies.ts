import { MoviesProps } from "@/interfaces";
import { NextApiRequest, NextApiResponse } from "next";

interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
}

interface TMDBResponse {
  results: TMDBMovie[];
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "POST") {
    try {
      const { year, page, genre } = request.body;
      const date = new Date();

      // Build TMDB API URL
      const apiUrl = new URL("https://api.themoviedb.org/3/discover/movie");
      apiUrl.searchParams.append("api_key", process.env.TMDB_API_KEY as string);
      apiUrl.searchParams.append("language", "en-US");
      apiUrl.searchParams.append("sort_by", "release_date.desc");
      apiUrl.searchParams.append("page", page || "1");
      apiUrl.searchParams.append(
        "primary_release_year",
        (year || date.getFullYear()).toString()
      );

      if (genre) {
        apiUrl.searchParams.append("with_genres", genre);
      }

      const resp = await fetch(apiUrl.toString());

      if (!resp.ok) {
        throw new Error(`Failed to fetch movies: ${resp.statusText}`);
      }

      const moviesResponse: TMDBResponse = await resp.json();

      // ✅ No "any" here
      const movies: MoviesProps[] = moviesResponse.results.map((movie) => ({
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        poster_path: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : null,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
      }));

      return response.status(200).json({ movies });
    } catch (error) {
      console.error("Error fetching movies:", error);
      return response.status(500).json({ error: "Failed to fetch movies" });
    }
  } else {
    response.setHeader("Allow", ["POST"]);
    response.status(405).end(`Method ${request.method} Not Allowed`);
  }
}
