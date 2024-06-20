import getFilteredRecipes from "./getFilteredRecipes";
import { recipes } from "./recipes";

//Returns a list of unique ids of recipes that all filters allow
export default function getDisplayedCardsIds() {
  const displayedCardsIds = [];
  const filteredRecipes = getFilteredRecipes();
  if (filteredRecipes.length == 0) {
    let total = recipes.length;
    for (let i = 1; i <= +total; i++) {
      displayedCardsIds.push(+i);
    }
    return displayedCardsIds;
  }
  const leastRecipes = filteredRecipes.reduce((smallest, current) => {
    if (smallest < 1 || current.length < smallest.length) {
      return current;
    }
    return smallest;
  }, null);
  let keepRecipe = 1;
  leastRecipes.forEach((recipe) => {
    keepRecipe = 1;
    filteredRecipes.forEach((sublist) => {
      if (!sublist.includes(recipe)) {
        keepRecipe = 0;
      }
    });
    if (keepRecipe == 1) {
      displayedCardsIds.push(+recipe);
    }
  });
  return displayedCardsIds;
}
