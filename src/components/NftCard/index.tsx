import React, { useEffect, useMemo, useState } from "react";
import { Badge, Box, Center, HStack, Image } from "@chakra-ui/react";
import CustomButton from "../CustomButton";
import NftModal from "./NftModal";
import { useContract, useContractRead, useSigner } from "wagmi";
import { NFT_ABI, STORE_ABI } from "../../constants/nft.abi";
import axios from "axios";
import {
  nftContractAddress,
  storeContractAddress,
} from "../../constants/contractInfo";
import CID from "cids";
//import { CID } from "ipfs-http-client";

export type NftCardType = {
  name: string;
  nft: string;
  description: string;
  price: string;
  owner: string;
};

const NftCard = ({ nft }: { nft: any }) => {
  const [nftInfo, setNftInfo] = useState<any>(null);
  const [open, setOpen] = useState(false);
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
  const initNftData = async () => {
    console.log("NFT INFO", nft);
    try {
      let uri = await nftContract.tokenURI(nft.tokenId);
      console.log("URI", uri);
      if (uri) {
        const { data } = await axios.get(uri);
        console.log("Data", data);
        setNftInfo(data);
      }
      // if (tokenInfo.data) {
      //   const { data } = await axios.get(
      //     `https://ipfs.infura.io/ipfs/${tokenInfo.data}`
      //   );
      //   console.log("Data", tokenInfo.data);
      //   let str: any = tokenInfo.data;
      //   displayImageUrl(str);
      //   setNftInfo(data);
      // }
    } catch (error: any) {
      console.log("ERR", error.message);
    }
  };
  useEffect(() => {
    initNftData();
  }, [nft]);
  const handleBuy = () => {
    setOpen(true);
  };

  return (
    <Box
      shadow={"lg"}
      maxW={{
        sm: "100%",
        md: "100%",
        lg: "sm",
      }}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      {nftInfo && nftInfo.image && (
        <Image src={nftInfo.image} alt={nftInfo.name} />
      )}

      <HStack>
        <Box p="4" flex={1}>
          <Box display="flex" alignItems="baseline">
            <Badge borderRadius="full" px="2" colorScheme="teal">
              New
            </Badge>
          </Box>
          <Box
            mt="1"
            fontWeight="medium"
            fontSize={"lg"}
            lineHeight="tight"
            noOfLines={1}
          >
            {nftInfo && nftInfo.name}
          </Box>

          <Box>
            {nftInfo && nftInfo.price}
            <Box as="span" color="gray.600" fontSize="sm">
              {" ETH"}
            </Box>
          </Box>

          <Box
            display="flex"
            mt="1"
            noOfLines={2}
            fontSize={"sm"}
            color={"text.200"}
            alignItems="center"
          >
            {nftInfo && nftInfo.description}
          </Box>
        </Box>

        <Center flex={1}>
          {nft && nft.sold ? (
            <CustomButton text={"SOLD OUT"} color={"#000"} onClick={() => {}} />
          ) : (
            <CustomButton text={"Buy"} color={"#000"} onClick={handleBuy} />
          )}
        </Center>
      </HStack>
      <NftModal
        isOpen={open}
        onClose={() => setOpen(false)}
        nftBody={nftInfo}
        marketId={nft ? nft.itemId : undefined}
      />
    </Box>
  );
};

export default NftCard;
