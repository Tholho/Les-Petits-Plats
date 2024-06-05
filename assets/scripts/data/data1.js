// Ce fichier doit assurer la creation VOIRE l'affichage du DOM.
// '
import { recipes } from "./recipes.js";

export default function makeAllDOM() {
  //  makeCards();
  makeFilters();
}

/*
{
    "id": 1,
    "image": "Recette01.jpg",
    "name": "Limonade de Coco",
    "servings": 1,
    "ingredients": [
        {
            "ingredient": "Lait de coco",
            "quantity": 400,
            "unit": "ml"
        },
        {
            "ingredient": "Jus de citron",
            "quantity": 2
        },
        {
            "ingredient": "Crème de coco",
            "quantity": 2,
            "unit": "cuillères à soupe"
        },
        {
            "ingredient": "Sucre",
            "quantity": 30,
            "unit": "grammes"
        },
        {
            "ingredient": "Glaçons"
        }
    ],
    "time": 10,
    "description": "Mettre les glaçons à votre goût dans le blender, ajouter le lait, la crème de coco, le jus de 2 citrons et le sucre. Mixer jusqu'à avoir la consistence désirée",
    "appliance": "Blender",
    "ustensils": [
        "cuillère à Soupe",
        "verres",
        "presse citron"
    ]
}
*/

function makeCards() {
  recipes.forEach((recipe) => makeCard(recipe));
}

function makeCard(recipe) {
  console.log(recipe.id); // store in in data-id for further display toggling
  // principle is NO-Correspondance on tag => add a hiding marker on item
  // each enabled tag stores any item it added a marker upon
  // on tag removal, it removes the markers
  // filter on articles is then re applied
  console.log(recipe.name);
  console.log(recipe.image);
  console.log(recipe.ingredients); //do forEach
  console.log(recipe.ingredients[0]);
  console.log(recipe.time);
  console.log(recipe.description);
}

function makeFilters() {
  //aggregate filter
  //display éè but treat them as e
  // if user enters accent, must look explicitely for it ???
  //
  // How to generate tags ? FROM RECIPES ? hard to modify mais independant du DOM
  // C'est le mieux je pense(05/06)

  // useful DOM elements
  const ingredientsDropdown = document.querySelector(".ingredients-dropdown");
  const appareilsDropdown = document.querySelector(".appareils-dropdown");
  const ustensilesDropdown = document.querySelector(".ustensiles-dropdown");

  const ul_ingredients = ingredientsDropdown.querySelector("ul");
  const ul_appareils = appareilsDropdown.querySelector("ul");
  const ul_ustensiles = ustensilesDropdown.querySelector("ul");

  // Unique items lists that will be used for DOM generation

  const unique_ingredients = [];
  const unique_appareils = [];
  const unique_ustensiles = [];

  /*
  recipes.forEach((recipe) =>
    recipe.ingredients.forEach((ingredient) =>
      addUniqueItem(unique_ingredients, ingredient),
    ),
  );
  */

  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      addUniqueItem(unique_ingredients, ingredient.ingredient.toLowerCase());
    });
    addUniqueItem(unique_appareils, recipe.appliance);
    recipe.ustensils.forEach((ustensil) => {
      addUniqueItem(unique_ustensiles, ustensil.toLowerCase());
    });
  });
  /* probably useless because css does the job
  function capitalizeFirst(string) {
    const capitalized = string.charAt(0).toUpperCase() + string.slice(1);
    return capitalized;
  }
 */

  function addUniqueItem(list, item) {
    if (!list.includes(item)) {
      list.push(item);
    }
  }

  //  unique_ingredients.forEach((ingredient) => console.log(ingredient));
  unique_ustensiles.forEach((ingredient) => console.log(ingredient));
  //  unique_appareils.forEach((ingredient) => console.log(ingredient));

  //Generer une liste d'ingredients uniques, puis la trier par ordre
  // alphabetique, puis generer les 'li'
}
