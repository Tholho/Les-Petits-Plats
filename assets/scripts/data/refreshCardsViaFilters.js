import refreshFilters from "./refreshFilters";
import evalMainInput from "./mainFilterInput";
import refreshCards from "./refreshCards";
import updateTotalRecipes from "./totalRecipes";

//Updates DOM visually upon user actions on filters
export default async function refreshCardsViaFilters() {
  const sortingGroup = document.querySelector(".sortingGroup");
  const filters_items = sortingGroup.querySelectorAll(
    "li:not(.sortingList__input-field)",
  );

  filters_items.forEach((item) => {
    item.addEventListener("click", applyFilter);
  });

  //If user selects a list item, will both call create tag and make it unselectable in both list and tag section.
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
    refreshCards();
    await refreshFilters();
    updateTotalRecipes();
    evalMainInput();
  }

  //Upon user selection, displays given tag.
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
  async function removeFilter(event) {
    event.stopPropagation();
    if (this.parentNode.nodeName == "LI") {
      unselectListItem(this.parentNode);
      removeTag(this.parentNode.dataset.id);
    } else {
      const localId = this.parentNode.dataset.id;
      const tag = this.parentNode;

      tag.remove();
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
      tag.remove();
    }

    refreshCards();
    await refreshFilters();
    updateTotalRecipes();
    evalMainInput();
  }
}