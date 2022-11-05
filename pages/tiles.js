import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import * as emoji from "emoji-api";
import Header from '../component/Header';
import { Container } from '@mui/material';
import EmojiGrid from '../component/EmojiGrid';
import { shuffleArray } from "../utils/shuffleArray"


export async function getServerSideProps(context) {
    const passedLevel = context?.query.level ?? 1
    return {
        props: {
            passedLevel: passedLevel,
        }
    }
}

function Tiles({ passedLevel }) {

    const router = useRouter()
    const [level, setLevel] = useState(parseInt(passedLevel))
    const [randEmojis, setRandomEmojis] = useState([])
    const [matched, setMatched] = useState([])
    const [rotations, setRotations] = useState([])

    useEffect(() => {
        if (router.isReady) {
            if (!(router.query.level)) {
                router.push("/tiles?level=1")
            }
        }
    }, [router.isReady])

    useEffect(() => {
        let randEmojis = []
        let rotationArr = []

        while (randEmojis.length != passedLevel && passedLevel != 0) {
            const randEmoji = emoji.random().emoji
            const exists = randEmojis.findIndex(e => e === randEmoji)
            if (exists === -1) randEmojis.push(randEmoji)
        }

        randEmojis = [...randEmojis, ...shuffleArray(randEmojis)]


        for (let index = 0; index < randEmojis.length; index++) {
            const rndInt = `rotate(${Math.random().toFixed(2)}turn)`

            rotationArr.push(rndInt)
        }

        const lvl = parseInt(JSON.parse(localStorage.getItem('level')))
        if (lvl != level || !lvl) {
            localStorage.setItem("rotations", JSON.stringify(rotationArr))
            localStorage.setItem("emojis", JSON.stringify(randEmojis))
            localStorage.setItem("matched", JSON.stringify([]))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("level", JSON.stringify(level))
    }, [])

    useEffect(() => {
        setRandomEmojis((JSON.parse(localStorage.getItem("emojis"))))
        setRotations(JSON.parse(localStorage.getItem("rotations")))
    }, [])

    useEffect(() => {
        const matchingEmojis = (JSON.parse(localStorage.getItem("matched")))
        console.log('matching emojis')
        console.log(matchingEmojis)
        setMatched((JSON.parse(localStorage.getItem("matched"))))
    }, [])

    return (
        <Container>
            <Header level={level} matched={matched} />
            <EmojiGrid randEmojis={randEmojis} matched={matched} setMatched={setMatched} rotations={rotations} />
        </Container>
    )
}

export default Tiles