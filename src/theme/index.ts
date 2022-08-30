// @ts-ignore
import {extendTheme} from "@chakra-ui/react";

/*
*
*  const breakpoints = {
*    sm: '30em',
*    md: '48em',
*    lg: '62em',
*    xl: '80em',
*     2xl': '96em',
*    }
*
* */

const theme = extendTheme({
    colors: {
        brand: {
            100: "#D3B27E",
            200: "#D4AF73",
            400: " rgba(217, 171, 144, 0.34)",
            500: " rgba(217, 171, 144, 0.34)",
            900: "#F0EAE0",
        },
        text: {
            100: "#AAAAAA40",
            200: "#AAAAAA",
            400: "#9C9C9C"
        },
        bg: {
            100: "#F5F5F5"
        }
    },
});

export default theme;