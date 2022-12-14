import React, { useEffect, useRef, useState } from "react";
import FlashcardsList from './FlashcardsList.js';
import './App.css';
import axios from "axios";

function App() {
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS);
  const [categories, setCategories] = useState([]);

  const categoryEl = useRef();
  const amountEl = useRef();

  useEffect(()=>{
    axios
      .get('https://opentdb.com/api_category.php')
      .then(res => {
        setCategories(res.data.trivia_categories)
      })
  },[])

  useEffect(()=>{
    axios
      .get('https://opentdb.com/api.php?amount=30')
      .then(res => {
        setFlashcards(res.data.results.map((questionItem, index)=>{
          const answer = decodeString(questionItem.correct_answer);
          const options = [...questionItem.incorrect_answers.map(a => decodeString(a)), answer]
          return{
            id: `${index} - ${Date.now()}`, //Date so that it's unique
            question: decodeString(questionItem.question),
            answer: answer,
            options: options.sort(() => Math.random() - .5) //?
          }
        }))
      })
  },[])

  function decodeString(str){
    const textArea = document.createElement('textarea');
    textArea.innerHTML = str;
    return textArea.value;
  }

  function handleSubmit(e){
    e.preventDefault();
    axios
    .get('https://opentdb.com/api.php', {
      params: {
        amount: amountEl.current.value,
        category: categoryEl.current.value
      }
    })
    .then(res => {
      setFlashcards(res.data.results.map((questionItem, index) => {
        const answer = decodeString(questionItem.correct_answer)
        const options = [
          ...questionItem.incorrect_answers.map(a => decodeString(a)),
          answer
        ]
        return {
          id: `${index}-${Date.now()}`,
          question: decodeString(questionItem.question),
          answer: answer,
          options: options.sort(() => Math.random() - .5)
        }
      }))
    })
  }

  return ( 
    <>
      <form className="header" onSubmit={handleSubmit}>
        <div className="form-group">
           <label htmlFor="label">Category</label> {/*htmlFor property sets or returns the value of the for attribute of a label. */}
        </div>
        <select id='category' ref={categoryEl}>
          {categories.map(category => {
            return <option value={category.id} key={category.id}>{category.name}</option>
          })}
        </select>

        <div className="form-group">
           <label htmlFor="amount">Number of Questions</label> {/*htmlFor property sets or returns the value of the for attribute of a label. */}
           <input type='number' id='amount' min='1' step='1' defaultValue={10} ref={amountEl}></input>
        </div>

        <div className="form-group">
           <button className="btn">Generate</button>
        </div>
      </form>
      <div className="container">
        <FlashcardsList flashcards={flashcards}/>
      </div>
    </>
  );
}

const SAMPLE_FLASHCARDS = [
  {
    id: 1,
    question: "2 + 2 = ?",
    answer: '4',
    options: [
      '2',
      '3',
      '4',
      '5'
    ]
  },
  {
    id: 2,
    question: "2 + 3 = ?",
    answer: '5',
    options: [
      '2',
      '5',
      '3',
      '1'
    ],
  }
]

export default App;
