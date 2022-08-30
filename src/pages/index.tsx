import { NextPage } from "next";
import {
  Box,
  Container,
  Heading,
  Image,
  keyframes,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { motion } from "framer-motion";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import { useAccount } from "wagmi";

const coinKeyframes = keyframes`
  0% { transform:  translateY(0)}
  50% { transform: translateY(-4rem) }
  100% { transform: translateY(0) }
`;

const coinAnimation = `${coinKeyframes} 4s ease-in-out infinite`;

const shadowKeyframes = keyframes`
  0% { transform:  scale(1) rotateX(60deg) rotateY(-10deg)}
  50% { transform: scale(1.4)  rotateX(60deg) rotateY(-10deg)}
  100% { transform: scale(1)  rotateX(60deg) rotateY(-10deg)}
`;

const shadowAnimation = `${shadowKeyframes} 4s ease-in-out infinite `;

const Home: NextPage = () => {
  const { isConnected } = useAccount();

  return (
    <Container
      flex={1}
      minW={"100vw"}
      minH={"100vh"}
      overflowX={"hidden"}
      className={styles.container}
    >
      {isConnected ? (
        <Box>
          <Stack
            direction={"row"}
            p={"1rem"}
            alignItems={"center"}
            justifyContent={"flex-end"}
            gap={"1rem"}
            height={"75px"}
          >
            <Link href={`/home`}>
              <a className={styles.linkHome}>Home</a>
            </Link>

            <Link href={`/create`}>
              <a className={styles.linkHome}>Upload your Nft</a>
            </Link>

            <ConnectButton />
          </Stack>
        </Box>
      ) : (
        <Box height={"75px"} />
      )}

      <Stack minH={"80vh"} direction={"row"} wrap={"wrap"} p={"4rem"}>
        <Box
          minW={"320px"}
          display={"flex"}
          flex={1}
          alignItems={"center"}
          pb={"2rem"}
        >
          <VStack gap={"1rem"} alignItems={"flex-start"}>
            <Heading color={"brand.100"}>Canggu Properti</Heading>
            <Text fontSize="xl" fontWeight={"500"} color={"text.200"}>
              We build the future with Nfts
            </Text>
            {!isConnected && <ConnectButton />}
          </VStack>
        </Box>

        <Box mt={"2rem"} minH={"100%"} flex={1} position={"relative"}>
          <Box boxSize="16rem" as={motion.div} animation={coinAnimation}>
            <Image
              boxSize="18rem"
              src={"/assets/gold-coin.png"}
              alt={"golden-coin"}
            />
          </Box>

          <Box
            as={motion.div}
            boxSize={"10rem"}
            bg={"brand.400"}
            position={"absolute"}
            left={"8rem"}
            style={{
              borderRadius: "6rem",
              backgroundBlendMode: "darken",
            }}
            animation={shadowAnimation}
          />
        </Box>
      </Stack>
    </Container>
  );
};

export default Home;
