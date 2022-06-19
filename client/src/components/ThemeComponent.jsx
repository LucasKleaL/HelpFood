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
            document.body.style.backgroundColor = "var(--gray-dark-background)";
        }
        else {
            document.body.style.backgroundColor = "var(--gray-line)";
        }

        return localTheme;
    }

    getTypographyColor(theme) {
        if (theme == "dark") {
            return "var(--gray-line)";
        }
        else {
            return "var(--black-background)";
        }
    }

    getTypographyContrastColor(theme) {
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

    getCardBackgroundColor(theme) {
        if (theme == "dark") {
            return "var(--black-background)";
        } 
        else {
            return "var(--white-background)";
        }
    }

    setThemeSwitch(theme) {
        localStorage.setItem("theme", theme);
    }

    handleSwitch() {

    }

}

export default ThemeComponent;