import getFilteredRecipes from "./getFilteredRecipes";
import { recipes } from "./recipes";
import refreshCards from "./refreshCards";
import refreshFilters from "./refreshFilters";
import updateTotalRecipes from "./totalRecipes";
import normalizeAndLowerCase from "../utils/normalizeAndLowerCase";

export default async function evalMainInput() {
  const allCardsCount = recipes.length;
  const cards = document.querySelectorAll(".cardRecipe__article");
  const mainInputField = document.querySelector(".main-input-field");
  const displayedCardsIds = getDisplayedCardsIdsLocal();
  const search = mainInputField.value.toLowerCase();
  const splitSearch = customSplit(search);
  const idList = [];
  if (mainInputField.value == "" || mainInputField.value.length < 3) {
    checkNoFilter();
    await refreshCards();
    await refreshFilters();
    return;
  }

  let i = 0;
  while (i < allCardsCount) {
    if (displayedCardsIds.includes(recipes[i].id)) {
      const normalizedRecipe = normalizeRecipe(recipes[i]);
      let found = searchWordsInContexts(splitSearch, normalizedRecipe);
      if (found) {
        idList.push(+i + 1);
      }
    }
    i++;
  }
  function checkNoFilter() {
    const activeFilters = document.querySelector(
      ".sectionRecipes__applied-tag",
    );
    if (!activeFilters) {
      let i = 0;
      while (i < allCardsCount) {
        cards[i].classList.remove("hide");
        i++;
      }
    }
    updateTotalRecipes();
  }
  refreshCards(idList);
  updateTotalRecipes();
  refreshFilters(idList);
}

function customSplit(search) {
  let i = 0;
  let k = 0;
  const splitSearch = [];
  while (search[i]) {
    let startWord = "";
    while (search[i] && search[i] != "" && search[i] != " ") {
      startWord = startWord + search[i];
      i++;
    }
    splitSearch[k] = startWord;
    k++;
    while (search[i] && search[i] == " ") {
      i++;
    }
  }
  return splitSearch;
}

function makeIngredientContext(ingredientsObj) {
  let ingredientNames = "";
  let i = 0;
  while (ingredientsObj[i]) {
    ingredientNames = ingredientNames + " " + ingredientsObj[i].ingredient;
    i++;
  }
  return ingredientNames;
}

function searchWordsInContexts(words, contexts) {
  let found = false;
  let i = 0;
  let j = 0;
  while (words[i]) {
    found = false;
    while (!found && contexts[j]) {
      found = customStrStr(contexts[j], String(words[i]));
      j++;
    }
    if (found != 1) {
      return false;
    }
    i++;
  }
  return found;
}

function getDisplayedCardsIdsLocal() {
  const displayedCardsIds = [];
  const filteredRecipes = getFilteredRecipes();
  if (!filteredRecipes || filteredRecipes.length == 0) {
    let total = recipes.length;
    for (let i = 0; i < +total; i++) {
      displayedCardsIds[i] = +i + 1;
    }
    return displayedCardsIds;
  }
  const leastRecipes = customReduce(filteredRecipes);
  let i = 0;
  let keepRecipe = 1;
  let k = 0;
  while (leastRecipes[i]) {
    let j = 0;
    while (filteredRecipes[j]) {
      if ((!leastRecipes[i]) in filteredRecipes[j]) {
        keepRecipe = 0;
      }
      j++;
    }
    if (keepRecipe == 1) {
      displayedCardsIds[k] = +leastRecipes[i];
      k++;
    }
    keepRecipe = 1;
    i++;
  }
  return displayedCardsIds;
}

function customReduce(recipes) {
  if (!recipes) {
    return [];
  }
  let i = 0;
  let length = recipes[0].length;
  let smallestIndex = 0;
  let smallestRecipe = [];
  while (recipes[i]) {
    if (recipes[i].length < length) {
      smallestIndex = i;
      length = recipes[i].length;
    }
    i++;
  }
  i = 0;

  while (recipes[smallestIndex][i]) {
    smallestRecipe[i] = recipes[smallestIndex][i];
    i++;
  }
  return smallestRecipe;
}

function normalizeRecipe(recipe) {
  let normalizedRecipe = [];
  normalizedRecipe[0] = recipe.name;
  normalizedRecipe[1] = recipe.description;
  normalizedRecipe[2] = makeIngredientContext(recipe.ingredients);
  normalizedRecipe[3] = normalizeAndLowerCase(recipe.name);
  normalizedRecipe[4] = normalizeAndLowerCase(recipe.description);
  normalizedRecipe[5] = normalizeAndLowerCase(
    makeIngredientContext(recipe.ingredients),
  );
  return normalizedRecipe;
}

function customStrStr(stack, needle) {
  if (needle === "") {
    return false;
  }
  let iStack = 0;
  let iNeedle = 0;
  const needleLen = needle.length;

  while (stack[iStack]) {
    while (stack[iStack] == needle[iNeedle]) {
      if (iNeedle == needleLen - 1) {
        return true;
      }
      iStack++;
      iNeedle++;
    }
    iStack -= iNeedle;
    iNeedle = 0;
    iStack++;
  }
  return false;
}
