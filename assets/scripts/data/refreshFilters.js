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
  const ingredientsDropdown = document.querySelector(".ingredients-dropdown");
  const appareilsDropdown = document.querySelector(".appareils-dropdown");
  const ustensilesDropdown = document.querySelector(".ustensiles-dropdown");

  const ul_ingredients = ingredientsDropdown.querySelector("ul");
  const ul_appareils = appareilsDropdown.querySelector("ul");
  const ul_ustensiles = ustensilesDropdown.querySelector("ul");

  const li_ingredients = ul_ingredients.querySelectorAll("li");
  const li_appareils = ul_appareils.querySelectorAll("li");
  const li_ustensiles = ul_ustensiles.querySelectorAll("li");

  const displayedCards = document.querySelectorAll(
    ".cardRecipe__article:not(.hide)",
  );

  //const displayedIds = [];

  console.log(li_ingredients);

  displayedCards.forEach((card) => {
    hideListItems(card.dataset.id);
  });

  function hideListItems(id) {
    const regex = new RegExp(`(^|-)${id}($|-)`);

    li_ingredients.forEach((li) => {
      if (li.classList.contains("hide")) {
        if (regex.test(li.dataset.recipes)) {
          li.classList.remove("hide");
        }
      } else {
        if (!regex.test(li.dataset.recipes)) {
          li.classList.add("hide");
        }
      }
    });
  }

  const idSelected = document.querySelectorAll("[data-id]");
  //  console.log(idSelected);
  idSelected.forEach((sel) => {
    if (sel.dataset.id == 1) {
      console.log(sel.dataset.id);
    }
  });
}
