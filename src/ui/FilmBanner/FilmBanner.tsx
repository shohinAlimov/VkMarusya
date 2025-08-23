import "./FilmBanner.scss";
import type { Movie } from "../../types/Movies";
import IconStar from "../../assets/icons/IconStar.svg?react";
import IconFavorites from "../../assets/icons/IconFavorites.svg?react";
import IconRefresh from "../../assets/icons/IconRefresh.svg?react";
import { useNavigate } from "react-router-dom";

interface FilmBannerProps {
  film: Movie;
  onRefresh?: () => void;
  showRefresh?: boolean;
  showAbout?: boolean;
}

const FilmBanner = ({
  film,
  onRefresh,
  showRefresh = true,
  showAbout = true,
}: FilmBannerProps) => {
  const navigate = useNavigate();

  const handleMovieClick = async (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="film-banner__hero">
      <div className="film-banner__wrapper">
        <div className="film-banner__info">
          <div className="film-banner__info-top">
            <span className="film-banner__info-rating">
              <IconStar
                className="film-banner__info-rating-icon"
                width={16}
                height={16}
                aria-hidden={true}
              />
              {film?.tmdbRating}
            </span>
            <span className="film-banner__info-release">
              {film?.releaseDate}
            </span>
            <span className="film-banner__info-genre">
              {film?.genres.map((genre) => genre).join(", ")}
            </span>
            <span className="film-banner__info-duration">
              {film?.runtime} min
            </span>
          </div>
          <h2 className="film-banner__info-title">{film?.title}</h2>
          <p className="film-banner__info-description">{film?.plot}</p>
          <div className="film-banner__actions">
            <button className="btn btn--secondary film-banner__trailer">
              Trailer
            </button>
            {showAbout && (
              <button
                className="btn btn--primary film-banner__about"
                onClick={() => handleMovieClick(film.id)}
              >
                About
              </button>
            )}

            <button className="btn btn--primary btn--primary-small film-banner__favorites">
              <IconFavorites
                className="film-banner__favorites-icon"
                width={24}
                height={24}
                aria-hidden={true}
              />
            </button>
            {showRefresh && (
              <button
                className="btn btn--primary btn--primary-small film-banner__refresh"
                onClick={onRefresh}
              >
                <IconRefresh
                  className="film-banner__refresh-icon"
                  width={24}
                  height={24}
                  aria-hidden={true}
                />
              </button>
            )}
          </div>
        </div>
        <img
          className="film-banner__poster"
          src={film?.posterUrl}
          alt={`post for ${film?.title} movie`}
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default FilmBanner;
