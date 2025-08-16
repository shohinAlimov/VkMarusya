import { useEffect, useState } from "react";
import { moviesApi } from "../../api/movies.api";
import type { Movie } from "../../types/Movies";
import IconFavorites from "../../assets/icons/IconFavorites.svg?react";
import IconRefresh from "../../assets/icons/IconRefresh.svg?react";
import IconStar from "../../assets/icons/IconStar.svg?react";
import "./RandomFilm.scss";
import Loader from "../Loader/Loader";

const RandomFilm = () => {
  const [randomMovie, setRandomMovie] = useState<Movie>();
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

  if (isLoading) return <Loader />;

  return (
    <section className="random-film">
      <div className="container">
        <div className="random-film__wrapper">
          <div className="random-film__info">
            <div className="random-film__info-top">
              <span className="random-film__info-rating">
                <IconStar
                  className="random-film__info-rating-icon"
                  width={16}
                  height={16}
                  aria-hidden={true}
                />
                {randomMovie?.tmdbRating}
              </span>
              <span className="random-film__info-release">
                {randomMovie?.releaseDate}
              </span>
              <span className="random-film__info-genre">
                {randomMovie?.genres.map((genre) => genre).join(", ")}
              </span>
              <span className="random-film__info-duration">
                {randomMovie?.runtime} мин
              </span>
            </div>
            <h2 className="random-film__info-title">{randomMovie?.title}</h2>
            <p className="random-film__info-description">{randomMovie?.plot}</p>
            <div className="random-film__actions">
              <button className="btn btn--secondary random-film__trailer">
                Трейлер
              </button>
              <button className="btn btn--primary random-film__about">
                О фильме
              </button>
              <button className="btn btn--primary btn--primary-small random-film__favorites">
                <IconFavorites
                  className="random-film__favorites-icon"
                  width={24}
                  height={24}
                  aria-hidden={true}
                />
              </button>
              <button
                className="btn btn--primary btn--primary-small random-film__refresh"
                onClick={fetchRandomMovie}
              >
                <IconRefresh
                  className="random-film__refresh-icon"
                  width={24}
                  height={24}
                  aria-hidden={true}
                />
              </button>
            </div>
          </div>
          <img
            className="random-film__poster"
            src={randomMovie?.posterUrl}
            alt={`post for ${randomMovie?.title} movie`}
          />
        </div>
      </div>
    </section>
  );
};

export default RandomFilm;
