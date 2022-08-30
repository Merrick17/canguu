import NftCard, { NftCardType } from "../NftCard";
import { Box, Flex } from "@chakra-ui/layout";
import HeadLine from "../HeadLine";
import { useAccount, useContract, useContractRead, useSigner } from "wagmi";
import { NFT_ABI, STORE_ABI } from "../../constants/nft.abi";
import { utils } from "ethers";
import {
  nftContractAddress,
  storeContractAddress,
} from "../../constants/contractInfo";
import { useEffect, useState } from "react";
import NftCardContainer from "../NftCard/NftCardContainer";
import UserNftCard from "../UserNftCard";
type ProductsType = {
  products: NftCardType[];
  categoryText: string;
};

const UserProducts = ({ products, categoryText }: ProductsType) => {
  const { data: signer, isError, isLoading } = useSigner();
  const nftContract = useContract({
    addressOrName: nftContractAddress,
    contractInterface: NFT_ABI,
    signerOrProvider: signer,
  });
  const storeContract = useContract({
    addressOrName: storeContractAddress,
    contractInterface: STORE_ABI,
    signerOrProvider: signer,
  });
  const { address } = useAccount();
  const [items, setItems] = useState<any[]>([]);
  const initUserItems = async () => {
    const filter = await storeContract.filters.Bought(
      null,
      null,
      null,
      null,
      null,
      address
    );
    const results = await storeContract.queryFilter(filter);
    const purchases = await Promise.all(
      results.map(async (i: any) => {
        // fetch arguments from each result
        i = i.args;
        // get uri url from nft contract
        const uri = await nftContract.tokenURI(i.tokenId);
        // use uri to fetch the nft metadata stored on ipfs
        const response = await fetch(uri);
        const metadata = await response.json();
        // get total price of item (item price + fee)
        const totalPrice = await storeContract.getTotalPrice(i.itemId);
        // define listed item object
        let purchasedItem = {
          totalPrice,
          price: i.price,
          itemId: i.itemId,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
        };
        return purchasedItem;
      })
    );
    console.log("Purchases", purchases);
    setItems(purchases);
  };
  useEffect(() => {
    initUserItems();
  }, []);
  return (
    <Flex flexDir={"column"}>
      <Box p={"1rem"}>
        <HeadLine size={"xl"} title={categoryText} />
      </Box>

      <Flex p={"1rem"} width={"100%"} flexWrap={"wrap"} flex={1} gap={"1rem"}>
        {items.map((it, i) => (
          <UserNftCard nft={it} key={"ntf-" + i + "-" + categoryText} />
        ))}
      </Flex>
    </Flex>
  );
};

export default UserProducts;
