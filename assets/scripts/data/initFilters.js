import { recipes } from "./recipes";

export default async function initFilters() {
  // useful DOM elements
  const ingredientsDropdown = document.querySelector(".ingredients-dropdown");
  const appareilsDropdown = document.querySelector(".appareils-dropdown");
  const ustensilesDropdown = document.querySelector(".ustensiles-dropdown");

  const ul_ingredients = ingredientsDropdown.querySelector("ul");
  const ul_appareils = appareilsDropdown.querySelector("ul");
  const ul_ustensiles = ustensilesDropdown.querySelector("ul");
  // Unique items lists that will be used for DOM generation

  const unique_ingredients = [];
  const unique_appareils = [];
  const unique_ustensiles = [];

  async function lowerCaseRecipes() {
    recipes.forEach((recipe) => {
      recipe.ingredients.forEach(
        (ingredients) =>
          (ingredients.ingredient =
            ingredients.ingredient.charAt(0).toUpperCase() +
            ingredients.ingredient.slice(1).toLowerCase()),
      );
      recipe.appliance =
        recipe.appliance.charAt(0).toUpperCase() +
        recipe.appliance.slice(1).toLowerCase();
      recipe.ustensils = recipe.ustensils.map(
        (ust) => ust.charAt(0).toUpperCase() + ust.slice(1).toLowerCase(),
      );
    });
  }

  await lowerCaseRecipes().then(() => console.log(recipes));

  // ici l'objet recipes doit etre un clone APRES ACTION FILTRE de l'objet recipes
  // original.
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      addUniqueItem(unique_ingredients, ingredient.ingredient);
    });
    addUniqueItem(unique_appareils, recipe.appliance);
    recipe.ustensils.forEach((ustensil) => {
      addUniqueItem(unique_ustensiles, ustensil);
    });
  });
  unique_ingredients.sort();
  unique_appareils.sort();
  unique_ustensiles.sort();
  console.log(unique_ustensiles);
  unique_ingredients.forEach((ingredient, index) => {
    const elem = makeElemLI(ingredient);
    recipes.forEach((recipe) => {
      recipe.ingredients.forEach((ing) => {
        if (ing.ingredient == elem.innerText) {
          if (!elem.dataset.recipes) {
            elem.dataset.recipes = recipe.id;
          } else {
            elem.dataset.recipes = elem.dataset.recipes + "-" + recipe.id;
          }
        }
      });
    });
    elem.classList.add("ingredient_item");
    elem.dataset.id = "ingredient_" + index;
    ul_ingredients.append(elem);
  });

  unique_appareils.forEach((appareil, index) => {
    const elem = makeElemLI(appareil);

    recipes.forEach((recipe) => {
      if (recipe.appliance == elem.innerText) {
        if (!elem.dataset.recipes) {
          elem.dataset.recipes = recipe.id;
        } else {
          elem.dataset.recipes = elem.dataset.recipes + "-" + recipe.id;
        }
      }
    });
    elem.classList.add("appliance_item");
    elem.dataset.id = "appliance_" + index;
    ul_appareils.append(elem);
  });

  unique_ustensiles.forEach((ustensile, index) => {
    const elem = makeElemLI(ustensile);

    recipes.forEach((recipe) => {
      recipe.ustensils.forEach((ust) => {
        if (ust == elem.innerText) {
          if (!elem.dataset.recipes) {
            elem.dataset.recipes = recipe.id;
          } else {
            elem.dataset.recipes = elem.dataset.recipes + "-" + recipe.id;
          }
        }
      });
    });
    elem.classList.add("ustensil_item");
    elem.dataset.id = "ustensil_" + index;
    ul_ustensiles.append(elem);
  });

  function makeElemLI(item) {
    const li = document.createElement("li");
    const capitalItem = item.charAt(0).toUpperCase() + item.slice(1);
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const svg_circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle",
    );
    const svg_path = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path",
    );

    svg.classList.add("svg-clear");
    svg.setAttribute("width", "17");
    svg.setAttribute("height", "17");
    svg.setAttribute("viewBox", "0 0 17 17");
    svg.setAttribute("fill", "none");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg_circle.setAttribute("cx", "8.5");
    svg_circle.setAttribute("cy", "8.5");
    svg_circle.setAttribute("r", "8.5");
    svg_circle.setAttribute("fill", "black");
    svg_path.setAttribute(
      "d",
      "M11 11L8.5 8.5M8.5 8.5L6 6M8.5 8.5L11 6M8.5 8.5L6 11",
    );
    svg_path.setAttribute("stroke", "#FFD15B");
    svg_path.setAttribute("stroke-linecap", "round");
    svg_path.setAttribute("stroke-linejoin", "round");

    li.innerText = capitalItem;
    svg.appendChild(svg_circle);
    svg.appendChild(svg_path);
    li.appendChild(svg);

    return li;
  }

  function addUniqueItem(list, item) {
    if (!list.includes(item)) {
      list.push(item);
    }
  }

  //  unique_ingredients.forEach((ingredient) => console.log(ingredient));
  //unique_ustensiles.forEach((ingredient) => console.log(ingredient));
  unique_appareils.forEach((ingredient) => console.log(ingredient));

  //Generer une liste d'ingredients uniques, puis la trier par ordre
  // alphabetique, puis generer les 'li'
}
