import { createTheme } from "@material-ui/core"; 

const MaterialButtonTheme = createTheme({  
    palette: {
      primary: {
        light: "#FFFFFF",
        main: "#3f51b5",
        dark: "#3f51b5",
        getContrastText: "#3f51b5"
      }
    }
});

export default MaterialButtonTheme;