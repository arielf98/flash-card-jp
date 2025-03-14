import { useState } from "react"

type FlashCardT = {
    front: 'string'
    back: 'string'
}

export default function FlashCard(props: FlashCardT) {
    const [flipped, setFlipped] = useState(false)

    return (
        <div onClick={() => setFlipped(state => !state)} className="w-64 h-40 items-center flex justify-center bg-white shadow-lg rounded-lg cursor-pointer transition-transform transform perspective-1000">
            <div className={`relative w-full h-full flex items-center justify-center text-lg font-semibold text-gray-800 p-4 rounded-lg transition-transform duration-500 ease-in-out`}></div>
        </div>
    )
}
