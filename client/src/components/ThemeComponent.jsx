class ThemeComponent {

    getActualTheme() {
        let localTheme = localStorage.getItem("theme");

        // if the theme is not set, will set the default dark theme
        if (!localTheme) {
            localStorage.setItem("theme", "dark");
            localTheme = "dark";
            console.log("setTheme");
        }

        // verify what is the theme to set the page body color style
        if (localTheme == "dark") {
            document.body.style.backgroundColor = "var(--black-background)";
        }
        else {
            document.body.style.backgroundColor = "var(--white-background)";
        }

        return localTheme;
    }

}

export default ThemeComponent;