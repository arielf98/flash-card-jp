import { useEffect, useState } from 'react';
import './App.css'
import FlashCard from './flash-cards'
import { useStore } from 'zustand';
import { cardsStore } from './state-management/store';
import { LOCAL_STORAGE_KEY } from './constant';

function App() {


  // const [cards, setCards] = useState(initialCards)
  const { learned, setLearned, setClearLearned, cards, setShuffleCards } = useStore(cardsStore)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [reviewed, setReviewed] = useState(0)
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });


  // shuffle cards randomly
  function shuffleCards() {
    setShuffleCards()
    setCurrentIndex(0)
    setReviewed(0)
  }

  function nextCard() {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setReviewed(reviewed + 1)
    }
  }

  function previousCard() {
    if (currentIndex < 1) {
      return
    }
    setCurrentIndex(currentIndex - 1)
  }

  function handleMarkAsLearned(id: number) {
    setLearned(id)
  }

  function handleResetProgress() {
    setClearLearned()
    localStorage.removeItem(LOCAL_STORAGE_KEY.LEARNED)
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
        <div className='w-full p-4 justify-end items-end flex gap-2'>
          <button className='bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-600' onClick={() => handleResetProgress()}>❌</button>
          <button className='bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-600' onClick={() => handleMarkAsLearned(cards[currentIndex].id)}> {learned.includes(cards[currentIndex].id) ? "✅" : "🧠"} </button>
          <button className='bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-600' onClick={() => setDarkMode(!darkMode)}>{darkMode ? "🌞" : "🌙"}</button>
        </div>

        <p className='text-2xl font-bold mb-16 dark:text-white'>
          JP Flash Cards
        </p>

        {/* Progress tracker */}
        <p className='text-gray-700 mb-2 dark:text-white'>
          Card {currentIndex + 1} of {cards.length}
        </p>


        {/* FlashCard Display */}
        <FlashCard front={cards[currentIndex].front} back={cards[currentIndex].back} id={cards[currentIndex].id} key={cards[currentIndex].id} />

        <div className='mt-4 flex gap-4'>
          <button className='bg-blue-500 dark:bg-blue-900 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600'
            onClick={nextCard}
            disabled={currentIndex === cards.length - 1}>
            Next
          </button>
          <button className='bg-blue-500 dark:bg-blue-900 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600'
            onClick={previousCard}>
            Previous
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
