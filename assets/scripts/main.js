import makeAllDOM from "./data/dataInit.js";
import evalMainInput from "./data/mainFilterInput.js";
import filtersInput from "./data/filtersInput.js";
import updateTotalRecipes from "./data/totalRecipes.js";

async function init() {
  await makeAllDOM();
  searchFieldSetup();
  setupCustomDropdown();
}

init();

function searchFieldSetup() {
  const formFields = document.querySelectorAll(".form-field input");
  formFields.forEach(
    (field) =>
      (field.oninput = function () {
        const svgclear = field.parentElement.querySelector(".svg-clear");
        if (field.value) {
          svgclear.style.display = "block";
          svgclear.onclick = function () {
            field.value = "";
            svgclear.style.display = "none";
            checkNoFilter();
          };
        } else {
          svgclear.style.display = "none";
        }
        if (field.classList.contains("main-input-field")) {
          evalMainInput();
        } else {
          filtersInput(field);
        }
      }),
  );
}

function checkNoFilter() {
  const cards = document.querySelectorAll(".cardRecipe__article");
  const activeFilters = document.querySelector(".sectionRecipes__applied-tag");
  if (!activeFilters) {
    cards.forEach((card) => card.classList.remove("hide"));
  }
  updateTotalRecipes();
}

function setupCustomDropdown() {
  const customDropdown = document.querySelectorAll(".dropdownBtn");

  customDropdown.forEach((btn) =>
    btn.addEventListener("click", displayCustomDropdown),
  );

  function displayCustomDropdown(e) {
    const currentDropdown = e.target.closest(".dropdownBtn");
    const customDropdown = e.target.closest(".sortingGroup__customDropdown");
    customDropdown.classList.add("displayed");
    setAngleUp(currentDropdown);
  }
  function setAngleUp(target) {
    const angle = target.querySelector("i");
    const paragraph = target.querySelector(".dropdownBtn__title");
    angle.classList.remove("fa-angle-down");
    angle.classList.add("fa-angle-up");
    angle.addEventListener("click", hideCustomDropdown);
    paragraph.addEventListener("click", hideCustomDropdown);
  }
  async function hideCustomDropdown(e) {
    e.stopPropagation();
    const currentDropdown = e.target.closest(".dropdownBtn");
    const currentCustomDropdown = e.target.closest(
      ".sortingGroup__customDropdown",
    );
    const angle = currentDropdown.querySelector("i");
    const paragraph = currentDropdown.querySelector(".dropdownBtn__title");
    currentCustomDropdown.classList.remove("displayed");
    currentCustomDropdown.scrollTo({
      top: 0,
    });
    angle.classList.add("fa-angle-down");
    angle.classList.remove("fa-angle-up");
    angle.removeEventListener("click", hideCustomDropdown);
    paragraph.removeEventListener("click", hideCustomDropdown);
  }
}
