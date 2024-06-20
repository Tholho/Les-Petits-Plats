import refreshFilters from "./refreshFilters";
import removeAccents from "../utils/removeAccents";

//Dynamic display of list elements depending on user input
export default async function filtersInput(field) {
  await refreshFilters();
  const currentList = field.closest("ul");
  const currentListElements = currentList.querySelectorAll(
    ".list-item:not(.hide)",
  );
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
}