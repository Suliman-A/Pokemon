import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonDetails {
  name: string;
  image: string;
  traits: string[];
}

const Home = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails[]>([]);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
        setPokemonList(response.data.results);
      } catch (error) {
        console.error('Error fetching Pokémon list:', error);
      }
    };

    fetchPokemonList();
  }, []);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const detailsPromises = pokemonList.map(async (pokemon) => {
          const response = await axios.get(pokemon.url);
          const { name, sprites, types } = response.data;
          const traits = types.map((type: any) => type.type.name);
          const image = sprites.front_default;
          return { name, image, traits };
        });

        const details = await Promise.all(detailsPromises);
        setPokemonDetails(details);
      } catch (error) {
        console.error('Error fetching Pokémon details:', error);
      }
    };

    if (pokemonList.length > 0) {
      fetchPokemonDetails();
    }
  }, [pokemonList]);
  console.log(pokemonList)
  return (
    <>
    <div className="container mx-auto p-2 justify-center">
      <h1 className="text-2xl font-bold text-center mt-8">Pokémon List</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-8">
        {pokemonDetails.map((pokemon) => (
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
        ))}
      </div>
    </div>
    </>
  )
}

export default Home