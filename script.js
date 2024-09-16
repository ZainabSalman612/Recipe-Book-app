const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');

const fetchRecipes = ()=>{
  const date = fetch(`www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata`)
}

searchBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    fetchRecipes();
});