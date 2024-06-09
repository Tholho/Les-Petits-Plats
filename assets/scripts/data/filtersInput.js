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
    //console.log(currentList);
    //console.log(currentListElements);
    //console.log(event.target.value);
    currentListElements.forEach((elem) => {
      const normalizedText = elem.innerText.toLowerCase();
      if (elem.classList.contains("hide")) {
        if (normalizedText.includes(normalizedInput)) {
          elem.classList.remove("hide");
        }
      } else {
        if (!normalizedText.includes(normalizedInput)) {
          elem.classList.add("hide");
        }
      }
    });
  }
}
