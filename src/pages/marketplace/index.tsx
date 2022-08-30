import {NextPage} from "next";
import Layout from "../../components/Layout";
import {Flex} from "@chakra-ui/layout";
import WelcomeHolder from "../../components/WelcomeHolder";
import CarouselCustom from "../../components/Carousel";
import Products from "../../components/Products";
import {mocksNft} from "../home";


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