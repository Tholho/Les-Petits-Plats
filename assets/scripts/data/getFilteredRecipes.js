//Aggregates in an array of lists all unique tags (mostly designed for further manipulation)
export default function getFilteredRecipes() {
  const activeFilters = document.querySelectorAll(
    ".sectionRecipes__applied-tag",
  );
  const filteredRecipes = [];

  activeFilters.forEach((elem) => {
    const localRecipes = elem.dataset.recipes.split("-");
    filteredRecipes.push(localRecipes);
  });
  return filteredRecipes;
}