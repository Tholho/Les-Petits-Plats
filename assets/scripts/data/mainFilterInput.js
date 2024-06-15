import getFilteredRecipes from "./getFilteredRecipes";
import { recipes } from "./recipes";
import refreshFilters from "./refreshFilters";
import updateTotalRecipes from "./totalRecipes";
import getDisplayedCardsIds from "./getDisplayedCards";
import refreshCards from "./refreshCards";

export default async function evalMainInput() {
  const cards = document.querySelectorAll(".cardRecipe__article");
  const mainInputField = document.querySelector(".main-input-field");
  const displayedCardsIds = getDisplayedCardsIds();
  const search = mainInputField.value.toLowerCase();
  const splitSearch = search.split(" ").filter((word) => word != "");
  const idList = [];
  if (mainInputField.value == "" || mainInputField.value.length < 3) {
    checkNoFilter();
    await refreshCards();
    await refreshFilters();
    return;
  }

  recipes.forEach((recipe) => {
    if (displayedCardsIds.includes(recipe.id)) {
      const DOMCard = document.querySelector(
        `.cardRecipe__article[data-id="${recipe.id}"]`,
      );
      const normalizedRecipe = normalizeRecipe(recipe);
      //console.log(normalizedRecipe);
      let found = searchWordsInContexts(splitSearch, normalizedRecipe);
      console.log(found);
      if (found) {
        idList.push(+recipe.id);
      }
    }
  });
  function checkNoFilter() {
    const activeFilters = document.querySelector(
      ".sectionRecipes__applied-tag",
    );
    if (!activeFilters) {
      cards.forEach((card) => card.classList.remove("hide"));
    }
    updateTotalRecipes();
  }
  refreshCards(idList);
  updateTotalRecipes();
  refreshFilters(idList);
}

function makeIngredientContext(ingredientsObj) {
  const ingredientArray = ingredientsObj.map(
    (ingredient) => ingredient.ingredient,
  );
  //console.log(ingredientArray);
  const ingredientNames = ingredientArray.join(" ");
  return ingredientNames;
}

function searchWordsInContexts(words, contexts) {
  return words.every((word) => {
    return Object.values(contexts).some((contextValue) => {
      return contextValue.includes(word);
    });
  });
}
/*
function getDisplayedCardsIds() {
  const displayedCardsIds = [];
  const filteredRecipes = getFilteredRecipes();
  if (filteredRecipes.length == 0) {
    let total = recipes.length;
    console.log(total);
    for (let i = 0; i <= +total; i++) {
      displayedCardsIds.push(+i);
    }
    return displayedCardsIds;
  }
  const leastRecipes = filteredRecipes.reduce((smallest, current) => {
      if (smallest === null || current.length < smallest.length) {
        return current;
      }
      return smallest;
    }, null);
  let keepRecipe = 1;
  leastRecipes.forEach((recipe) => {
    keepRecipe = 1;
    filteredRecipes.forEach((sublist) => {
      if ((!recipe) in sublist) {
        keepRecipe = 0;
      }
    });
    if (keepRecipe == 1) {
      displayedCardsIds.push(+recipe);
    }
  });
  return displayedCardsIds;
}
*/
function normalizeRecipe(recipe) {
  const normalizedRecipe = {
    name: recipe.name,
    description: recipe.description,
    ingredients: makeIngredientContext(recipe.ingredients),
    normedName: normalizeAndLowerCase(recipe.name),
    normedDescription: normalizeAndLowerCase(recipe.description),
    normedIngredients: normalizeAndLowerCase(
      makeIngredientContext(recipe.ingredients),
    ),
  };
  return normalizedRecipe;
}

function normalizeAndLowerCase(str) {
  return removeAccents(str).toLowerCase();
}

function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
