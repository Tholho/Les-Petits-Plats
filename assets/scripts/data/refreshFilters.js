import getFilteredRecipes from "./getFilteredRecipes";
import { recipes } from "./recipes";
import getDisplayedCardsIds from "./getDisplayedCards";

export default async function refreshFilters(idList) {
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

  let displayedCards = getDisplayedCardsIds();
  if (idList) {
    displayedCards = idList;
  }
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
