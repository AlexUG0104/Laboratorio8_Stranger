import { getShowData, getEpisodeList } from "./services/tvmaze.js";

const ID = "2993";

const $header = document.querySelector("header");
const $episodes = document.querySelector(".episodes");

const show = await getShowData(ID);
const seasons = await getEpisodeList(ID);

$header.innerHTML = `
  <img class="poster" src="${show.image}" alt="${show.name}">
  <div>
    <h1>${show.name}</h1>
    <p>Rating: ${show.rating}</p>
  </div>
`;

const createEpisodeHTML = (episode) => {
  const rating = Math.round(episode.rating ?? 0);

  return `
    <div class="episode episode-${episode.number} rating-${rating}">
      ${episode.number}
    </div>
  `;
};

const createSeasonHTML = (data, number) => {
  const episodesHTML = data.map(createEpisodeHTML).join("");

  return `
    <article class="season">
      <header class="season-header">T${number}</header>
      ${episodesHTML}
    </article>
  `;
};

const list = Object.values(seasons).map((season, index) =>
  createSeasonHTML(season, index + 1)
);

$episodes.innerHTML = list.join("");