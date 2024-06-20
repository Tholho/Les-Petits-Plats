import initFilters from "./initFilters.js";
import initCards from "./initCards.js";
import refreshCardsViaFilters from "./refreshCardsViaFilters.js";

//DOM initialization
export default async function makeAllDOM() {
  await initCards();
  await initFilters();
}

//Waits for DOM to be created to allow filter logic to be operational with called function
document.addEventListener("DOMContentLoaded", function () {
  refreshCardsViaFilters();
});