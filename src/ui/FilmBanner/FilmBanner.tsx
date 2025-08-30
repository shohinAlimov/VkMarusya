import "./FilmBanner.scss";
import type { Movie } from "../../types/Movies";
import IconStar from "../../assets/icons/IconStar.svg?react";
import IconFavorites from "../../assets/icons/IconFavorites.svg?react";
import IconRefresh from "../../assets/icons/IconRefresh.svg?react";
import { Link } from "react-router-dom";
import { favoritesApi } from "../../api/favorites.api";
import { useDispatch, useSelector } from "react-redux";
import MoviePlaceholder from "../../assets/MoviePlaceholder.jpg";
import {
  addFavorite,
  removeFavorite,
  selectFavorites,
} from "../../store/favoriteSlice";
import Modal from "../../components/Modal/Modal";
import { useState } from "react";

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
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const inFavorites = favorites?.includes(film.id.toString()) || false;
  const [showErrorModal, setShowErrorModal] = useState(false);

  const toggleFavorites = async (movieId: string) => {
    try {
      if (inFavorites) {
        await favoritesApi.removeFavorite(movieId);
        dispatch(removeFavorite(movieId));
      } else {
        await favoritesApi.addFavorite(movieId);
        dispatch(addFavorite(movieId));
      }
    } catch (error) {
      setShowErrorModal(true);
    }
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
            <Link
              className="btn btn--secondary film-banner__trailer"
              to={film?.trailerUrl || "#"}
              target="_blank"
            >
              Trailer
            </Link>
            {showAbout && (
              <Link
                className="btn btn--primary film-banner__about"
                to={`/movie/${film.id}`}
              >
                About
              </Link>
            )}

            <button
              className={`btn film-banner__favorites-btn ${
                inFavorites ? "added" : ""
              }`}
              onClick={() => toggleFavorites(film.id.toString())}
            >
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
        {film?.posterUrl === null ? (
          <img
            className="film-banner__poster"
            src={MoviePlaceholder}
            loading="lazy"
          />
        ) : (
          <img
            className="film-banner__poster"
            src={film?.posterUrl}
            alt={`post for ${film?.title} movie`}
            loading="lazy"
          />
        )}
      </div>
      <Modal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        type="errorModal"
      />
    </div>
  );
};

export default FilmBanner;
