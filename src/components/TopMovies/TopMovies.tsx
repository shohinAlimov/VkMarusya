import { useEffect, useState } from "react";
import { moviesApi } from "../../api/movies.api";
import type { Movie } from "../../types/Movies";
import Loader from "../../ui/Loader/Loader";
import "./TopMovies.scss";
import FilmCard from "../../ui/FilmCard/FilmCard";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper-bundle.css";

const TopMovies = () => {
  const [topFilms, setTopFilms] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTopMovies = async () => {
    setIsLoading(true);
    try {
      const response = await moviesApi.getTopMovies();
      setTopFilms(response);
    } catch (error) {
      throw new Error(`Failed to fetch movies: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTopMovies();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <section className="top-movies">
      <div className="container">
        <h2 className="top-movies__title">Top 10 films</h2>
        <div className="top-movies__wrapper">
          <Swiper
            className="top-movies__slider-container"
            spaceBetween={50}
            slidesPerView={3}
            loop={true}
            autoplay={{
              delay: 10000,
            }}
            breakpoints={{
              310: {
                slidesPerView: 1.5,
                spaceBetween: 40,
              },
              375: {
                slidesPerView: 1.5,
                spaceBetween: 40,
              },
              425: {
                slidesPerView: 1.7,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
            }}
          >
            {topFilms.map((film, index) => (
              <SwiperSlide key={film.id}>
                <FilmCard film={film} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default TopMovies;
