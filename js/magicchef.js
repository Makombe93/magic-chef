// modules/Favorites.js
import { getRecipeDetail } from './utils.js';

export class Favorites {
    async render(container) {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const favoriteRecipes = await Promise.all(favorites.map(id => getRecipeDetail(id)));

        container.innerHTML = `
            <h2>Favorites</h2>
            <div class="grid-view">
                ${favoriteRecipes.map(recipe => `
                    <div class="grid-item">
                        <img src="${recipe.image}" alt="${recipe.title}">
                        <h3>${recipe.title}</h3>
                        <button data-id="${recipe.id}" class="view-detail">View Details</button>
                        <button data-id="${recipe.id}" class="remove-favorite">Remove from Favorites</button>
                    </div>
                `).join('')}
            </div>
        `;

        container.querySelectorAll('.view-detail').forEach(button => {
            button.addEventListener('click', (e) => {
                const recipeId = e.target.getAttribute('data-id');
                const recipeDetail = new RecipeDetail(recipeId);
                recipeDetail.render(container);
            });
        });

        container.querySelectorAll('.remove-favorite').forEach(button => {
            button.addEventListener('click', (e) => {
                const recipeId = e.target.getAttribute('data-id');
                removeFavorite(recipeId);
                this.render(container);
            });
        });
    }
}

function
