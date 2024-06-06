import { recipes } from "./recipes";

export default function initFilters() {
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

  // ici l'objet recipes doit etre un clone APRES ACTION FILTRE de l'objet recipes
  // original.
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      addUniqueItem(unique_ingredients, ingredient.ingredient.toLowerCase());
    });
    addUniqueItem(unique_appareils, recipe.appliance.toLowerCase());
    recipe.ustensils.forEach((ustensil) => {
      addUniqueItem(unique_ustensiles, ustensil.toLowerCase());
    });
  });

  unique_ingredients.forEach((ingredient) => {
    const elem = makeElemLI(ingredient);

    ul_ingredients.append(elem);
  });

  unique_appareils.forEach((appareil) => {
    const elem = makeElemLI(appareil);

    ul_appareils.append(elem);
  });

  unique_ustensiles.forEach((ustensile) => {
    const elem = makeElemLI(ustensile);

    ul_ustensiles.append(elem);
  });

  function makeElemLI(item) {
    const li = document.createElement("li");

    li.innerText = item;

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
