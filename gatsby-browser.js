import { navigate } from "gatsby";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./src/i18n";
import "./src/styles/global.css";

export const onRouteUpdate = ({ location }) => {
  if (location.pathname === "/sklep-obrazy/" || location.pathname === "/kontakt/" || location.pathname === "/blog/" || location.pathname === "/produkt/"| location.pathname === "/o-mnie/") {
    navigate("/");
  }
};
