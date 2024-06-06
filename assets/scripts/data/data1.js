// Ce fichier doit assurer la creation VOIRE l'affichage du DOM.
// '
import { recipes } from "./recipes.js";
import refreshFilters from "./refreshFilters.js";
import initFilters from "./initFilters.js";

export default function makeAllDOM() {
  //  makeCards();
  initFilters();
}

const mainForm = document.querySelector(".sectionTop__form-field input");
mainForm.oninput = refreshFilters();

function makeCards() {
  recipes.forEach((recipe) => makeCard(recipe));
}

function makeCard(recipe) {
  console.log(recipe.id); // store in in data-id for further display toggling
  // principle is NO-Correspondance on tag => add a hiding marker on item
  // each enabled tag stores any item it added a marker upon
  // on tag removal, it removes the markers
  // filter on articles is then re applied
  console.log(recipe.name);
  console.log(recipe.image);
  console.log(recipe.ingredients); //do forEach
  console.log(recipe.ingredients[0]);
  console.log(recipe.time);
  console.log(recipe.description);
}
