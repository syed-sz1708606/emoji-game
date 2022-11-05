import { Typography, Stack, Link } from "@mui/material"
import styles from "../styles/Home.module.css"

const Header = ({ level, matched }) => {

  return (
    <Stack component="header" sx={{ my: '1rem' }} direction="row" justifyContent="space-between" alignItems="center">
      <nav>
        <Typography sx={{ fontSize: "2rem" }} className={styles.header}>Level {level}</Typography>
      </nav>
      <Stack display={matched.length === level ? "block" : "none"}>
        <Typography variant="h5">
          <Link href={`/tiles?level=${level + 1}`}>
            Level: {level + 1}
          </Link>
        </Typography>
      </Stack>
    </Stack>
  )
}

export default Header