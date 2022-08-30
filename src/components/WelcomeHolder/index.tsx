import {Box, Flex} from "@chakra-ui/layout";
import HeadLine from "../HeadLine";
import {ConnectButton} from "@rainbow-me/rainbowkit";
import {Image, Text} from "@chakra-ui/react";
import {useAccount} from "wagmi";

const WelcomeHolder = () => {
    const {isConnected} = useAccount();
    return (
        <Flex
            m={0}
            flex={0.4}
            alignItems={"center"}
            justifyContent={"center"}
            minW={{
                base: '100%',
                md: '48%',
            }}
            flexDir={"column"}
            h={480}
            bg={'brand.500'}
            position={"relative"}
        >
            <Box my={"1.2rem"}>
                <HeadLine size={"2xl"} title={"Canggu Properti"}/>
            </Box>
            <Box maxW={"80%"} my={"1.2rem"}>
                <Text textAlign={"center"} color={"text.200"}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting
                    industry. Lorem Ipsum has been the industry's standard dummy text ever
                    since the 1500s
                </Text>
            </Box>
            <Box my={"1.2rem"}>
                {!isConnected && <ConnectButton/>}
            </Box>

            <Image
                position={"absolute"}
                right={"1rem"}
                top={"1.4rem"}
                opacity={0.4}
                boxSize='6rem'
                src={"/assets/gold-coin.png"} alt={"golden-coin"}/>
        </Flex>
    );
};

export default WelcomeHolder;
