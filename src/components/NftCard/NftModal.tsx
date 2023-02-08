import {
  Box,
  Button,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";
import { NftCardType } from "./index";
import React from "react";
import { useContract, useSigner } from "wagmi";
import { storeContractAddress } from "../../constants/contractInfo";
import { STORE_ABI } from "../../constants/nft.abi";

type NftModalType = {
  isOpen: boolean;
  onClose: () => void;
  nftBody: any;
  marketId: any;
};

const NftModal = ({ isOpen, onClose, nftBody, marketId }: NftModalType) => {
  const { data: signer, isError, isLoading } = useSigner();

  const storeContract = useContract({
    addressOrName: storeContractAddress,
    contractInterface: STORE_ABI,
    signerOrProvider: signer,
  });
  const handlePurchase = async () => {
    try {
      const totalPrice = await storeContract.getTotalPrice(marketId);
      console.log("Total Price", totalPrice.toNumber());
      await storeContract.buyItem(marketId, { value: totalPrice });
      onClose();
    } catch (error: any) {
      console.log("ERROR", error.message);
    }
  };
  return (
    <Modal size={"4xl"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <HStack mt={"4rem"}>
            <Box flex={1} mt={"2rem"} alignSelf={"flex-start"}>
              <Box
                mt="1"
                fontWeight="bold"
                fontSize={"lg"}
                lineHeight="tight"
                noOfLines={1}
              >
                {nftBody && nftBody.name}
              </Box>

              <Box>
                {nftBody && nftBody.price}
                <Box as="span" color="gray.600" fontSize="sm">
                  {" ETH"}
                </Box>
              </Box>

              <Box
                display="flex"
                mt="1"
                fontSize={"sm"}
                color={"text.200"}
                alignItems="center"
                w={"80%"}
              >
                {nftBody && nftBody.description}
              </Box>
            </Box>
            <Box flex={1} minW={480}>
              {nftBody && (
                <Image
                  shadow={"base"}
                  minH={280}
                  minW={280}
                  borderRadius={"0.4rem"}
                  src={nftBody.image}
                />
              )}
            </Box>
          </HStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="messenger" mr={3} onClick={handlePurchase}>
            Confirm
          </Button>
          <Button colorScheme="gray" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NftModal;
