import getFilteredRecipes from "./getFilteredRecipes";
import { recipes } from "./recipes";

export default function getDisplayedCardsIds() {
  const displayedCardsIds = [];
  const filteredRecipes = getFilteredRecipes();
  if (filteredRecipes.length == 0) {
    let total = recipes.length;
    // console.log(total);
    for (let i = 1; i <= +total; i++) {
      displayedCardsIds.push(+i);
    }
    // console.log(displayedCardsIds);
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
      //  console.log("BARRED");
      //  console.log(recipe);
      displayedCardsIds.push(+recipe);
    }
  });
  // console.log("YOYOYO" + displayedCardsIds);
  return displayedCardsIds;
}
