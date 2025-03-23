import { useState } from "react"
import { motion } from 'framer-motion'
import { useStore } from "zustand"
import { cardsStore } from "./state-management/store"

interface FlashCardT {
    front: string
    back: string
    id: number
}

export default function FlashCard(props: FlashCardT) {
    const [flipped, setFlipped] = useState(false)
    const { learned } = useStore(cardsStore)

    const learned_opacity = learned.includes(props.id) ? 0.5 : 1

    return (
        <motion.div onClick={() => setFlipped(!flipped)}
            whileHover={{ scale: 1.05 }}
            className="w-64 h-40 items-center flex justify-center dark:bg-gray-900 bg-white shadow-lg rounded-lg cursor-pointer perspective-1000">
            <motion.div className={`relative w-full h-full transition-transform duration-500`}
                style={{ transformStyle: 'preserve-3d', rotateY: flipped ? 180 : 0 }}>
                {/* front */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: learned_opacity, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className={`absolute w-full h-full flex items-center justify-center dark:bg-gray-800 bg-white shadow-lg rounded-lg backface-hidden`}>
                    <p className="text-lg font-semibold text-gray-800 dark:text-white">{props.front}</p>
                </motion.div>

                {/* Back Side */}
                <motion.div
                    style={{ rotateY: 180 }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: learned_opacity, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute w-full h-full flex items-center justify-center bg-blue-500 dark:bg-blue-900 text-white shadow-lg rounded-lg backface-hidden rotate-y-180">
                    <p className="text-lg font-semibold">{props.back}</p>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}
