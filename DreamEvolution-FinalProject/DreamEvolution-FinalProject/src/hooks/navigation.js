import { scrollToSection } from "../App";

export function handleNavigateToSection(navigate, location, id) {
  if (location.pathname === "/") {
    scrollToSection(id);
  } else {
    navigate("/");
    setTimeout(() => scrollToSection(id), 100);
  }
}
