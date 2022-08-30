import {BoxProps, Container} from "@chakra-ui/layout";
import {Box, HStack} from "@chakra-ui/react";
import {ReactNode} from "react";
import SideMenu from "../SideMenu";
import Header from "../Header";

type ContainerProps = {
    children?: ReactNode;
    options?: BoxProps;
};

const Layout = ({children, options}: ContainerProps) => {
    return (
        <HStack
            w={"100vw"}
            h={"100vh"}
            p={0}
            bg={"bg.100"}
            overflowX={"hidden"}
            overflowY={"hidden"}
        >
            <SideMenu/>
            <Box
                pb={"4rem"}
                bg={"bg.100"}
                flex={1}
                h={"100%"}
                marginInlineStart={0}
                marginInlineEnd={0}
                style={{
                    marginInlineStart: 0,
                }}
                {...options}
                overflowY={"auto"}
            >
                <Header/>
                {children}
            </Box>
        </HStack>
    );
};

export default Layout;
