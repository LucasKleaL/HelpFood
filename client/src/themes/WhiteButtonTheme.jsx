import { createTheme } from "@material-ui/core"; 

const MaterialButtonTheme = createTheme({  
    palette: {
      primary: {
        light: "#FFFFFF",
        main: "#FFFFFF",
        dark: "#121212",
        getContrastText: "#121212"
      }
    }
});

export default MaterialButtonTheme;