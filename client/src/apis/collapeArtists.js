export default artists => {
  if (artists) {
    return artists
      .map(art => {
        return art.name;
      })
      .join(',  ');
  } else return undefined;
};
