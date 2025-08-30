import type { Movie } from "../../types/Movies";
import { Link } from "react-router-dom";
import "./FilmCard.scss";
import IconClose from "../../assets/icons/IconClose.svg?react";
import MoviePlaceholder from "../../assets/MoviePlaceholder.jpg";

interface FilmCardProps {
  film: Movie;
  index?: number;
  showRating?: boolean;
  showDeleteButton?: boolean;
  onDelete?: (movieId: number) => void;
}

const FilmCard = ({
  film,
  index = 0,
  showRating = true,
  showDeleteButton = false,
  onDelete,
}: FilmCardProps) => {
  return (
    <div className="film-card">
      {showRating && <span className="film-card__index">{++index}</span>}
      <Link className="film-card__link" to={`/movie/${film.id}`}>
        {film.posterUrl === null ? (
          <img
            className="film-card__poster"
            src={MoviePlaceholder}
            loading="lazy"
          />
        ) : (
          <img
            className="film-card__poster"
            src={film.posterUrl}
            alt={film.title}
            loading="lazy"
          />
        )}
      </Link>
      {showDeleteButton && (
        <button
          className="btn film-card__delete-button"
          onClick={onDelete ? () => onDelete(film.id) : undefined}
          type="button"
        >
          <IconClose />
        </button>
      )}
    </div>
  );
};

export default FilmCard;
