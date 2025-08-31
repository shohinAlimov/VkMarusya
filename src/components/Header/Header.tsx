import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import Modal from "../Modal/Modal";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import SearchDropdown from "../../ui/SearchDropdown/SearchDropdown";

/* Icons */
import IconUser from "../../assets/icons/IconUser.svg?react";
import IconSearch from "../../assets/icons/IconSearch.svg?react";
import IconGenres from "../../assets/icons/IconGenres.svg?react";
import "./Header.scss";

const Header = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const username = useSelector((state: RootState) => state.auth.user?.name);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <Link className="header__logo" to="/">
            FilmCave
          </Link>
          <div className="header__inner">
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "header__nav-link active" : "header__nav-link"
                    }
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "header__nav-link active" : "header__nav-link"
                    }
                    to="/genres"
                  >
                    Genres
                  </NavLink>
                </li>
              </ul>
            </nav>
            <SearchDropdown />
          </div>

          <div className="header__auth">
            {isAuthenticated ? (
              <NavLink
                className={({ isActive }) =>
                  isActive ? "header__nav-link active" : "header__nav-link"
                }
                to="/account"
              >
                {username}
              </NavLink>
            ) : (
              <button
                className="btn header__btn-login"
                onClick={handleOpenModal}
              >
                Login
              </button>
            )}
          </div>

          <ul className="header__mobile-nav">
            <li>
              <Link className="btn header__mobile-button" to="/genres">
                <IconGenres
                  className="header__mobile-icon"
                  width={24}
                  height={24}
                  aria-label="Go to the Genres Page"
                />
              </Link>
            </li>
            <li>
              <button className="btn header__mobile-button" type="button">
                <IconSearch
                  className="header__mobile-icon"
                  width={24}
                  height={24}
                  aria-label="Go to the Account"
                />
              </button>
            </li>
            <li>
              {isAuthenticated ? (
                <Link className="btn header__mobile-button" to="/account">
                  <IconUser
                    className="header__mobile-icon"
                    width={24}
                    height={24}
                    aria-label="Go to the Account"
                  />
                </Link>
              ) : (
                <button
                  className="btn header__mobile-button"
                  onClick={handleOpenModal}
                >
                  <IconUser
                    className="header__mobile-icon"
                    width={24}
                    height={24}
                    aria-label="Go to the Login Form"
                  />
                </button>
              )}
            </li>
          </ul>
          <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
      </div>
    </header>
  );
};

export default Header;
