import { useEffect, useState } from 'react';
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
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

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

  // Apply the theme class to <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);


  return (
    <div className='min-h-screen max-w-screen flex justify-center items-center P-4'>
      <div className='flex flex-col items-center  bg-gray-100 p-4 dark:bg-gray-900 min-h-screen min-w-[600px]'>
        <div className='w-full p-4 justify-end items-end flex'><button className='bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-600' onClick={() => setDarkMode(!darkMode)}>{darkMode ? "🌞" : "🌙"}</button></div>
        <p className='text-2xl font-bold mb-16 dark:text-white'>
          JP Flash Cards
        </p>

        {/* Progress tracker */}
        <p className='text-gray-700 mb-2 dark:text-white'>
          Card {currentIndex + 1} of {cards.length} | Reviewed : {reviewed}
        </p>


        {/* FlashCard Display */}
        <FlashCard front={cards[currentIndex].front} back={cards[currentIndex].back} />

        <div className='mt-4 flex gap-4'>
          <button className='bg-blue-500 dark:bg-blue-900 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600'
            onClick={nextCard}
            disabled={currentIndex === cards.length - 1}>
            Next
          </button>

          <button className='bg-gray-500 text-white dark:bg-gray-800 px-4 py-2 rounded-md shadow-md hover:bg-gray-600' onClick={shuffleCards}>
            Shuffle
          </button>
        </div>

      </div>
    </div>
  )
}

export default App
