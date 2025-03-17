import './App.css'
import FlashCard from './flash-cards'

function App() {

  const cards = [
    { front: "What is React?", back: "A JavaScript library for UI." },
    { front: "What is JSX?", back: "A syntax extension for JavaScript." },
    { front: "What is Tailwind?", back: "A utility-first CSS framework." },
  ];

  return (
    <><p className='text-2xl font-bold mb-4'>
      JP Flash Cards
    </p><div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4'>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3.5'>
          {cards.map((card, index) => {
            return (
              <FlashCard key={index} front={card.front} back={card.back} />
            );
          })}
        </div>
      </div></>
  )
}

export default App
