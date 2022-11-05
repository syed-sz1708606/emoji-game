
import create from 'zustand';
import { persist } from 'zustand/middleware'
import * as emoji from "emoji-api";

let randEmojis = []
while (randEmojis.length != level) {
    const randEmoji = emoji.random().emoji
    const exists = randEmojis.findIndex(e => e === randEmoji)
    if (exists === -1) randEmojis.push(randEmoji)
}
randEmojis = [...randEmojis, ...shuffleArray(randEmojis)]

function randomEmojis(value) {
    let _value
    if (value) {
        _value = value
    } else {
        _value = 2
    }
    let randEmojis = []
    const i = 0
    while (i < _value) {
        const randEmoji = emoji.random().emoji
        const exists = randEmojis.findIndex(e => e === randEmoji)
        if (exists === -1) randEmojis.push(randEmoji)
        i++
    }
    randEmojis = [...randEmojis, ...shuffleArray(randEmojis)]
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}

export const useStore =
    create(
        persist((set) => ({
            level: 1,
            emojis: randomEmojis(0),
            matched: [],
            setLevel: (level) => set((state) => {
                return { ...state, level }
            }),
            setEmojis: (level) => set((state) => {
                return { ...state, emojis: randEmojis(level) }
            }),
            setMatched: (matchedEmoji) => set((state) => {
                return { ...state, matched: state.matched.push(matchedEmoji) }
            })
        }),
            { name: 'state' }
        )
    );