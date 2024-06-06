import { recipes } from "./recipes";

export default function initCards() {
  const cardArea = document.querySelector(".sectionRecipes__cardArea");

  recipes.forEach((recipe) => {
    const article = makeArticle(recipe);

    cardArea.append(article);
  });

  function makeArticle(recipe) {
    const article = document.createElement("article");
    article.classList.add("cardRecipe__article");
    article.dataset.id = recipe.id;
    const image = document.createElement("img");
    image.src = "assets/img/recipes/" + recipe.image;
    image.alt = "Photo de recette";
    article.appendChild(image);
    const div_article_text = document.createElement("div");
    div_article_text.classList.add("cardRecipe__article-text");

    const p_article_time = document.createElement("p");
    p_article_time.classList.add("cardRecipe__article-time");
    p_article_time.innerText = recipe.time + "min";
    div_article_text.appendChild(p_article_time);
    const h2_article_title = document.createElement("h2");
    h2_article_title.classList.add("cardRecipe__article-title", "anton");
    h2_article_title.innerText = recipe.name;
    div_article_text.appendChild(h2_article_title);
    const h3_article_subtitle1 = document.createElement("h3");
    h3_article_subtitle1.classList.add("cardRecipe__article-subtitle");
    h3_article_subtitle1.innerText = "Recette";
    div_article_text.appendChild(h3_article_subtitle1);
    const p_article_desc = document.createElement("p");
    p_article_desc.classList.add("cardRecipe__article-instructions");
    p_article_desc.innerText = recipe.description;
    div_article_text.appendChild(p_article_desc);
    const h3_article_subtitle2 = document.createElement("h3");
    h3_article_subtitle2.classList.add("cardRecipe__article-subtitle");
    h3_article_subtitle2.innerText = "Ingrédients";
    div_article_text.appendChild(h3_article_subtitle2);
    const dl_article_ingredient_list = document.createElement("dl");
    dl_article_ingredient_list.classList.add(
      "cardRecipe__article-ingredient-list",
    );
    recipe.ingredients.forEach((ingredient) => {
      const div_dt_dd = document.createElement("div");
      const dt_article_ingredient = document.createElement("dt");
      dt_article_ingredient.classList.add("cardRecipe__article-ingredient");
      dt_article_ingredient.innerText = ingredient.ingredient;
      div_dt_dd.appendChild(dt_article_ingredient);
      const dd_article_ingredient_amount = document.createElement("dd");
      dd_article_ingredient_amount.classList.add(
        "cardRecipe__article-ingredient-amount",
      );
      dd_article_ingredient_amount.innerText =
        (ingredient.quantity || "") + " " + (ingredient.unit || "");
      div_dt_dd.appendChild(dd_article_ingredient_amount);
      dl_article_ingredient_list.appendChild(div_dt_dd);
    });
    div_article_text.appendChild(dl_article_ingredient_list);
    article.appendChild(div_article_text);
    return article;
  }
}
