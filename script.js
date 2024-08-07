document.addEventListener('DOMContentLoaded', () => {
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    function displayRecipes(filteredRecipes = recipes) {
        const recipesContainer = document.getElementById('recipes');
        if (recipesContainer) {
            recipesContainer.innerHTML = '';
            if (filteredRecipes.length > 0) {
                filteredRecipes.forEach((recipe, index) => {
                    const recipeElement = document.createElement('div');
                    recipeElement.classList.add('recipe');
                    recipeElement.innerHTML = `
                        <h2>${recipe.name}</h2>
                        <img src="${recipe.image}" alt="${recipe.name}">
                    `;
                    recipeElement.addEventListener('click', () => showRecipeDetails(index));
                    recipesContainer.appendChild(recipeElement);
                });
            } else {
                recipesContainer.innerHTML = '<p>No recipes found.</p>';
            }
        }
    }

    function showRecipeDetails(index) {
        const recipe = recipes[index];
        const modal = document.getElementById('recipe-modal');
        const modalContent = modal.querySelector('.modal-content');
        modalContent.innerHTML = `
            <span class="close">&times;</span>
            <h2>${recipe.name}</h2>
            <img src="${recipe.image}" alt="${recipe.name}">
            <div>
                <h3>Ingredients:</h3>
                <p>${recipe.ingredients}</p>
                <h3>Preparation Steps:</h3>
                <p>${recipe.steps}</p>
            </div>
        `;
        modal.style.display = 'flex';

        // Close the modal when the user clicks on <span> (x)
        const closeButton = modalContent.querySelector('.close');
        closeButton.onclick = function() {
            modal.style.display = 'none';
        }

        // Close the modal when the user clicks anywhere outside of the modal
        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        }
    }

    function addRecipe(e) {
        e.preventDefault();
        const name = document.getElementById('recipe-name').value;
        const ingredients = document.getElementById('ingredients').value;
        const steps = document.getElementById('steps').value;
        const imageFile = document.getElementById('image').files[0];

        const reader = new FileReader();
        reader.onloadend = () => {
            const image = reader.result;
            const newRecipe = { name, ingredients, steps, image };
            recipes.push(newRecipe);
            localStorage.setItem('recipes', JSON.stringify(recipes));
            displayRecipes();
            document.getElementById('recipe-form').reset();
        };
        if (imageFile) {
            reader.readAsDataURL(imageFile);
        }
    }

    function searchRecipes(e) {
        const query = e.target.value.toLowerCase();
        const filteredRecipes = recipes.filter(recipe => 
            recipe.name.toLowerCase().includes(query) || 
            recipe.ingredients.toLowerCase().includes(query) ||
            recipe.steps.toLowerCase().includes(query)
        );
        displayRecipes(filteredRecipes);
    }

    const recipeForm = document.getElementById('recipe-form');
    if (recipeForm) {
        recipeForm.addEventListener('submit', addRecipe);
    }

    const searchInput = document.getElementById('search');
    if (searchInput) {
        searchInput.addEventListener('input', searchRecipes);
    }

    displayRecipes();
});
