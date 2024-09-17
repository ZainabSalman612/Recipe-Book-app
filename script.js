const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-Btn');


//Func to get recipes
const fetchRecipes = async (query)=>{
  recipeContainer.innerHTML="<h2>Loading...</h2>";
  const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
  const response = await data.json();

//Recipe Container
  recipeContainer.innerHTML="";
  response.meals.forEach(meal => {
    const recipeDiv = document.createElement('div');
    recipeDiv.classList.add('recipe');
    recipeDiv.innerHTML = `
    <img src = "${meal.strMealThumb}">
    <h3>${meal.strMeal}</h3>
    <p>${meal.strCategory}</p>
    `
//View Recipe Button
const button=document.createElement('button');
    button.textContent = "View Recipe"
    recipeDiv.appendChild(button)
    //Adding add event listener to button
    button.addEventListener('click',()=>{
        openRecipePopup(meal);
    })
    
    recipeContainer.appendChild(recipeDiv);
  });
  
}
//Open recipe Function
const openRecipePopup = (meal) =>{recipeDetailsContent.innerHTML = `
    <h2 class="recipe-name">${meal.strMeal}</h2>
    <h3>Ingredients:</h3>
    <ul class="ingredient-list">${fetchIngredients(meal)}</ul>
    <div class="recipe-instructions">
      <h3>Instructions:</h3>
      <p class="recipe-instructions">${meal.strInstructions}</p>
    </div>
    
   `
    recipeDetailsContent.parentElement.style.display = "block";
}

//Function to fetch ingredients and measurements
const fetchIngredients = (meal) => {
    let ingredientList = "";
    for(let i=1 ; i<=20 ; i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i }`];
            ingredientList += `<li>${ingredient} (${measure})</li>`
        }
        else{
        break;
        }
    }
    return ingredientList;
}

searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    fetchRecipes(searchInput);
});

recipeCloseBtn.addEventListener('click',()=>{
    recipeDetailsContent.parentElement.style.display = "none";
});


