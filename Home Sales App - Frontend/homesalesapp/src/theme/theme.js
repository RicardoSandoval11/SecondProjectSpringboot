import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#089fff'
        },
        secondary: {
            main: '#9fffff'
        },
        error: {
            main: red.A400
        }
    }
})
