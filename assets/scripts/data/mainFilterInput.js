import getFilteredRecipes from "./getFilteredRecipes";
import { recipes } from "./recipes";
import updateTotalRecipes from "./totalRecipes";

export default async function evalMainInput() {
  const allCardsCount = recipes.length;
  const cards = document.querySelectorAll(".cardRecipe__article");
  const mainInputField = document.querySelector(".main-input-field");
  const displayedCardsIds = getDisplayedCardsIds();
  // console.log(displayedCardsIds);
  const search = mainInputField.value.toLowerCase();
  const splitSearch = customSplit(search);
  //console.log(splitSearch);
  if (mainInputField.value == "") {
    checkNoFilter();
    return;
  }

  let i = 0;
  while (i < allCardsCount) {
    if (displayedCardsIds.includes(recipes[i].id)) {
      const DOMCard = document.querySelector(
        `.cardRecipe__article[data-id="${recipes[i].id}"]`,
      );
      const normalizedRecipe = normalizeRecipe(recipes[i]);
      //console.log(normalizedRecipe);
      let found = searchWordsInContexts(splitSearch, normalizedRecipe);
      if (!found) {
        if (!DOMCard.classList.contains("hide")) {
          DOMCard.classList.add("hide");
        }
      } else {
        console.log(found);
        if (DOMCard.classList.contains("hide")) {
          DOMCard.classList.remove("hide");
        }
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
  updateTotalRecipes();
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
  // console.log(contexts[5]);
  while (words[i]) {
    found = false;
    while (!found && contexts[j]) {
      console.log(words[i]);
      found = customStrStr(contexts[j], String(words[i]));
      // console.log(found);
      //    console.log(contexts[j] + words[i]);
      j++;
    }
    if (found != 1) {
      return false;
    }
    i++;
  }
  return found;
}

function getDisplayedCardsIds() {
  const displayedCardsIds = [];
  const filteredRecipes = getFilteredRecipes();
  if (filteredRecipes.length == 0) {
    let total = recipes.length;
    console.log(total);
    for (let i = 0; i < +total; i++) {
      displayedCardsIds[i] = +i + 1;
    }
    return displayedCardsIds;
  }
  const mostRecipes = customReduce(filteredRecipes);
  console.log(mostRecipes);
  let i = 0;
  let keepRecipe = 1;
  let k = 0;
  while (mostRecipes[i]) {
    let j = 0;
    while (filteredRecipes[j]) {
      if ((!mostRecipes[i]) in filteredRecipes[j]) {
        keepRecipe = 0;
      }
      j++;
    }
    if (keepRecipe == 1) {
      displayedCardsIds[k] = +mostRecipes[i];
      k++;
    }
    keepRecipe = 1;
    i++;
  }
  return displayedCardsIds;
}

function customReduce(recipes) {
  let i = 0;
  let length = 0;
  let largestIndex;
  let largestRecipe = [];
  while (recipes[i]) {
    if (recipes[i].length > length) {
      largestIndex = i;
      length = recipes[i].length;
    }
    i++;
  }
  i = 0;
  while (recipes[largestIndex][i]) {
    largestRecipe[i] = recipes[largestIndex][i];
    i++;
  }
  return largestRecipe;
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

function normalizeAndLowerCase(str) {
  return removeAccents(str).toLowerCase();
}

function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function customStrStr(stack, needle) {
  if (needle === "") {
    return false;
  }
  let iStack = 0;
  let iNeedle = 0;
  const needleLen = needle.length;
  const stackLen = stack.length;

  while (stack[iStack]) {
    while (stack[iStack] == needle[iNeedle]) {
      //     console.log(needle + " " + stack);
      //   console.log(needleLen);
      console.log(iNeedle);
      if (iNeedle == needleLen - 1) {
        return true;
      }
      iStack++;
      iNeedle++;
    }
    //console.log(iStack + "+++" + iNeedle);
    iStack -= iNeedle;
    iNeedle = 0;
    iStack++;
  }
  return false;
}
