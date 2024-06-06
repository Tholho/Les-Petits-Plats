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
  unique_ingredients.forEach((ingredient) => {
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
    ul_ingredients.append(elem);
  });

  unique_appareils.forEach((appareil) => {
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
    ul_appareils.append(elem);
  });

  unique_ustensiles.forEach((ustensile) => {
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
    ul_ustensiles.append(elem);
  });

  function makeElemLI(item) {
    const li = document.createElement("li");
    const capitalItem = item.charAt(0).toUpperCase() + item.slice(1);

    li.innerText = capitalItem;

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
