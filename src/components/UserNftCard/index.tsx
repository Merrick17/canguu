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
import { BigNumber, utils } from "ethers";
//import { CID } from "ipfs-http-client";

export type NftCardType = {
  description: string;
  image: string;
  itemId: BigNumber;
  name: string;
  price: BigNumber;
  totalPrice: BigNumber;
};

const UserNftCard = ({ nft }: { nft: NftCardType }) => {
  const [open, setOpen] = useState(false);

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
      <Image src={nft.image} alt={nft.name} />

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
            {nft && nft.name}
          </Box>

          <Box>
            {nft && utils.formatEther(nft.price)}
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
            {nft && nft.description}
          </Box>
        </Box>

        <Center flex={1}>
          {/* {nft && nft.sold ? (
            <CustomButton text={"SOLD OUT"} color={"#000"} onClick={() => {}} />
          ) : (
            <CustomButton text={"Buy"} color={"#000"} onClick={handleBuy} />
          )} */}
        </Center>
      </HStack>
      {/* <NftModal
        isOpen={open}
        onClose={() => setOpen(false)}
        nftBody={nftInfo}
        marketId={nft ? nft.itemId : undefined}
      /> */}
    </Box>
  );
};

export default UserNftCard;
