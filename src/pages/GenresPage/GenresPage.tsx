import { useEffect, useState } from "react";
import "./GenresPage.scss";
import { moviesApi } from "../../api/movies.api";
import type { Movie } from "../../types/Movies";

import IconBack from "../../assets/icons/IconBackArrow.svg?react";
import FilmCard from "../../ui/FilmCard/FilmCard";
import Loader from "../../ui/Loader/Loader";

const GenresPage = () => {
  const [genres, setGenres] = useState<string[]>([]);
  const [newPage, setNewPage] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [films, setFilms] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1); // Добавляем состояние для текущей страницы
  const [isLoading, setIsLoading] = useState(false); // Для индикации загрузки
  const [hasMore, setHasMore] = useState(true); // Для проверки есть ли еще фильмы
  const FILMS_PER_PAGE = 10;

  const getGenres = async () => {
    const genres = await moviesApi.getGenres();
    setGenres(genres);
    return genres;
  };

  const handleGenreClick = async (item: string) => {
    setSelectedGenre(item);
    setNewPage(true);
    setCurrentPage(1);
    setIsLoading(true);

    try {
      const films = await moviesApi.getMovies({
        count: FILMS_PER_PAGE,
        genre: item,
        page: 1,
      });
      setFilms(films);
      setHasMore(films.length === FILMS_PER_PAGE);
    } catch (error) {
      console.error("Error loading films:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = async () => {
    if (!hasMore) return;

    const nextPage = currentPage + 1;

    try {
      const newFilms = await moviesApi.getMovies({
        count: FILMS_PER_PAGE,
        genre: selectedGenre,
        page: nextPage,
      });
      setFilms((prevFilms) => [...prevFilms, ...newFilms]);
      setCurrentPage(nextPage);
      setHasMore(newFilms.length === FILMS_PER_PAGE);
    } catch (error) {
      console.error("Error loading more films:", error);
    }
  };

  const handleBack = () => {
    setNewPage(false);
    setSelectedGenre("");
    setFilms([]);
    setCurrentPage(1);
    setHasMore(true);
  };

  useEffect(() => {
    getGenres();
  }, []);

  if (isLoading) return <Loader />;

  if (!newPage) {
    return (
      <section className="genres-page">
        <div className="container">
          <h1 className="genres-page__title">Genres</h1>
          <ul className="genres-page__list">
            {genres.map((item, index) => (
              <li key={index}>
                <div
                  className="genres-page__card"
                  onClick={() => handleGenreClick(item)}
                >
                  <span className="genres-page__card-text">{item}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  } else {
    return (
      <section className="genres-page">
        <div className="container">
          <button className="genres-page__btn btn" onClick={handleBack}>
            <IconBack width={40} height={40} aria-hidden={true} />
            <span>
              {selectedGenre.charAt(0).toUpperCase() + selectedGenre.slice(1)}
            </span>
          </button>
          <div className="genres-page__wrapper">
            <ul className="genres-page__movies-list">
              {films.map((film) => (
                <li key={film.id}>
                  <FilmCard film={film} showRating={false} />
                </li>
              ))}
            </ul>
            {hasMore && (
              <button
                className="genres-page__btn-more btn btn--secondary"
                onClick={handleLoadMore}
              >
                Show More
              </button>
            )}
          </div>
        </div>
      </section>
    );
  }
};

export default GenresPage;
