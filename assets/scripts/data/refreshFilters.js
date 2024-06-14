import { recipes } from "./recipes";

export default function refreshFilters() {
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
  const displayedCards = document.querySelectorAll(
    ".cardRecipe__article:not(.hide)",
  );
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
  refreshList();
  //adjust list items according to displayed cards
  function refreshList() {
    //  console.log(displayedCards);
    displayedCards.forEach((card) => {
      hideListItems(card.dataset.id);
    });
  }

  //must make a function that adjust displayed cards according to active filters
  //this one is important for filter removals
  // in refreshcards

  function hideListItems(id) {
    const regex = new RegExp(`(^|-)${id}($|-)`);
    const activeFilters = document.querySelector(
      ".sectionRecipes__applied-tag",
    );
    if (!activeFilters && recipes.length == displayedCards.length) {
      const allListItems = document.querySelectorAll(".list-item");
      allListItems.forEach((item) => item.classList.remove("hide"));
      return;
    }

    //console.log("call hidelist");
    li_ingredients.forEach((li) => {
      if (li.classList.contains("hide")) {
        if (regex.test(li.dataset.recipes)) {
          li.classList.remove("hide");
        }
      } else {
        if (!regex.test(li.dataset.recipes)) {
          li.classList.add("hide");
          //  li.style.backgroundColor = "Red";
        }
      }
    });
    li_appareils.forEach((li) => {
      if (li.classList.contains("hide")) {
        if (regex.test(li.dataset.recipes)) {
          li.classList.remove("hide");
        }
      } else {
        if (!regex.test(li.dataset.recipes)) {
          li.classList.add("hide");
          //  li.style.backgroundColor = "Red";
        }
      }
    });
    li_ustensiles.forEach((li) => {
      if (li.classList.contains("hide")) {
        if (regex.test(li.dataset.recipes)) {
          li.classList.remove("hide");
        }
      } else {
        if (!regex.test(li.dataset.recipes)) {
          li.classList.add("hide");
          //  li.style.backgroundColor = "Red";
        }
      }
    });
  }

  const idSelected = document.querySelectorAll(".cardRecipe__article[data-id]");
  //  console.log(idSelected);
  idSelected.forEach((sel) => {
    if (sel.dataset.id == 1) {
      //  console.log(sel.dataset.id);
    }
  });
}
