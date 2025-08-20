import Button from "@/components/commons/Button";
import Loading from "@/components/commons/Loading";
import MovieCard from "@/components/commons/MovieCard";
import { MoviesProps } from "@/interfaces";
import { useCallback, useEffect, useState } from "react";

interface MProps {
  movies: MoviesProps[];
}

const Movies: React.FC<MProps> = () => {
  const [page, setPage] = useState<number>(1);
  const [year, setYear] = useState<number | null>(null);
  const [genre, setGenre] = useState<string>("All");
  const [movies, setMovies] = useState<MoviesProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/fetch-movies", {
        method: "POST",
        body: JSON.stringify({
          page,
          ...(year ? { year } : {}),
          genre: genre === "All" ? "" : genre,
        }),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Something went wrong while fetching movies.");
      }

      const data = await response.json();
      const results = data.movies || [];
      console.log("Fetched movies:", results);

      setMovies(results);
    } catch (error) {
      console.error("FetchMovies Error:", error);
      setError(error instanceof Error ? error.message : "Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  }, [page, year, genre]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <div className="min-h-screen bg-[#110F17] text-white px-4 md:px-10 lg:px-44">
      <div className="py-16">
        <div className="flex flex-col md:flex-row justify-between mb-4 items-center space-x-0 md:space-x-4">
          <input
            type="text"
            placeholder="Search for a movie..."
            className="border-2 w-full md:w-96 border-[#E2D609] outline-none bg-transparent px-4 py-2 rounded-full text-white placeholder-gray-400"
          />

          <select
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
              setYear(event.target.value ? Number(event.target.value) : null)
            }
            className="border-2 border-[#E2D609] outline-none bg-transparent px-4 md:px-8 py-2 mt-4 md:mt-0 rounded-full w-full md:w-auto"
          >
            <option value="">Select Year</option>
            {[2024, 2023, 2022, 2021, 2020, 2019].map((year: number) => (
              <option value={year} key={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <p className="text-[#E2D609] text-xl mb-6 mt-6">Online streaming</p>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <h1 className="text-lg md:text-6xl font-bold">
            {year || "Latest"} {genre} Movies
          </h1>
          <div className="flex flex-wrap space-x-0 md:space-x-4 mt-4 md:mt-0">
            {["All", "Animation", "Comedy", "Fantasy"].map(
              (g: string, key: number) => (
                <Button title={g} key={key} action={() => setGenre(g)} />
              )
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/50 border border-red-500 rounded-lg p-4 mt-6">
            <p className="text-red-200">{error}</p>
            <button 
              onClick={fetchMovies}
              className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white"
            >
              Retry
            </button>
          </div>
        )}

        {/* Movies output */}
        {!error && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mt-10">
            {movies?.map((movie: MoviesProps, key: number) => (
              <MovieCard
                key={key}
                title={movie?.titleText?.text || "Untitled"}
                posterImage={movie?.primaryImage?.url || "/fallback.png"}
                releaseYear={movie?.releaseYear?.year || "N/A"}
              />
            ))}
          </div>
        )}

        {/* No movies found */}
        {!loading && !error && movies.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-400">No movies found for the selected criteria.</p>
          </div>
        )}

        <div className="flex justify-end space-x-4 mt-6">
          <Button
            title="Previous"
            action={() => setPage((prev) => (prev > 1 ? prev - 1 : 1))}
          />
          <Button title="Next" action={() => setPage(page + 1)} />
        </div>
      </div>

      {loading && <Loading />}
    </div>
  );
};

export default Movies;
