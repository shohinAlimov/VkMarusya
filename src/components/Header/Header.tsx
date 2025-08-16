import "./Header.scss";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/icons/vk-marusya-logo.svg?react";
import IconSearch from "../../assets/icons/IconSearch.svg?react";
import { useState } from "react";
import IconClose from "../../assets/icons/IconClose.svg?react";
import LogoDark from "../../assets/icons/vk-marusya-logo-dark.svg?react";
const Header = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOpenModal = () => {
    setModalOpen(true);
    document.body.style.overflow = "hidden"; // запретить прокрутку
  };

  const handleLogin = () => {
    setModalOpen(false);
    document.body.style.overflow = "";
    console.log("Login Information", email, password);
  };

  const handleClose = () => {
    setModalOpen(false);
    document.body.style.overflow = "";
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
                    Главная
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "header__nav-link active" : "header__nav-link"
                    }
                    to="/genres"
                  >
                    Жанры
                  </NavLink>
                </li>
              </ul>
            </nav>
            <div className="custom-input">
              <IconSearch
                className="custom-input__icon"
                width={24}
                height={24}
                aria-hidden={true}
              />
              <input
                className="custom-input__field"
                type="text"
                placeholder="Поиск"
              />
            </div>
          </div>
          <button className="btn header__btn-login" onClick={handleOpenModal}>
            Войти
          </button>
        </div>
      </div>
      <div className={`modal-overlay ${isModalOpen ? "open" : ""}`}>
        <div className="modal">
          <LogoDark
            className="modal__logo"
            width={156}
            height={35}
            aria-hidden={true}
          />
          <input
            className="modal__field"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="modal__field"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="btn modal__btn-close" onClick={handleClose}>
            <IconClose
              className="modal__btn-close-icon"
              width={24}
              height={24}
              aria-hidden={true}
            />
          </button>
          <button className="btn btn--secondary " onClick={handleLogin}>
            Войти
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
