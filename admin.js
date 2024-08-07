document.addEventListener('DOMContentLoaded', () => {
    const adminRecipesContainer = document.getElementById('admin-recipes');
    const editModal = document.getElementById('edit-modal');
    const closeEditModal = document.getElementById('close-edit-modal');
    const editForm = document.getElementById('edit-form');
    const editIndexInput = document.getElementById('edit-index');
    const editNameInput = document.getElementById('edit-name');
    const editIngredientsInput = document.getElementById('edit-ingredients');
    const editStepsInput = document.getElementById('edit-steps');
    const editImageInput = document.getElementById('edit-image');

    function loadRecipes() {
        const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
        adminRecipesContainer.innerHTML = recipes.map((recipe, index) => `
            <div class="admin-recipe">
                <h3>${recipe.name}</h3>
                <img src="${recipe.image}" alt="${recipe.name}">
                <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
                <p><strong>Preparation Steps:</strong> ${recipe.steps}</p>
                <button onclick="editRecipe(${index})">Edit</button>
                <button onclick="deleteRecipe(${index})">Delete</button>
            </div>
        `).join('');
    }

    window.editRecipe = (index) => {
        const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
        const recipe = recipes[index];
        editIndexInput.value = index;
        editNameInput.value = recipe.name;
        editIngredientsInput.value = recipe.ingredients;
        editStepsInput.value = recipe.steps;
        editImageInput.value = recipe.image;
        editModal.style.display = 'flex';
    }

    window.deleteRecipe = (index) => {
        const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
        recipes.splice(index, 1);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        loadRecipes();
    }

    editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const index = editIndexInput.value;
        const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
        recipes[index] = {
            name: editNameInput.value,
            ingredients: editIngredientsInput.value,
            steps: editStepsInput.value,
            image: editImageInput.value
        };
        localStorage.setItem('recipes', JSON.stringify(recipes));
        editModal.style.display = 'none';
        loadRecipes();
    });

    closeEditModal.addEventListener('click', () => {
        editModal.style.display = 'none';
    });

    loadRecipes();
});
