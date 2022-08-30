import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Layout from "../../components/Layout";
import { Flex } from "@chakra-ui/layout";
import WelcomeHolder from "../../components/WelcomeHolder";
import CarouselCustom from "../../components/Carousel";
import Products from "../../components/Products";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import { useEffect } from "react";

export let mocksNft = [
  {
    name: "loreaez ermùezlrùz",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
    price: "120.5",
    owner: "56464674qs98dq7d98s7d9",
    nft: "https://bit.ly/2Z4KKcF",
  },
  {
    name: "loreaez ermùezlrùz",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
    price: "120.5",
    owner: "56464674qs98dq7d98s7d9",
    nft: "https://bit.ly/2Z4KKcF",
  },
  {
    name: "loreaez ermùezlrùz",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
    price: "120.5",
    owner: "56464674qs98dq7d98s7d9",
    nft: "https://bit.ly/2Z4KKcF",
  },
  {
    name: "loreaez ermùezlrùz",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
    price: "120.5",
    owner: "56464674qs98dq7d98s7d9",
    nft: "https://bit.ly/2Z4KKcF",
  },
];

const Home: NextPage = (props: AuthenticatedPageProps) => {
  useEffect(() => {}, []);
  return (
    <Layout>
      <Flex flex={1} flexDir={"row"} flexWrap={"wrap"}>
        <WelcomeHolder />
        <Flex
          flex={0.7}
          minW={{
            base: "100%",
            sm: "100%",
            md: "48%",
          }}
        >
          <CarouselCustom
            className={"carousel-height"}
            images={[
              "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
              "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
              "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
            ]}
          />
        </Flex>
      </Flex>
      <Flex flex={1}>
        <Products products={mocksNft} categoryText={"Deals"} />
      </Flex>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const token = await getToken({ req: context.req });

  const address = token?.sub ?? null;
  // If you have a value for "address" here, your
  // server knows the user is authenticated.

  // You can then pass any data you want
  // to the page component here.
  return {
    props: {
      address,
      session,
    },
  };
};

type AuthenticatedPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;

export default Home;
