export default async function filtersInput() {
  const filterInputs = document.querySelectorAll(".filter-input");
  console.log(filterInputs);
  filterInputs.forEach(
    (input) => (input.oninput = (event) => dynamicListFilter(event)),
  );

  function dynamicListFilter(event) {
    const currentList = event.target.closest("ul");
    const currentListElements = currentList.querySelectorAll(".list-item");
    const normalizedInput = event.target.value.toLowerCase();

    currentListElements.forEach((elem) => {
      const normalizedTextNoAccent = removeAccents(
        elem.innerText.toLowerCase(),
      );
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
}
