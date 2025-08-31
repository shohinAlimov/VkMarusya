import IconStar from "../../assets/icons/IconStar.svg?react";
import type { Movie } from "../../types/Movies";
import "./Rating.scss";
interface RatingProps {
  film: Movie;
  priority: "low" | "medium" | "high";
  size?: "small" | "large";
}

const Rating = ({ film, priority, size = "small" }: RatingProps) => {
  if (film?.tmdbRating < 7) {
    priority = "low";
  } else if (film?.tmdbRating < 8) {
    priority = "medium";
  } else {
    priority = "high";
  }

  return (
    <span className={`rating ${priority} ${size}`}>
      <IconStar
        className="rating__icon"
        width={16}
        height={16}
        aria-hidden={true}
      />
      {film?.tmdbRating}
    </span>
  );
};

export default Rating;
