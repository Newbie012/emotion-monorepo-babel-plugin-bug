const theme = {
    colors: {
        primary: "blue"
    }
};

export type Theme = typeof theme;
export type PropsWithTheme<T> = T & { theme: Theme };

export default theme;
