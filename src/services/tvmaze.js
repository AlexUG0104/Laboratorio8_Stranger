const PLACEHOLDER_IMAGE = "https://placehold.co/210x295";

export const getShowData = async (id) => {
  const URL = `https://api.tvmaze.com/shows/${id}`;
  const response = await fetch(URL);
  const data = await response.json();

  return {
    name: data.name,
    rating: data.rating.average ?? "Sin rating",
    image: data.image?.medium ?? PLACEHOLDER_IMAGE
  };
};

export const getEpisodeList = async (id) => {
  const URL = `https://api.tvmaze.com/shows/${id}/episodes`;
  const response = await fetch(URL);
  const episodes = await response.json();

  const episodeList = episodes.map((episode) => ({
    number: episode.number,
    season: episode.season,
    rating: episode.rating.average
  }));

  return Object.groupBy(episodeList, (episode) => episode.season);
};