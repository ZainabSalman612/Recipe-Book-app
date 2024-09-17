const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-Btn');
const heroSection = document.querySelector('.hero'); // Select the hero section
const categoriesSection = document.querySelector('.categories'); // Select the categories section

// Function to get recipes
const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "<h2>Loading...</h2>";
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await response.json();
        recipeContainer.innerHTML = ""; // Clear the loading message

        if (data.meals) {
            data.meals.forEach(meal => {
                const recipeDiv = document.createElement('div');
                recipeDiv.classList.add('recipe');
                recipeDiv.innerHTML = `
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <h3>${meal.strMeal}</h3>
                    <p>${meal.strCategory}</p>
                `;
                // View Recipe Button
                const button = document.createElement('button');
                button.textContent = "View Recipe";
                recipeDiv.appendChild(button);

                // Adding event listener to button
                button.addEventListener('click', () => {
                    openRecipePopup(meal);
                });

                recipeContainer.appendChild(recipeDiv);
            });
        } else {
            recipeContainer.innerHTML = "<h2>No recipes found</h2>";
        }
    } catch (error) {
        recipeContainer.innerHTML = "<h2>Error fetching recipes. Please try again later.</h2>";
    }
};

// Open recipe Function
const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
        <h2 class="recipe-name">${meal.strMeal}</h2>
        <h3>Ingredients:</h3>
        <ul class="ingredient-list">${fetchIngredients(meal)}</ul>
        <div class="recipe-instructions">
            <h3>Instructions:</h3>
            <p class="recipe-instructions">${meal.strInstructions}</p>
        </div>
    `;
    recipeDetailsContent.parentElement.style.display = "block";
};

// Function to fetch ingredients and measurements
const fetchIngredients = (meal) => {
    let ingredientList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const measure = meal[`strMeasure${i}`];
            ingredientList += `<li>${ingredient} (${measure})</li>`;
        } else {
            break;
        }
    }
    return ingredientList;
};

// Event listeners
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    fetchRecipes(searchInput);
    heroSection.style.display = "none"; // Hide the hero section
    categoriesSection.style.display = "none"; // Hide the categories section
});

recipeCloseBtn.addEventListener('click', () => {
    recipeDetailsContent.parentElement.style.display = "none";
});
