import { NextPage } from "next";
import Layout from "../../components/Layout";
import { Flex } from "@chakra-ui/layout";
import WelcomeHolder from "../../components/WelcomeHolder";
import CarouselCustom from "../../components/Carousel";
import Products from "../../components/Products";
import { mocksNft } from "../home";
import UserProducts from "../../components/userProducts";

const Wallet: NextPage = () => {
  return (
    <Layout>
      <Flex flex={1}>
        <UserProducts products={mocksNft} categoryText={"My NFT's"} />
      </Flex>
    </Layout>
  );
};

export default Wallet;
