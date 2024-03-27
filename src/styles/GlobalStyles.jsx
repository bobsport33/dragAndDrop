import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    :root {
        background: rgb(12,148,71);
        background: radial-gradient(circle, rgba(12,148,71,1) 0%, rgba(232,232,232,1) 71%);
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
