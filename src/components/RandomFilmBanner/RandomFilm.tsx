import { useEffect, useState } from "react";
import { moviesApi } from "../../api/movies.api";
import type { Movie } from "../../types/Movies";
import "./RandomFilm.scss";
import Loader from "../../ui/Loader/Loader";
import FilmBanner from "../../ui/FilmBanner/FilmBanner";

const RandomFilm = () => {
  const [randomMovie, setRandomMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRandomMovie = async () => {
    setIsLoading(true);
    try {
      const moviesData = await moviesApi.getRandomMovie();
      setRandomMovie(moviesData);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomMovie();
  }, []);

  if (isLoading || !randomMovie) {
    return <Loader />;
  }

  return (
    <section className="random-film">
      <div className="container">
        {randomMovie && (
          <FilmBanner film={randomMovie} onRefresh={fetchRandomMovie} />
        )}
      </div>
    </section>
  );
};

export default RandomFilm;
