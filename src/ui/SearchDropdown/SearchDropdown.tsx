import type { Movie } from "../../types/Movies";
import "./SearchDropdown.scss";
import IconSearch from "../../assets/icons/IconSearch.svg?react";
import { useCallback, useState } from "react";
import { moviesApi } from "../../api/movies.api";
import IconClose from "../../assets/icons/IconClose.svg?react";
import Rating from "../Rating/Rating";
import { Link } from "react-router-dom";

const SearchDropdown = () => {
  let searchTimeout: ReturnType<typeof setTimeout>;
  const [films, setFilms] = useState<Movie[]>([]);
  const [showReset, setShowReset] = useState(false);
  const [query, setQuery] = useState(""); // 👈 new state for input value
  const [noFilms, setNoFilms] = useState(false);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value); // 👈 update input value

      clearTimeout(searchTimeout);

      searchTimeout = setTimeout(async () => {
        try {
          if (value.length <= 2) {
            setShowReset(false);
            setTimeout(() => {
              setFilms([]);
            }, 300);
          } else {
            const response = await moviesApi.getMovies({
              title: value,
              count: 5,
            });
            setShowReset(true);
            if (response.length === 0) {
              setNoFilms(true);
              setFilms([]); // 👈 also clear old results
            } else {
              setNoFilms(false); // 👈 reset it!
              setFilms(response);
            }
          }
        } catch (error) {
          console.error("Error fetching films:", error);
        }
      }, 400);
    },
    []
  );

  const handleRefresh = () => {
    setQuery(""); // 👈 clear input value
    setFilms([]); // 👈 clear results
    setShowReset(false); // 👈 hide reset button
  };

  return (
    <div className="search-dropdown">
      <IconSearch
        className="search-dropdown__icon"
        width={24}
        height={24}
        aria-hidden={true}
      />
      <input
        className="search-dropdown__field"
        type="text"
        placeholder="Search"
        value={query}
        onChange={handleInputChange}
      />
      <ul className={`search-dropdown__list ${showReset ? "show" : ""}`}>
        {noFilms ? (
          <li>
            <h2 className="search-dropdown__info-title">No films found</h2>
            <p className="search-dropdown__info-text">
              Try a different keyword or check your spelling.
            </p>
          </li>
        ) : (
          films.map((film) => (
            <li key={film.id}>
              <Link
                className="search-dropdown__card"
                onClick={handleRefresh}
                to={`/movie/${film.id}`}
              >
                <img
                  className="search-dropdown__card-img"
                  src={film.posterUrl}
                  alt={film.title}
                />
                <div className="search-dropdown__info">
                  <div className="search-dropdown__info-top">
                    <Rating film={film} priority="low" />
                    <span className="search-dropdown__info-text">
                      {film?.releaseDate}
                    </span>
                    <span className="search-dropdown__info-text">
                      {film?.genres.map((genre) => genre).join(", ")}
                    </span>
                    <span className="search-dropdown__info-text">
                      {film?.runtime} min
                    </span>
                  </div>
                  <h2 className="search-dropdown__info-title">{film?.title}</h2>
                </div>
              </Link>
            </li>
          ))
        )}
      </ul>

      {showReset && (
        <button
          className="btn search-dropdown__btn-refresh"
          type="button"
          onClick={handleRefresh}
        >
          <IconClose width={24} height={24} />
        </button>
      )}
    </div>
  );
};

export default SearchDropdown;
