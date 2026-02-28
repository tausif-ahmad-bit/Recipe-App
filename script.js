const searchbox = document.querySelector('.searchbox');
const searchbtn = document.querySelector('.searchbtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const closebtn = document.querySelector('.closebtn');

//fuction to fetch recipes from API
const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = '<h2>Preparing Recipes ...</h2>'; 
    // Show loading message
    try {
        
   
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();

    recipeContainer.innerHTML = ''; 

    response.meals.forEach(meal => {
        const recipediv = document.createElement('div');
        recipediv.classList.add('recipe');
        recipediv.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea} </span>Dish</p>
            <p>Belongs to <span>${meal.strCategory}</span>Category</p>
        `;


        const button = document.createElement('button');
        button.textContent = 'View Recipe';
        recipediv.appendChild(button);
        
        // adding event listner to recipe button
        button.addEventListener('click', () => {
            openRecipePopup(meal);
        });
        recipeContainer.appendChild(recipediv);
    });
    } catch (error) {
        recipeContainer.innerHTML = '<h2>No recipes found 😞. Please try again 🔄️.</h2>';
    }

};


//function to fectch ingredients and measurements.
const fetchIngredients = (meal) => {
    let ingredients = "";
    for (let i=1; i<=20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const meaurement = meal[`strMeasure${i}`];
            ingredients += `<li>${meaurement} - ${ingredient}</li>`;
        }
        else { 
            break;
        }
    }
    return ingredients;
}   

const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3>Ingredients:</h3>
        <ul class="ingredientsList">${fetchIngredients(meal)}</ul>
       <div class="recipeinstructions ">
           <h3>Instructions:</h3>
           <p >${meal.strInstructions}</p>
       </div>
    `;


    recipeDetailsContent.parentElement.style.display = 'block';
};

closebtn.addEventListener('click', () => {
    document.querySelector('.recipe-details').style.display = 'none';
});

searchbtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchinput = searchbox.value.trim();
    if (!searchinput) {
        recipeContainer.innerHTML = '<h2>Please enter recipe name...</h2>';
        return;
    }
    fetchRecipes(searchinput);
    // console.log("Search button clicked");
});