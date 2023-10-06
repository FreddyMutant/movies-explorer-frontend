import {useLayoutEffect, useState} from "react";
import {
  LAPTOP_MORE,
  LAPTOP_MOVIES,
  MOBILE_MORE,
  MOBILE_MOVIES,
  MOBILE_WIDTH,
  TABLET_MORE,
  TABLET_MOVIES,
  TABLET_WIDTH
} from "../utils/constants";

export function UseLayout() {
  const [windowMode, setWindowMode] = useState({init: 12, more: 3, savedMovies: 3});
  const handleWindow = () => {
    if (window.innerWidth <= MOBILE_WIDTH) {
      setWindowMode({init: MOBILE_MOVIES, more: MOBILE_MORE, savedMovies: 2});
    } else if (window.innerWidth > MOBILE_MOVIES && window.innerWidth <= TABLET_WIDTH) {
      setWindowMode({init: TABLET_MOVIES, more: TABLET_MORE, savedMovies: 3});
    } else {
      setWindowMode({init: LAPTOP_MOVIES, more: LAPTOP_MORE, savedMovies: 3});
    }
  }

  useLayoutEffect(() => {
    handleWindow();
    window.addEventListener('resize', handleWindow);
    return () => {
      window.removeEventListener('resize', handleWindow);
    };
  }, [])
  return windowMode
}