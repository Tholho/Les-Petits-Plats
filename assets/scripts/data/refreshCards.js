import getDisplayedCardsIds from "./getDisplayedCards";

export default async function refreshCards() {
  const ids = getDisplayedCardsIds();
  const cards = document.querySelectorAll(".cardRecipe__article");
  cards.forEach((card) => {
    //console.log("ID IS " + card.dataset.id);
    if (ids.includes(+card.dataset.id)) {
      card.classList.remove("hide");
    } else {
      card.classList.add("hide");
    }
  });
}
