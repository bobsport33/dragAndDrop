import { GlobalStyles } from "@/styles/GlobalStyles";
import { Ubuntu } from "next/font/google";

const ubuntu = Ubuntu({
    weight: ["300", "400", "700"],
    subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
    return (
        <>
            <style jsx global>{`
                html {
                    font-family: ${ubuntu.style.fontFamily};
                }
            `}</style>
            <GlobalStyles />
            <Component {...pageProps} />;
        </>
    );
}
