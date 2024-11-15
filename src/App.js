import React, { useState } from 'react';
import RecipeCard from './RecipeCard';

const APP_ID = '5dd1075a';
const APP_KEY = 'c9dd31132112e634bac8c8312ee4374e';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [error, setError] = useState('');

  const fetchRecipes = async () => {
    setError(''); // Réinitialiser l'erreur
    const response = await fetch(
      `https://api.edamam.com/search?q=${search}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();

    if (data.hits.length === 0) {
      setError('Aucune recette trouvée pour cette recherche.');
      setRecipes([]);
    } else {
      let sortedRecipes = data.hits.map((hit) => hit.recipe);

      // Appliquer le tri selon l'option sélectionnée
      if (sortOption === 'calories') {
        sortedRecipes = sortedRecipes.sort((a, b) => a.calories - b.calories);
      } else if (sortOption === 'time') {
        sortedRecipes = sortedRecipes.sort((a, b) => (a.totalTime || Infinity) - (b.totalTime || Infinity));
      }

      setRecipes(sortedRecipes);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() === '') {
      setError('Veuillez entrer un mot-clé pour la recherche.');
      setRecipes([]);
      return;
    }
    fetchRecipes();
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center p-8">
      <form onSubmit={handleSearch} className="flex flex-col items-center mb-8 space-y-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher une recette..."
          className="border-2 border-green-300 rounded-lg p-2 w-80 transition duration-300 transform focus:scale-105 focus:outline-none focus:border-green-500"
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600">
          Rechercher
        </button>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border-2 border-green-300 rounded-lg p-2 w-80"
        >
          <option value="">Trier par</option>
          <option value="calories">Calories</option>
          <option value="time">Temps de préparation</option>
        </select>
      </form>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default App;
