import { Flex } from "@chakra-ui/layout";
import { NextPage } from "next";
import Layout from "../../components/Layout";
import Products from "../../components/Products";
import { mocksNft } from "../home";


const MarketPlace: NextPage = () => {
    return (
        <Layout>
            <Flex flex={1}>
                <Products products={mocksNft} categoryText={"Deals"}/>
            </Flex>

            <Flex flex={1}>
                <Products products={mocksNft} categoryText={"New Arrival"}/>
            </Flex>
        </Layout>
    );
};

export default MarketPlace;