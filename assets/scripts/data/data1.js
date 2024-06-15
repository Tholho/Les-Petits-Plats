import initFilters from "./initFilters.js";
import initCards from "./initCards.js";
import refreshCardsViaFilters from "./refreshCardsViaFilters.js";
import mainFilterinput from "./mainFilterInput.js";

export default async function makeAllDOM() {
  await initCards();
  await initFilters();
  mainFilterinput();
}

document.addEventListener("DOMContentLoaded", function () {
  refreshCardsViaFilters();
});
