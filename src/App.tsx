import { useState } from 'react';
import './App.css'
import FlashCard from './flash-cards'

function App() {

  const initialCards = [
    { front: "What is React?", back: "A JavaScript library for UI." },
    { front: "What is JSX?", back: "A syntax extension for JavaScript." },
    { front: "What is Tailwind?", back: "A utility-first CSS framework." },
    { front: "What is useState?", back: "A React Hook for state management." },
  ];
  const [cards, setCards] = useState(initialCards)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [reviewed, setReviewed] = useState(0)

  // shuffle cards randomly
  function shuffleCards() {
    setCards(prevState => (prevState.sort(() => Math.random() - 0.5)))
    setCurrentIndex(0)
    setReviewed(0)
  }

  function nextCard() {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setReviewed(reviewed + 1)
    }
  }


  return (
    <><p className='text-2xl font-bold mb-4'>
      JP Flash Cards
    </p><div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4'>


        {/* Progress tracker */}
        <p className='text-gray-700 mb-2'>
          Card {currentIndex + 1} of {cards.length} | Reviewed : {reviewed}
        </p>


        {/* FlashCard Display */}
        <FlashCard front={cards[currentIndex].front} back={cards[currentIndex].back} />

        <div className='mt-4 flex gap-4'>
          <button className='bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600'
            onClick={nextCard}
            disabled={currentIndex === cards.length - 1}>
            Next
          </button>

          <button className='bg-gray-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-600' onClick={shuffleCards}>
            Shuffle
          </button>
        </div>
      </div></>
  )
}

export default App
