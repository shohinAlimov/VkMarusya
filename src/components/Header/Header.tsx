import "./Header.scss";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/icons/vk-marusya-logo.svg?react";
import IconSearch from "../../assets/icons/IconSearch.svg?react";
import { useState } from "react";
import Modal from "../Modal/Modal";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

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
          <a className="header__logo" href="/">
            <Logo
              className="header__logo-icon"
              width={136}
              height={32}
              aria-hidden={true}
            />
          </a>
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
            <div className="header__search">
              <IconSearch
                className="header__search-icon"
                width={24}
                height={24}
                aria-hidden={true}
              />
              <input
                className="header__search-field"
                type="text"
                placeholder="Search"
              />
            </div>
          </div>

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
            <button className="btn header__btn-login" onClick={handleOpenModal}>
              Login
            </button>
          )}

          <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
      </div>
    </header>
  );
};

export default Header;
