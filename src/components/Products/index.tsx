import { Box, Flex } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { useContract, useContractRead } from "wagmi";
import { storeContractAddress } from "../../constants/contractInfo";
import { STORE_ABI } from "../../constants/nft.abi";
import HeadLine from "../HeadLine";
import { NftCardType } from "../NftCard";
import NftCardContainer from "../NftCard/NftCardContainer";
type ProductsType = {
  products: NftCardType[];
  categoryText: string;
};

const Products = ({ products, categoryText }: ProductsType) => {
  const { data, isError, isLoading, error } = useContractRead({
    addressOrName: storeContractAddress,
    contractInterface: STORE_ABI,
    functionName: "itemCount",
  });
  const contract = useContract({
    addressOrName: storeContractAddress,
    contractInterface: STORE_ABI,
  });

  const [items, setItems] = useState<number[]>([]);
  useEffect(() => {
    if (isError) {
      console.log(error);
    }
    !isLoading && !isError;
    {
      let result: any = data;

      if (result) {
        let itmCount = result.toNumber();
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
          <NftCardContainer
            nftInd={it + 1}
            key={"ntf-" + i + "-" + categoryText}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default Products;
