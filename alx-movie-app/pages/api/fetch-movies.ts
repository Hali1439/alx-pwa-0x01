import { MoviesProps } from "@/interfaces";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === "POST") {
    try {
      const { year, page, genre } = request.body;
      const date = new Date();

      // Validate API key
      if (!process.env.MOVIE_API_KEY) {
        return response.status(500).json({ 
          error: "Missing API key in environment variables.",
          details: "Please set MOVIE_API_KEY in your .env.local file"
        });
      }

      // Build URL with proper encoding
      let url = `https://moviesdatabase.p.rapidapi.com/titles?year=${
        year || date.getFullYear()
      }&sort=year.decr&limit=12&page=${page}`;

      if (genre && genre !== "All") {
        url += `&genre=${encodeURIComponent(genre)}`;
      }

      const resp = await fetch(url, {
        headers: {
          "x-rapidapi-host": "moviesdatabase.p.rapidapi.com",
          "x-rapidapi-key": process.env.MOVIE_API_KEY,
        },
      });

      if (!resp.ok) {
        const errorData = await resp.text();
        console.error("API Error:", resp.status, errorData);
        return response.status(resp.status).json({ 
          error: "Failed to fetch movies from external API",
          details: errorData
        });
      }

      const moviesResponse = await resp.json();
      
      // Validate response structure
      if (!moviesResponse.results || !Array.isArray(moviesResponse.results)) {
        return response.status(200).json({ movies: [] });
      }

      const movies: MoviesProps[] = moviesResponse.results.filter((movie: any) => 
        movie && movie.titleText && movie.primaryImage
      );

      return response.status(200).json({ movies });
      
    } catch (error) {
      console.error("Server Error:", error);
      return response.status(500).json({ 
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  } else {
    response.setHeader("Allow", ["POST"]);
    response.status(405).end(`Method ${request.method} Not Allowed`);
  }
}
