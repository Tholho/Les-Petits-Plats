import getDisplayedCardsIds from "./getDisplayedCards";

export default async function refreshCards() {
  const ids = getDisplayedCardsIds();

  const cards = document.querySelectorAll(".cardRecipe__article");
  cards.forEach((card) => {
    if (card.dataset.id in ids) {
      console.log(ids);
      card.classList.remove("hide");
    } else {
      card.classList.add("hide");
    }
  });
}
