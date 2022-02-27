export const search = (allMovies, searchTerm) => {
  const result = allMovies?.filter((el) => {
    if (searchTerm === "") {
      return allMovies;
    } else if (
      el.title
        .toLowerCase()
        .replace(/ +/g, "")
        .includes(searchTerm.toLowerCase())
    ) {
      return allMovies;
    }
  });
  return result;
};
