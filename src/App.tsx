
import './App.css';
import React, { useState, useEffect } from 'react';
import Header from './components/header';
import CharacterContainer from './components/character_container';
import Navigation from './components/navigation';
import { DisneyCharacter } from './disney_character';


const favourite: number[] = [];
const updateFavourite = (favourites: number[]) => { };


export const FavouritesContext = React.createContext(favourite);
export const FavouritesUpdateContext = React.createContext(updateFavourite);


const App: React.FC = () => {

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [characterFavourites, setCharacterFavourites] = useState<Array<number>>([]);

  // Some dummy state representing disney characters
  const [characters, setCharacters] = useState<Array<DisneyCharacter>>([]);

  useEffect(() => {
    getCharacters(currentPage);
  }, [currentPage]);

  const getCharacters = async (pageNumber: number) => {
    const apiResponse = await fetch(`http://api.disneyapi.dev/characters?page=${pageNumber}`);
    const json = await apiResponse.json() as { data: DisneyCharacter[] };
    setCharacters(json.data);
  };

  return (
    <FavouritesContext.Provider value={characterFavourites}>
      <FavouritesUpdateContext.Provider value={setCharacterFavourites}>
        <div className="page">
          <Header currentPage={currentPage} />
          <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <CharacterContainer characters={characters} />
        </div>
      </FavouritesUpdateContext.Provider>
    </FavouritesContext.Provider>

  );
}

export default App;
