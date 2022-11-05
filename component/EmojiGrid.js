import { Grid } from '@mui/material'
import { useEffect, useState, useReducer } from 'react'
import Tile from './Tile'

const EmojiGrid = ({ randEmojis, matched, setMatched, rotations }) => {

    let state = {
        fClick: "",
        sClick: "",
        fIndex: -1,
        sIndex: -1
    };

    function handleClick(emoji, index) {

        if (!(clicksState.fClick)) {
            dispatch({ type: "FIRST", payload: emoji, index: index })
        } else if (!(clicksState.sClick)) {
            dispatch({ type: "SECOND", payload: emoji, index: index })
        }
    }

    function clicksReducer(state, action) {
        switch (action.type) {
            case "FIRST":
                return {
                    ...state,
                    fClick: action.payload,
                    fIndex: action.index
                }
            case "SECOND":
                return {
                    ...state,
                    sClick: action.payload,
                    sIndex: action.index
                }
            case "CLEAR":
                return {
                    fClick: "",
                    sClick: "",
                    fIndex: -1,
                    sIndex: -1
                }
        }
    }

    const [clicksState, dispatch] = useReducer(clicksReducer, state)

    useEffect(() => {
        if ((clicksState.fClick && clicksState.sClick) && (clicksState.fIndex != clicksState.sIndex)) {
            if (clicksState.fClick === clicksState.sClick) {
                setMatched((prev) => {
                    localStorage.setItem("matched", JSON.stringify([...prev, clicksState.fClick]))
                    return ([...prev, clicksState.fClick])
                })
            }
            dispatch({ type: "CLEAR" })
        } else if ((clicksState.fIndex == clicksState.sIndex) && (clicksState.fClick && clicksState.sClick)) {
            dispatch({ type: "CLEAR" })
        }
    }, [clicksState])

    return (
        <Grid component="main" sx={{ flexGrow: 1 }} container spacing={5} columns={{ xs: 3, sm: 6, md: 9 }}>
            {randEmojis.map((_emoji, index) => {
                return (
                    <Grid item key={index}>
                        <Tile emoji={_emoji} index={index} isMatched={(matched.includes(_emoji) ? true : false)} 
                        handleClick={handleClick}
                        isSelected={(index == clicksState.fIndex) ? true : false}
                        rotateBy={rotations[index]}
                        />
                    </Grid>
                )
            })}
        </Grid>
    )
}

export default EmojiGrid