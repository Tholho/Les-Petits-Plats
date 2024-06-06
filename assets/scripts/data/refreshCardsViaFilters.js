export default function refreshCardsViaFilters() {
  const sortingGroup = document.querySelector(".sortingGroup");
  const filtersButtons = document.querySelectorAll(".dropdownBtn");
  const articles = document.querySelectorAll(".cardRecipe__article");

  const ingredientsDropdown = document.querySelector(".ingredients-dropdown");
  const appareilsDropdown = document.querySelector(".appareils-dropdown");
  const ustensilesDropdown = document.querySelector(".ustensiles-dropdown");

  const ul_ingredients = ingredientsDropdown.querySelector("ul");
  const ul_appareils = appareilsDropdown.querySelector("ul");
  const ul_ustensiles = ustensilesDropdown.querySelector("ul");

  const li_ingredients = ul_ingredients.querySelectorAll("li");
  const li_appareils = ul_appareils.querySelectorAll("li");
  const li_ustensiles = ul_ustensiles.querySelectorAll("li");

  const filters_items = sortingGroup.querySelectorAll("li");

  filters_items.forEach((item) => {
    item.addEventListener("click", applyFilter);
  });
  function applyFilter() {
    this.classList.add("sortingList__item__selected");
    articles.forEach((article) => {
      const regex = new RegExp(`(^|-)${article.dataset.id}($|-)`);
      if (!article.classList.contains("hide")) {
        if (!regex.test(this.dataset.recipes)) {
          article.classList.add("hide");
        }
      }
    });
  }
}
