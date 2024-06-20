import { recipes } from "./recipes";
import refreshFilters from "./refreshFilters";
import updateTotalRecipes from "./totalRecipes";
import getDisplayedCardsIds from "./getDisplayedCards";
import refreshCards from "./refreshCards";
import normalizeAndLowerCase from "../utils/normalizeAndLowerCase";

//Main search user input logic
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
      const normalizedRecipe = normalizeRecipe(recipe);
      let found = searchWordsInContexts(splitSearch, normalizedRecipe);
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

//Transforms ingredients in a single string to facilitate search
function makeIngredientContext(ingredientsObj) {
  const ingredientArray = ingredientsObj.map(
    (ingredient) => ingredient.ingredient,
  );
  const ingredientNames = ingredientArray.join(" ");
  return ingredientNames;
}

//Will look for each word in each context iteratively, returns true if each words exists in at least one context, else false
function searchWordsInContexts(words, contexts) {
  return words.every((word) => {
    return Object.values(contexts).some((contextValue) => {
      return contextValue.includes(word);
    });
  });
}

//creates normalized contexts to make search easier, one of them allows for user input with accents, another without
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
