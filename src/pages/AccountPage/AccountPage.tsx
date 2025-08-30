import { useDispatch, useSelector } from "react-redux";
import "./AccountPage.scss";
import { clearUser } from "../../store/authSlice";
import { authApi } from "../../api/auth.api";
import { Link, useNavigate } from "react-router-dom";

import IconUser from "../../assets/icons/IconUser.svg?react";
import IconFavorites from "../../assets/icons/IconFavorites.svg?react";
import IconEmail from "../../assets/icons/IconEmail.svg?react";
import { useEffect, useState } from "react";
import type { RootState } from "../../store/store";
import { favoritesApi } from "../../api/favorites.api";
import type { Movie } from "../../types/Movies";
import FilmCard from "../../ui/FilmCard/FilmCard";

const AccountPage = () => {
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(true);
  const [isSettignsOpen, setIsSettingsOpen] = useState(false);
  const [favoritesFilms, setFavoritesFilms] = useState<Movie[]>([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userName = useSelector((state: RootState) => state.auth.user?.name);
  const userSurname = useSelector(
    (state: RootState) => state.auth.user?.surname
  );
  const userEmail = useSelector((state: RootState) => state.auth.user?.email);

  const handleLogout = async () => {
    try {
      await authApi.logout();
      navigate("/");
    } catch (error) {
      console.error("Ошибка при выходе", error);
    } finally {
      dispatch(clearUser());
    }
  };

  const handleFavoritesClick = () => {
    setIsFavoritesOpen(true);
    setIsSettingsOpen(false);
  };

  const handleSettingsClick = () => {
    setIsSettingsOpen(true);
    setIsFavoritesOpen(false);
  };

  const getFavorites = async () => {
    const response = await favoritesApi.getFavorites();
    setFavoritesFilms(response);
  };

  const handleDeleteFavorite = async (movieId: string) => {
    try {
      await favoritesApi.removeFavorite(movieId);
      setFavoritesFilms((prev) =>
        prev.filter((favorite) => favorite.id.toString() !== movieId)
      );
    } catch (error) {
      console.error("Failed to remove favorite:", error);
    }
  };

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <section className="account-page">
      <div className="container">
        <h1 className="account-page__title">My Account</h1>
        <div className="account-page__sections">
          <button
            className={`btn account-page__sections-btn favorites ${
              isFavoritesOpen ? "active" : ""
            }`}
            type="button"
            onClick={handleFavoritesClick}
          >
            <IconFavorites
              className="account-page__sections-icon"
              width={24}
              height={24}
              aria-hidden={true}
            />
            <span>Favorite Films</span>
          </button>
          <button
            className={`btn account-page__sections-btn settings ${
              isSettignsOpen ? "active" : ""
            }`}
            type="button"
            onClick={handleSettingsClick}
          >
            <IconUser
              className="account-page__sections-icon"
              width={24}
              height={24}
              aria-hidden={true}
            />
            <span>Account Settings</span>
          </button>
        </div>

        {isFavoritesOpen &&
          (favoritesFilms.length > 0 ? (
            <ul className="account-page__favorites-list">
              {favoritesFilms.map((film) => (
                <li key={film.id} className="account-page__favorite-item">
                  <FilmCard
                    film={film}
                    showRating={false}
                    showDeleteButton={true}
                    onDelete={() => handleDeleteFavorite(film.id.toString())}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div>
              <p className="account-page__no-favorites">
                You have no favorite films yet.
              </p>
              <p className="account-page__no-favorites-suggestion">
                Go to the main page and add some!
              </p>
              <Link
                className="btn btn--secondary account-page__btn-view-films"
                to="/"
              >
                View Films
              </Link>
            </div>
          ))}

        {isSettignsOpen && (
          <>
            <div className="account-page__user">
              <div className="account-page__user-block">
                <div className="account-page__user-logo">
                  {userName?.[0].toUpperCase()}
                  {userSurname?.[0].toUpperCase()}
                </div>
                <div className="account-page__user-data">
                  <p className="account-page__user-heading">Name & Surname</p>
                  <p className="account-page__user-subheading">
                    {userName} {userSurname}
                  </p>
                </div>
              </div>
              <div className="account-page__user-block">
                <div className="account-page__user-logo">
                  <IconEmail
                    className="account-page__sections-icon"
                    width={24}
                    height={24}
                    aria-hidden={true}
                  />
                </div>
                <div className="account-page__user-data">
                  <p className="account-page__user-heading">Your Email</p>
                  <p className="account-page__user-subheading">{userEmail}</p>
                </div>
              </div>
            </div>
            <button
              className="btn btn--secondary account-page__logout"
              type="button"
              onClick={handleLogout}
            >
              Logout from Account
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default AccountPage;
