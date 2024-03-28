import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    :root {
        background: rgb(150,172,167);
    background: linear-gradient(132deg, rgba(150,172,167,1) 0%, rgba(219,233,230,1) 70%);
    }

    * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    }

    html {
        overflow-y: scroll;
    }

    html,
    body {
    max-width: 100vw;
    min-height: 100vh;
    overflow-x: clip;
    scroll-behavior: smooth;
    
    }

    a {
    color: inherit;
    text-decoration: none;
    }

`;
