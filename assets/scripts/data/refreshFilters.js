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

  const displayedCards = document.querySelectorAll(
    ".cardRecipe__article:not(.hide)",
  );

  const displayedIds = [];

  displayedCards.forEach((card) => {
    displayedIds.push(card.dataset.id);
  });

  console.log(displayedIds);

  const idSelected = document.querySelectorAll("[data-id]");
  //  console.log(idSelected);
  idSelected.forEach((sel) => {
    if (sel.dataset.id == 1) {
      console.log(sel.dataset.id);
    }
  });
}
