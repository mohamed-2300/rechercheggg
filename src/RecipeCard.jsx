import React from 'react';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img className="w-full h-48 object-cover" src={recipe.image} alt={recipe.label} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-green-700">{recipe.label}</div>
        <p className="text-gray-700 text-base">
          <span className="font-semibold">Calories:</span> {Math.round(recipe.calories)} kcal
        </p>
        <p className="text-gray-700 text-base">
          <span className="font-semibold">Temps de préparation:</span> {recipe.totalTime || 'N/A'} min
        </p>
        <div className="mt-4">
          <span className="font-semibold">Ingrédients:</span>
          <ul className="list-disc list-inside">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient.text}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
