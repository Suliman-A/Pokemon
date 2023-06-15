import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Pokemon {
  name: string;
  image: string;
  attributes: { name: string; value: string }[];
}

const PokeDetails = () => {
  const { name: pokemonName } = useParams<{ name: string }>();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  console.log({ pokemonName })
  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        console.log(response.data )
        const { name, sprites, abilities } = response.data;
        const attributes = abilities.map((ability: any) => ({
          name: ability.ability.name,
          value: ability.slot.toString(),
        }));
        const image = sprites.front_default;
        setPokemon({ name, image, attributes });
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching Pokémon details:', error);
        setIsLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [pokemonName]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!pokemon) {
    return <div>Error loading Pokémon details.</div>;
  }

  return (
    <div className="flex flex-col">
        <div className="flex justify-center mt-4">
          <Link
            to="/"
            className="text-white text-sm bg-black rounded py-2 px-4 mb-4 text-center"
            style={{ display: 'inline-block' }}
          >
            &lt; Back
          </Link>
        </div>
      <h1 className="text-3xl font-bold text-center mt-4">{pokemon.name} Details</h1>
      <div className="flex justify-center mt-8">
        <img src={pokemon.image} alt={pokemon.name} className="w-96 h-96 mb-4"/>
      </div>
      <div className="mt-4 px-10">
        <h2 className="text-lg font-bold">Attributes:</h2>
        <ul className="list-disc">
          {pokemon.attributes.map((attribute, index) => (
            <li key={index} className="flex justify-between">
              <span className="font-bold">{attribute.name}:</span>
              <span className="">{attribute.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>

  );
};


export default PokeDetails;
