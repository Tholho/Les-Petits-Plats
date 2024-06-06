// Ce fichier doit assurer la creation VOIRE l'affichage du DOM.
// '
import { recipes } from "./recipes.js";
import refreshFilters from "./refreshFilters.js";
import initFilters from "./initFilters.js";
import initCards from "./initCards.js";
import refreshCardsViaFilters from "./refreshCardsViaFilters.js";

export default function makeAllDOM() {
  initCards();
  initFilters();
}

//placeholder logic
document.addEventListener("DOMContentLoaded", function () {
  const mainForm = document.querySelector(".sectionTop__form-field input");

  refreshCardsViaFilters();
  mainForm.addEventListener("input", () => {
    if (mainForm.value.length >= 3) {
      refreshFilters();
    }
  }); //refreshFilters();
});

function makeCards() {
  recipes.forEach((recipe) => makeCard(recipe));
}

function makeCard(recipe) {
  console.log(recipe.id); // store in in data-id for further display toggling
  // principle is NO-Correspondance on tag => add a hiding marker on item
  // each enabled tag stores any item it added a marker upon
  // on tag removal, it removes the markers
  // filter on articles is then re applied
}
