export default async function refreshCardsViaFilters() {
  const cards = document.querySelectorAll(".cardRecipe__article");
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

  const filters_items = sortingGroup.querySelectorAll(
    "li:not(.sortingList__input-field)",
  );

  filters_items.forEach((item) => {
    item.addEventListener("click", applyFilter);
  });
  async function applyFilter() {
    this.classList.add("sortingList__item__selected");
    const svg = this.querySelector("svg");
    svg.addEventListener("click", removeFilter);
    svg.style.display = "block";
    if (
      !document.querySelector(
        `.sectionRecipes__applied-tag[data-id="${this.dataset.id}"]`,
      )
    ) {
      await createTag(this.innerText, this.dataset.recipes, this.dataset.id);
      const tag = document.querySelector(
        `.sectionRecipes__applied-tag[data-id='${this.dataset.id}']`,
      );
      const tag_clear = tag.querySelector("svg");
      tag_clear.addEventListener("click", removeFilter);
    }
    console.log(this.dataset.recipes);
    articles.forEach((article) => {
      const regex = new RegExp(`(^|-)${article.dataset.id}($|-)`);
      if (!article.classList.contains("hide")) {
        if (!regex.test(this.dataset.recipes)) {
          article.classList.add("hide");
        }
      }
    });
  }

  async function createTag(tagname, recipes, id) {
    const tag_section = document.querySelector(".sectionRecipes__tags-section");
    const tag = document.createElement("p");
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const svg_path = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path",
    );

    svg.classList.add("svg-clear");
    svg.setAttribute("width", "14");
    svg.setAttribute("height", "13");
    svg.setAttribute("viewBox", "0 0 14 13");
    svg.setAttribute("fill", "none");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg_path.setAttribute(
      "d",
      "M12 11.5L7 6.5M7 6.5L2 1.5M7 6.5L12 1.5M7 6.5L2 11.5",
    );
    svg_path.setAttribute("stroke", "#1B1B1B");
    svg_path.setAttribute("stroke-width", "2.16667");
    svg_path.setAttribute("stroke-linecap", "round");
    svg_path.setAttribute("stroke-linejoin", "round");

    tag.classList.add("sectionRecipes__applied-tag");
    tag.innerText = tagname;
    tag.dataset.id = id;
    tag.dataset.recipes = recipes;
    svg.appendChild(svg_path);
    tag.appendChild(svg);
    tag_section.appendChild(tag);
  }

  //remove visual effects from list and tags and refresh cards depending on
  //active filters

  function refreshCards() {
    const activeFilters = document.querySelectorAll(
      ".sectionRecipes__applied-tag",
    );
    const filteredRecipes = [];

    activeFilters.forEach((elem) => {
      const localRecipes = elem.dataset.recipes.split("-");
      filteredRecipes.push(localRecipes);
    });
    cards.forEach((card) => {
      let flag = 1;
      filteredRecipes.forEach((list) => {
        if (!list.includes(card.dataset.id)) {
          flag = 0;
        }
      });
      if (flag == 1) {
        card.classList.remove("hide");
      }
    });
  }

  function removeFilter(event) {
    event.stopPropagation();
    if (this.parentNode.nodeName == "LI") {
      unselectListItem(this.parentNode);
      removeTag(this.parentNode.dataset.id);
    } else {
      const localId = this.parentNode.dataset.id;
      this.parentNode.remove();
      const listItem = document.querySelector(`[data-id="${localId}"]`);
      listItem.classList.remove("sortingList__item__selected");
      listItem.querySelector("svg").style.display = "none";
    }

    function unselectListItem(item) {
      item.classList.remove("sortingList__item__selected");
      item.querySelector("svg").style.display = "none";
    }
    function removeTag(id) {
      const tag = document.querySelector(
        `.sectionRecipes__applied-tag[data-id="${id}"]`,
      );
      console.log("isit" + tag);
      tag.remove();
    }
    refreshCards();
    checkNoFilter();
    function checkNoFilter() {
      const activeFilters = document.querySelector(
        ".sectionRecipes__applied-tag",
      );
      if (!activeFilters) {
        cards.forEach((card) => card.classList.remove("hide"));
      }
    }
  }
}
