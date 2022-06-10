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

    getTypographyColor(theme) {
        if (theme == "dark") {
            return "var(--white)";
        }
        else {
            return "var(--black)";
        }
    }

    getBackgroundColor(theme) {
        if (theme == "dark") {
            return "var(--gray-dark-background)";
        }
        else {
            return "var(--gray-line)";
        }
    }

    getContrastColor(theme) {
        if (theme == "dark") {
            return "var(--black-background)";
        }
        else {
            return "var(--gray-dark-background)";
        }
    }

    getBlackBackgroundColor(theme) {
        return "var(--black-background)";
    }

    setThemeSwitch(theme) {
        localStorage.setItem("theme", theme);
    }

}

export default ThemeComponent;