//The comments are for learning the way to use api

const searchInput = document.getElementById('searchInput'); //On recupere l'input du nom de plat ou ingrédient par son id
const results = document.getElementById('results'); //On recupere la div du resultat par son id
const randomMeal = document.getElementById('randomMeal'); //Button d'action pour afficher une recette aléatoire

let urlSearch = '';

const fetchSearch = async(url) => { //Async permet de dire que cette action sera excecuté apres le await( ce que l'on attend)
	meals = await fetch(
    `https://www.themealdb.com/api/json/v1/1/${url}`) //l'url est l'url generique qui peut accueillir un peu tout les fonctions de l'api
    .then(res => res.json())
    .then(res => res.meals) 
};

/* l'affichage attend la recherche / reponse 
et donc on stock dans une constante en async la constante attendu */
const searchDisplay = async() => {
    await fetchSearch(urlSearch);
  
    if (meals == null){
      results.innerHTML = `<span class="noResult">No results</span>`;
    }
    
    results.innerHTML = (
      
      meals.map(meal => (
              
        `
        <div class="searchContainer">
          <h2>${meal.strMeal}</h2>
          <div class="infos">
            <div>origin : ${meal.strArea}</div>
            <div>category : ${meal.strCategory}</div>
          </div>
          <img src='${meal.strMealThumb}' /></br>
          <a href="${meal.strYoutube}" target="_blank"><i class="fab fa-youtube"></i></a>
        </div>
        `
      )).join('') //Mettre string vide sinon automatiquement il y a des virgules lors d'un map
    )
  };

searchInput.addEventListener('input', (e) => {
    urlSearch = `search.php?s=${e.target.value}`; //Completion de l'url avec le morceau dynamique parametré par l'utilisateur
    searchDisplay(); //Apres le parametrage de ce que l'utilisateur cherche, la fonction est appelé pour ensuite afficher le contenu recherché
  });


  //Partie pour afficher des recettes aléatoire par l'action click du boutton "Recette aléatoire"

  //Création de la constante permettant de fetch random.php
  const randomMealDisplay = async() => { //On créer une constante qui va attendre la fonction fetchSearch avec comme parametre le random.php
    await fetchSearch('random.php');
  
    results.innerHTML = (
      
      meals.map(meal => (
              
        `
          <div class="randomContainer">
            <h2>${meal.strMeal}</h2>
            <div class="infos">
              <div>origin : ${meal.strArea}</div>
              <div>category : ${meal.strCategory}</div>
            </div>
            <img src='${meal.strMealThumb}' />
            <p>${meal.strInstructions}</p>
            <a href="${meal.strYoutube}" target="_blank"><i class="fab fa-youtube"></i></a>
          </div>
        `
      ))
    );
  };
  
  randomMeal.addEventListener('click', randomMealDisplay) //lorsque le boutton est cliqué, l'evenement s'effectue, il change donc le contenu de l'affichage random
  randomMealDisplay();