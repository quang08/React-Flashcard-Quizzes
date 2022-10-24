import React, { useEffect, useRef, useState } from 'react'

function Flashcards({flashcard}) {
  //toggle flip card
  const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState('initial'); //set to whatever the initial value is

  const frontEl = useRef();
  const backEl = useRef();

  function setMaxHeight(){
    const frontHeight = frontEl.current.getBoundingClientRect().height; //actual dimensions of the rectangle and we get the height
    const backHeight = backEl.current.getBoundingClientRect().height;
    setHeight(Math.max(frontHeight,backHeight, 100)); //always gonna be biggest of frontHeight or backHeight or minimum of 100px
  }

  useEffect(()=>{
    setMaxHeight(); //whenever we refetch the api it will give us new questions and options + answers. that means we need to resize the containter
  },[flashcard.question, flashcard.answer, flashcard.option]); 

  useEffect(()=>{ //still calculate maxHeight when resize
    window.addEventListener('resize', setMaxHeight);
    return () => window.removeEventListener('resize', setMaxHeight);
  },[])

  return ( //whenever clicked change state of flip
    <div 
        className={`card ${flip ? 'flip' : ''}`} //handling dynamic classes  
        onClick={() => setFlip(!flip)}
        style={{height: height}}
    > 
        <div className='front' ref={frontEl}>
            {flashcard.question}
            <div className='flashcard-options'>
                {flashcard.options.map(option => {
                    return <div className='flashcard-option' key={option}>{option}</div>
                })}
            </div>
        </div>
        <div className='back' ref={backEl}>
            {flashcard.answer}
        </div>
      {/* {flip ? flashcard.answer : flashcard.question} */}
    </div>
  )
}

export default Flashcards
