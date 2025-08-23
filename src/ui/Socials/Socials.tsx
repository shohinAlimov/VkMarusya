import IconVK from "../../assets/icons/IconVK.svg?react";
import IconYouTube from "../../assets/icons/IconYouTube.svg?react";
import IconOK from "../../assets/icons/IconOk.svg?react";
import IconTelegram from "../../assets/icons/IconTelegram.svg?react";
import "./Socials.scss";
const Socials = () => {
  return (
    <ul className="socials">
      <li>
        <a className="socials__link" href="#">
          <IconVK
            className="socials__icon"
            width={24}
            height={24}
            aria-hidden={true}
          />
        </a>
      </li>
      <li>
        <a className="socials__link" href="#">
          <IconYouTube
            className="socials__icon"
            width={24}
            height={24}
            aria-hidden={true}
          />
        </a>
      </li>
      <li>
        <a className="socials__link" href="#">
          <IconOK
            className="socials__icon"
            width={24}
            height={24}
            aria-hidden={true}
          />
        </a>
      </li>
      <li>
        <a className="socials__link" href="#">
          <IconTelegram
            className="socials__icon"
            width={24}
            height={24}
            aria-hidden={true}
          />
        </a>
      </li>
    </ul>
  );
};

export default Socials;
