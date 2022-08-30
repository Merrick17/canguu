import {NextPage} from "next";
import {Hide, Show} from "@chakra-ui/media-query";
import {Box, Drawer, DrawerContent, DrawerOverlay, Flex, VStack} from "@chakra-ui/react";
import Logo from "../Logo";
import {menuBottom, menuTop} from "../../constants/menu";
import MenuItem from "./MenuItem";
import {useSettingState} from "../../store/setting";

// width of side menu
export const MENU_WIDTH = 280;

const Menu = () => {
    return (
        <Box w={MENU_WIDTH}
             minH={"100vh"}
             h={"100%"}
             alignSelf={"flex-start"}
             bg={"white"} shadow={"base"}>
            <Flex pt={"1rem"} justifyContent={"center"}>
                <Logo/>
            </Flex>
            <VStack mt={"4rem"} gap={"0.6rem"}>
                {menuTop.map((it, i) => <MenuItem {...it} key={it.url}/>)}

                <Box pt={0.4} minW={200} bg={"#aaaaaa44"}/>

                {menuBottom.map((it, i) => <MenuItem {...it} key={it.url}/>)}

            </VStack>
        </Box>
    );
};
const SideMenu: NextPage = () => {
    const openDrawer = useSettingState(state => state.openDrawer);
    const toggleDrawer = useSettingState(state => state.toggleDrawer);
    return (
        <>
            <Hide below={"md"}>
                <Menu/>
            </Hide>
            <Show below={"md"}>
                <Drawer
                    isOpen={openDrawer}
                    placement='left'
                    onClose={() => {
                        toggleDrawer(false)
                    }}
                    closeOnEsc={true}
                    closeOnOverlayClick={true}
                >
                    <DrawerOverlay/>
                    <DrawerContent maxW={MENU_WIDTH}>
                        <Menu/>
                    </DrawerContent>
                </Drawer>
            </Show>

        </>
    );
};

export default SideMenu;
