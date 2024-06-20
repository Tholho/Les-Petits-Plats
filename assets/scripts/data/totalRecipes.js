//Updates recipes count display
export default function updateTotalRecipes() {
  const cards = document.querySelectorAll(".cardRecipe__article");
  const recipeTotal = document.querySelector(".sectionRecipes__recipe-total");
  let total = 0;
  cards.forEach((card) => {
    if (!card.classList.contains("hide")) {
      total++;
    }
  });
  if (total == 1 || total == 0) {
    recipeTotal.innerText = total + " recette";
  } else {
    recipeTotal.innerText = total + " recettes";
  }
}
