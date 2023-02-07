import React, { useContext } from 'react';
import { FavouritesContext } from '../App';
import { DisneyCharacter } from "../disney_character"

interface CharacterProps {
  character: DisneyCharacter;
}

// for our props we can reuse the DisneyCharacter interface
// - defining an anonymous type that just has one property - a DisneyCharacter
const Character: React.FC<CharacterProps> = ({ character }) => {
  const characterFavourites = useContext(FavouritesContext);
  // Define a default in case the character doesn't have an image
  let imageSrc = "https://picsum.photos/300/200/?blur";

  if (character.imageUrl) {
    imageSrc = character.imageUrl;
  }

  function toggleFavouriteForCharacter(characterId: number) {
    if (!characterFavourites.values.includes(characterId)) {
      // add to favourites
      characterFavourites.set([...characterFavourites.values, characterId]);
    }
    else {
      // remove from favourites
      const updatedFavourites = characterFavourites.values.filter((id) => id !== characterId);
      characterFavourites.set(updatedFavourites);
    }
  }

  return (
    <article className="character-item">

      <h2>{character.name}</h2>

      <div className="character-item__actions" onClick={() => toggleFavouriteForCharacter(character._id)}>
        {!characterFavourites.values.includes(character._id) ? "Add to Favourites" : "Favourited"}
      </div>

      <img className="character-item__img" src={imageSrc} alt={character.name} />

    </article>
  )
}


export default Character