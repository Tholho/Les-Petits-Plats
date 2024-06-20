import getDisplayedCardsIds from "./getDisplayedCards";

//Hides or displays cards depending on filters if no idList is given, else gives result of search + filters
export default function refreshCards(idList) {
  const cards = document.querySelectorAll(".cardRecipe__article");
  if (!idList) {
    const ids = getDisplayedCardsIds();
    cards.forEach((card) => {
      if (ids.includes(+card.dataset.id)) {
        card.classList.remove("hide");
      } else {
        card.classList.add("hide");
      }
    });
  } else {
    cards.forEach((card) => {
      if (idList.includes(+card.dataset.id)) {
        card.classList.remove("hide");
      } else {
        card.classList.add("hide");
      }
    });
  }
}
