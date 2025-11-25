export const getMenuStyles = (menuOpened) => {
  if (document.documentElement.clientWidth <= 800) {
    return { right: !menuOpened && "-100%" };
  }
};

export const sliderSettings = {
  slidesPerView: 1,
  spaceBetween: 50,
  breakpoints: {
    480: {
      slidesPerView: 1,
    },
    600: {
      slidesPerView: 2,
    },
    750: {
      slidesPerView: 3,
    },
    1100: {
      slidesPerView: 4,
    },
  },
};

export const updateFavorites = (id, favorites) => {
  // Ensure favorites is an array before operating on it
  const favs = Array.isArray(favorites) ? favorites : [];
  if (favs.includes(id)) {
    return favs.filter((resId) => resId !== id);
  } else {
    return [...favs, id];
  }
};

export const checkFavorites = (id, favorites) => {
  // Guard against non-array favorites (could be undefined or an object)
  if (!Array.isArray(favorites)) return "#dfd5ed";
  return favorites.includes(id) ? "#fa3e5f" : "#dfd5ed";
};

export const validateString = (value) => {
  return value?.length < 3 || value === null
    ? "Must have atleast 3 characters"
    : null;
};
