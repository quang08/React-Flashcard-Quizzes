import React from 'react'
import Flashcards from './Flashcards'

function FlashcardsList({flashcards}) {
  return (
   <div className='card-grid'>
    {flashcards.map(flashcard => {
        return <Flashcards flashcard = {flashcard} key={flashcard.id}/>
    })}
   </div>
  )
}

export default FlashcardsList
