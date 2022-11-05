import {useEffect} from 'react'
import { Typography } from "@mui/material";
import Link from 'next/link';


export default function Home() {


  return (  
    <>
      <Typography variant='h6' >
        Home 
      </Typography>
      <Link href="/tiles">Tiles</Link>
    </>
  )
}
