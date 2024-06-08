document.addEventListener('DOMContentLoaded', function() {
    fetchRecipeOfTheDay();
    fetchPopularRecipes();
});

function fetchRecipeOfTheDay() {
    fetch('/api/recipe-of-the-day')
        .then(response => response.json())
        .then(data => {
            document.getElementById('recipe-of-the-day').innerHTML = `
                <h3>${data.title}</h3>
                <p>${data.instructions}</p>
            `;
        })
        .catch(error => console.error('Error fetching recipe of the day:', error));
}

function fetchPopularRecipes() {
    fetch('/api/popular-recipes')
        .then(response => response.json())
        .then(data => {
            const recipesContainer = document.getElementById('popular-recipes');
            data.recipes.forEach(recipe => {
                const recipeDiv = document.createElement('div');
                recipeDiv.innerHTML = `
                    <h4>${recipe.title}</h4>
                    <p>${recipe.instructions}</p>
                `;
                recipesContainer.appendChild(recipeDiv);
            });
        })
        .catch(error => console.error('Error fetching popular recipes:', error));
}
