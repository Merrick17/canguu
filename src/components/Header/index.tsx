import { Box, Flex } from "@chakra-ui/layout";
import { Hide, Show } from "@chakra-ui/media-query";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Logo from "../Logo";
import SearchBar from "./SearchBar";
import { AiOutlineMenu } from "react-icons/ai";
import { Button } from "@chakra-ui/button";
import { useSettingState } from "../../store/setting";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";

const Header = () => {
  const { isDisconnected } = useAccount();
  const toggleDrawer = useSettingState((state) => state.toggleDrawer);
  const { push } = useRouter();
  if (isDisconnected) {
    push("/");
    return <></>;
  } else
    return (
      <Flex
        m={0}
        py={"0.4rem"}
        px={"2rem"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Show below={"md"}>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Button
              p={0}
              mr={".4rem"}
              colorScheme={"whiteAlpha"}
              borderRadius={100}
              onClick={() => toggleDrawer(true)}
            >
              <AiOutlineMenu size={24} color={"#D4AF73"} />
            </Button>
            <Logo />
          </Flex>
        </Show>
        <Hide below={"md"}>
          <Box
            flex={1}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <SearchBar />
          </Box>
        </Hide>
        <Box flex={0.5} display={"flex"} justifyContent={"flex-end"}>
          <ConnectButton
            chainStatus="none"
            accountStatus={{
              smallScreen: "avatar",
              largeScreen: "full",
            }}
          />
        </Box>
      </Flex>
    );
};

export default Header;
