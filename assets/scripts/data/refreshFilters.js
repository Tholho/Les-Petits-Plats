import getFilteredRecipes from "./getFilteredRecipes";
import { recipes } from "./recipes";
import getDisplayedCardsIds from "./getDisplayedCards";
import refreshCards from "./refreshCards";

export default async function refreshFilters(idList) {
  //aggregate filter
  //display éè but treat them as e
  // if user enters accent, must look explicitely for it ???
  //
  // How to generate tags ? FROM RECIPES ? hard to modify mais independant du DOM
  // C'est le mieux je pense(05/06)
  //
  //
  // MUST ADD ".sortingList__item__selected" TO ACTIVE TAGS TO TRIGGER REORDER

  // This is a primitive refresh based on simple correspondance with displayed DOM...
  // I might improve it later
  //
  const ingredientsDropdown = document.querySelector(".ingredients-dropdown");
  const appareilsDropdown = document.querySelector(".appareils-dropdown");
  const ustensilesDropdown = document.querySelector(".ustensiles-dropdown");

  const ul_ingredients = ingredientsDropdown.querySelector("ul");
  const ul_appareils = appareilsDropdown.querySelector("ul");
  const ul_ustensiles = ustensilesDropdown.querySelector("ul");

  const li_ingredients = ul_ingredients.querySelectorAll(
    "li:not(.sortingList__input-field)",
  );
  const li_appareils = ul_appareils.querySelectorAll(
    "li:not(.sortingList__input-field)",
  );
  const li_ustensiles = ul_ustensiles.querySelectorAll(
    "li:not(.sortingList__input-field)",
  );

  //const displayedIds = [];

  //  console.log(li_ingredients);
  //await refreshCards();
  let displayedCards = getDisplayedCardsIds();
  if (idList) {
    displayedCards = idList;
  }
  //console.log(displayedCards);
  const filteredRecipes = getFilteredRecipes();
  //  console.log(displayedCards);
  if (displayedCards.length == recipes.length) {
    const allListItems = document.querySelectorAll(".list-item");
    allListItems.forEach((item) => item.classList.remove("hide"));
    return;
  }

  li_ingredients.forEach((li) => {
    const li_recipes = li.dataset.recipes.split("-");
    let contained = 0;
    li_recipes.forEach((recipe) => {
      if (displayedCards.includes(+recipe)) {
        contained = 1;
        li.classList.remove("hide");
      } else {
        if (contained == 0) {
          li.classList.add("hide");
        }
      }
    });
  });

  li_appareils.forEach((li) => {
    const li_recipes = li.dataset.recipes.split("-");
    let contained = 0;
    li_recipes.forEach((recipe) => {
      if (displayedCards.includes(+recipe)) {
        contained = 1;
        li.classList.remove("hide");
      } else {
        if (contained == 0) {
          li.classList.add("hide");
        }
      }
    });
  });

  li_ustensiles.forEach((li) => {
    const li_recipes = li.dataset.recipes.split("-");
    let contained = 0;
    li_recipes.forEach((recipe) => {
      if (displayedCards.includes(+recipe)) {
        contained = 1;
        li.classList.remove("hide");
      } else {
        if (contained == 0) {
          li.classList.add("hide");
        }
      }
    });
  });
}
