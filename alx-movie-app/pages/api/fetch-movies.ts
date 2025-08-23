import { MoviesProps } from "@/interfaces";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
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
      apiUrl.searchParams.append("primary_release_year", (year || date.getFullYear()).toString());

      if (genre) {
        apiUrl.searchParams.append("with_genres", genre);
      }

      const resp = await fetch(apiUrl.toString());

      if (!resp.ok) {
        throw new Error(`Failed to fetch movies: ${resp.statusText}`);
      }

      const moviesResponse = await resp.json();
      const movies: MoviesProps[] = moviesResponse.results;

      return response.status(200).json({ movies });
    } catch (error: any) {
      console.error("Error fetching movies:", error.message);
      return response.status(500).json({ error: "Failed to fetch movies" });
    }
  } else {
    response.setHeader("Allow", ["POST"]);
    response.status(405).end(`Method ${request.method} Not Allowed`);
  }
}
