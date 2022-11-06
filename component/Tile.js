import { Button, Typography } from '@mui/material'
import React from 'react'

const Tile = ({ emoji, index, isMatched, handleClick, isSelected, rotateBy }) => {

  const styles = { backgroundColor: isSelected ? "#59E391" : "transparent" }
  const selected = { backgroundColor: isMatched ? "rgba(216, 216, 216, 0.35)" : "transparent" }

  return (
    <div style={styles}>
      <Button variant="outlined" disabled={isMatched} sx={selected} onClick={() => handleClick(emoji, index)}>
        <Typography sx={{ fontSize: 36, transform: rotateBy }} >{emoji}</Typography>
      </Button>
    </div>
  )
}

export default Tile