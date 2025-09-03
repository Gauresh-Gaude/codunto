document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const resultsContainer = document.getElementById('results');

    searchBtn.addEventListener('click', () => {
        const query = searchInput.value;
        if (query) {
            fetchCocktails(query);
        }
    });

    async function fetchCocktails(query) {
        try {
            const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`);
            const data = await response.json();
            displayCocktails(data.drinks);
        } catch (error) {
            console.error("Error fetching cocktails:", error);
            resultsContainer.innerHTML = '<p class="text-center text-gray-500">Something went wrong. Please try again.</p>';
        }
    }

    function displayCocktails(drinks) {
        resultsContainer.innerHTML = '';
        if (!drinks) {
            resultsContainer.innerHTML = '<p class="text-center text-gray-500">No cocktails found. Try a different search term.</p>';
            return;
        }

        drinks.forEach(drink => {
            const cocktailCard = document.createElement('div');
            cocktailCard.className = 'bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105';
            
            cocktailCard.innerHTML = `
                <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" class="w-full h-48 object-cover">
                <div class="p-4">
                    <h2 class="text-xl font-bold mb-2">${drink.strDrink}</h2>
                    <p class="text-gray-600">${drink.strCategory}</p>
                    <button onclick="showDetails('${drink.idDrink}')" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        View Details
                    </button>
                </div>
            `;
            resultsContainer.appendChild(cocktailCard);
        });
    }

    window.showDetails = async function(drinkId) {
        try {
            const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`);
            const data = await response.json();
            const drink = data.drinks[0];
            
            if (drink) {
                const ingredients = [];
                for (let i = 1; i <= 15; i++) {
                    const ingredient = drink[`strIngredient${i}`];
                    const measure = drink[`strMeasure${i}`];
                    if (ingredient) {
                        ingredients.push(`${measure ? measure.trim() : ''} ${ingredient.trim()}`);
                    }
                }

                alert(`
Drink: ${drink.strDrink}
Category: ${drink.strCategory}
Glass: ${drink.strGlass}
Ingredients:
${ingredients.join('\n')}

Instructions:
${drink.strInstructions}
                `);
            }
        } catch (error) {
            console.error("Error fetching drink details:", error);
            alert("Could not load details.");
        }
    }
});