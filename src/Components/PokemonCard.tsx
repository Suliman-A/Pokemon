import React from 'react'


interface Pokemon {
    name: string;
    image: string;
    traits: string[];
  }
  
  interface PokemonCardProps {
    pokemon: Pokemon;
  }

  const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  return (
    <div key={pokemon.name} className="border border-gray-300 p-4 rounded">
        <img src={pokemon.image} alt={pokemon.name} className="object-cover h-48 w-48 mx-auto mb-4" />
        <h2 className="text-lg font-bold text-left">{pokemon.name}</h2>
        <ul className="flex gap-2 mt-2">
        {pokemon.traits.map((trait, index) => (
            <li key={index} className="text-center bg-gray-200 px-4 py-2 rounded-lg	">
            {trait}
            </li>
        ))}
        </ul>
    </div>
  )
}

export default PokemonCard