import NftCard, { NftCardType } from "../NftCard";
import { Box, Flex } from "@chakra-ui/layout";
import HeadLine from "../HeadLine";
import { useContractRead } from "wagmi";
import { STORE_ABI } from "../../constants/nft.abi";
import { utils } from "ethers";
import {
  nftContractAddress,
  storeContractAddress,
} from "../../constants/contractInfo";
import { useEffect, useState } from "react";
import NftCardContainer from "../NftCard/NftCardContainer";
type ProductsType = {
  products: NftCardType[];
  categoryText: string;
};

const Products = ({ products, categoryText }: ProductsType) => {
  const { data, isError, isLoading } = useContractRead({
    addressOrName: storeContractAddress,
    contractInterface: STORE_ABI,
    functionName: "itemCount",
  });
  const [items, setItems] = useState<number[]>([]);
  useEffect(() => {
    !isLoading && !isError;
    {
      let result: any = data;
      console.log("RESULT", result);
      if (result) {
        let itmCount = result.toNumber();
        console.log("Item Count", itmCount);

        let items = Array.from(Array(itmCount).keys());
        console.log("Items", items);
        setItems(items);
      }
    }
  }, [isLoading]);
  return (
    <Flex flexDir={"column"}>
      <Box p={"1rem"}>
        <HeadLine size={"xl"} title={categoryText} />
      </Box>

      <Flex p={"1rem"} width={"100%"} flexWrap={"wrap"} flex={1} gap={"1rem"}>
        {items.map((it, i) => (
          <NftCardContainer nftInd={it+1} key={"ntf-" + i + "-" + categoryText} />
        ))}
      </Flex>
    </Flex>
  );
};

export default Products;
