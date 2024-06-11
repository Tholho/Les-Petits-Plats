import getFilteredRecipes from "./getFilteredRecipes";
import { recipes } from "./recipes";
import refreshFilters from "./refreshFilters";
import updateTotalRecipes from "./totalRecipes";

export default async function evalMainInput() {
  const cards = document.querySelectorAll(".cardRecipe__article");
  const mainInputField = document.querySelector(".main-input-field");
  const displayedCardsIds = getDisplayedCardsIds();
  // console.log(displayedCardsIds);
  const search = mainInputField.value.toLowerCase();
  const splitSearch = search.split(" ");
  if (mainInputField.value == "") {
    checkNoFilter();
    return;
  }
  //    console.log("OBJOBJ" + ingredientsObj);

  recipes.forEach((recipe) => {
    if (displayedCardsIds.includes(recipe.id)) {
      console.log(recipe.id);
      //  console.log("test");
      const normalizedName = recipe.name.toLowerCase();
      const normalizedNameNoAccent = removeAccents(normalizedName);
      const normalizedDescription = recipe.description.toLowerCase();
      const normalizedDescriptionNoA = removeAccents(normalizedDescription);

      //   console.log("yoyo");
      const DOMCard = document.querySelector(
        `.cardRecipe__article[data-id="${recipe.id}"]`,
      );
      console.log(DOMCard);
      const ingredientsObj = recipe.ingredients.map(
        (ingredient) => ingredient.ingredient,
      );
      //  console.log("test" + ingredientsObj);
      //console.log(makeIngredientContext(ingredientsObj));
      //   console.log(DOMCard);
      if (
        !normalizedName.includes(search) &&
        !normalizedNameNoAccent.includes(search) &&
        !normalizedDescription.includes(search) &&
        !normalizedDescriptionNoA.includes(search)
      ) {
        if (!DOMCard.classList.contains("hide")) {
          console.log("time");
          DOMCard.classList.add("hide");
        }
      } else {
        if (DOMCard.classList.contains("hide")) {
          if (
            normalizedName.includes(search) ||
            normalizedNameNoAccent.includes(search) ||
            normalizedDescription.includes(search) ||
            normalizedDescriptionNoA.includes(search)
          ) {
            console.log(displayedCardsIds);
            console.log(recipe.id);
            DOMCard.classList.remove("hide");
          }
        }
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
  updateTotalRecipes();
}

function makeIngredientContext(ingredientsObj) {
  const ingredientArray = ingredientsObj.map(
    (ingredient) => ingredient.ingredient,
  );
  console.log(ingredientArray);
  const ingredientNames = ingredientArray.join(" ");
  return ingredientNames;
}

function searchWordsInContexts(words, contexts) {
  let presence;
  let presenceNorm;
  words.some((word) => {
    presence = false;
    //IF CONTEXT FAIRE UNE LISTE D INGREDIENTS EN TEXT KOI
    contexts.some((context) => {
      if (context.includes(word)) {
        presence = true;
      }
    });
    if (presence == false) {
      return;
    }
  });

  words.some((word) => {
    presenceNorm = false;
    //IF CONTEXT FAIRE UNE LISTE D INGREDIENTS EN TEXT KOI
    contexts.some((context) => {
      if (context.includes(word)) {
        presenceNorm = true;
      }
    });
    if (presenceNorm == false) {
      return;
    }
  });
  return presence || presenceNorm;
}

function getDisplayedCardsIds() {
  const regex = /\d+/;
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
  const mostRecipes = filteredRecipes.reduce((largest, current) => {
    return current.length > largest.length ? current : largest;
  }, filteredRecipes);
  console.log(mostRecipes);
  let keepRecipe = 1;
  mostRecipes.forEach((recipe) => {
    filteredRecipes.forEach((sublist) => {
      if ((!recipe) in sublist) {
        keepRecipe = 0;
      }
    });
    if (keepRecipe == 1) {
      displayedCardsIds.push(+recipe);
    }
    keepRecipe = 1;
  });
  console.log("ERMAGERD" + displayedCardsIds);
  return displayedCardsIds;
}

function normalizeRecipe(recipe) {
  const normalizedRecipe = [...recipe].map(normalizeAndLowerCase);
  return normalizedRecipe;
}

function normalizeAndLowerCase(str) {
  return removeAccents(str).toLowerCase();
}

function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}
