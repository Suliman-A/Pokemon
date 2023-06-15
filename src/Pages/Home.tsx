import axios from 'axios';
import React, { useEffect, useState } from 'react'
import PokemonCard from '../Components/PokemonCard';
import { Link } from 'react-router-dom';

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
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const url = `https://pokeapi.co/api/v2/pokemon?limit=${resultsPerPage}&offset=${(currentPage - 1) * resultsPerPage}`
        const response = await axios.get(url);
        setPokemonList(response.data.results);
        setTotalResults(response.data.count);
      } catch (error) {
        console.error('Error fetching Pokémon list:', error);
      }
    };

    fetchPokemonList();
  }, [currentPage, resultsPerPage]);

  // useEffect(() => {
  //   const fetchPokemonList = async () => {
  //     try {
  //       const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
  //       setPokemonList(response.data.results);
  //     } catch (error) {
  //       console.error('Error fetching Pokémon list:', error);
  //     }
  //   };

  //   fetchPokemonList();
  // }, []);

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

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  return (
    <>
    <div className="container mx-auto p-2 justify-center">
    <div className="flex justify-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 mr-2 bg-blue-500 text-white rounded"
        >
          Previous
        </button>
        <div className='flex flex-col items-center'>
          <span className="mx-4">{`Show ${resultsPerPage} results`}</span>
          <span className="mx-4">{`Page ${currentPage}`}</span>
        </div>
        <button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(totalResults / resultsPerPage)}
          className="px-4 py-2 ml-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
      <h1 className="text-2xl font-bold text-center mt-8">Pokémon List</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-8">
        {pokemonDetails.map((pokemon) => (
          <Link key={pokemon.name} to={`pokemon/${pokemon.name}`}>
            <PokemonCard pokemon={pokemon} />
          </Link>
        ))}
      </div>
    </div>
    </>
  )
}

export default Home