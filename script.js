document.addEventListener("DOMContentLoaded", () => {
    const foodOfTheDayButton = document.getElementById("get-food-of-the-day");
    const foodInfo = document.getElementById("food-info");
    const foodOfTheDayText = document.querySelector("h1");
    const apiKey = process.env.SPOONACULAR_API_KEY; // API-avaimen haku

    function displayFood(food) {
        foodInfo.innerHTML = `
            <h2>${food.title}</h2>
            <p>Valmis ${food.readyInMinutes} minuutissa</p>
            <p>Annokset: ${food.servings}</p>
            <img src="${food.image}" alt="${food.title}" width="300">
            <h3>Ainekset:</h3>
            <ul>
                ${food.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join('')}
            </ul>
            <h3>Ohjeet:</h3>
            <p>${food.instructions}</p>
        `;
        // Piilota "Food of the day" teksti
        foodOfTheDayText.style.display = "none";
    }

    async function getFoodOfTheDay() {
        try {
            const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}`);
            if (!response.ok) {
                throw new Error('Verkkovirhe');
            }
            const data = await response.json();
            displayFood(data.recipes[0]);
        } catch (error) {
            console.error('Hakuvirhe:', error);
            foodInfo.innerHTML = "Ruoka-aineen tietoja ei voitu hakea. Yritä myöhemmin uudelleen.";
        }
    }

    foodOfTheDayButton.addEventListener("click", getFoodOfTheDay);
});

