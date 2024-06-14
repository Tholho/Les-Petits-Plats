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
    //console.log(displayedCardsIds);
    return displayedCardsIds;
  }
  const mostRecipes = filteredRecipes.reduce((largest, current) => {
    return current.length > largest.length ? current : largest;
  }, filteredRecipes);
  //console.log(mostRecipes);
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
  return displayedCardsIds;
}
