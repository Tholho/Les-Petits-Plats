import refreshFilters from "./refreshFilters";

export default async function filtersInput(field) {
  const displayedCards = document.querySelectorAll(
    ".cardRecipe__article:not(.hide)",
  );
  const activeFilters = document.querySelectorAll(
    ".sectionRecipes__applied-tag",
  );
  const currentList = field.closest("ul");
  const currentListElements = currentList.querySelectorAll(".list-item");
  const normalizedInput = field.value.toLowerCase();

  currentListElements.forEach((elem) => {
    const normalizedTextNoAccent = removeAccents(elem.innerText.toLowerCase());
    const normalizedText = elem.innerText.toLowerCase();
    if (elem.classList.contains("hide")) {
      if (
        normalizedText.includes(normalizedInput) ||
        normalizedTextNoAccent.includes(normalizedInput)
      ) {
        elem.classList.remove("hide");
      }
    } else {
      if (
        !normalizedText.includes(normalizedInput) &&
        !normalizedTextNoAccent.includes(normalizedInput)
      ) {
        elem.classList.add("hide");
      }
    }
  });
  function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
}
