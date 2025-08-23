import { useParams } from "react-router-dom";
import "./MoviePage.scss";
import { moviesApi } from "../../api/movies.api";
import { useEffect, useState } from "react";
import type { Movie } from "../../types/Movies";
import FilmBanner from "../../ui/FilmBanner/FilmBanner";

const MoviePage = () => {
  const { id } = useParams<{ id: string }>();
  const movieId = Number(id);
  const [film, setFilm] = useState<Movie | null>(null);

  const fetchMovieById = async () => {
    try {
      const film = await moviesApi.getMovieById(movieId);
      setFilm(film);
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    fetchMovieById();
  }, []);

  return (
    <>
      <section className="movie-hero">
        <div className="container">
          <div className="movie-hero__wrapper">
            {film && (
              <FilmBanner film={film} showAbout={false} showRefresh={false} />
            )}
          </div>
        </div>
      </section>
      <section className="movie-info">
        <div className="container">
          <h2 className="movie-info__title">About</h2>
          <div className="movie-info__wrapper">
            <ul className="movie-info__list">
              <li className="movie-info__item">
                <span>Movie's Name:</span>
                {film?.title || "Unknown"}
              </li>
              <li className="movie-info__item">
                <span>Movie's Original Language:</span>

                {film?.language === "en"
                  ? "English"
                  : film?.language || "Unknown"}
              </li>
              <li className="movie-info__item">
                <span>Movie's Budget:</span>
                {(film?.budget && `${film?.budget}$`) || "Unknown"}
              </li>
              <li className="movie-info__item">
                <span>Movie's Plot:</span>
                {film?.plot || "Unknown"}
              </li>
              <li className="movie-info__item">
                <span>Movie's YouTube Trailer:</span>
                <a href={film?.trailerUrl || "Unknown"} target="_blank">
                  {film?.trailerUrl || "Unknown"}
                </a>
              </li>
              <li className="movie-info__item">
                <span>Movie's TMDB Rating:</span>
                {film?.tmdbRating || "Unknown"}
              </li>
              <li className="movie-info__item">
                <span>Movie's Director</span>
                {film?.director || "Unknown"}
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default MoviePage;
