import { NextPage } from "next";

import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  Image,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useCallback, useMemo, useState } from "react";
import { formatNumberInput, parseNumberInput } from "../../utils/parse";
import Dropzone from "react-dropzone";
import Link from "next/link";
import styles from "../../../styles/Home.module.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useAccount,
  useContract,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useSigner,
} from "wagmi";
import { uploadNft } from "../../services/nftService";
import { ipfsClient } from "../../services";
import { NFT_ABI, STORE_ABI } from "../../constants/nft.abi";
import {
  nftContractAddress,
  storeContractAddress,
} from "../../constants/contractInfo";
import { utils } from "ethers";

type formType = {
  name: string;
  price: number | string;
  description: string;
  image: File | null;
};

const defaultForm = {
  name: "",
  price: "0",
  description: "",
  image: null,
};

const defaultError = {
  name: false,
  price: false,
  description: false,
  image: false,
};

const Create: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<formType>({ ...defaultForm });
  const [error, setError] = useState(defaultError);
  const [page, setPage] = useState<0 | 1>(0);
  const [image, setImage] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState<any>(null);
  const [mintData, setMintData] = useState<any>(null);
  const { data: signer, isError, isLoading } = useSigner();
  const { isConnected } = useAccount();
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
  const convertToBuffer = async (reader: any) => {
    //file is converted to a buffer for upload to IPFS
    //set this buffer -using es6 syntax
    const buffer = await Buffer.from(reader.result);
    return buffer;
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const uploadedImage = acceptedFiles[0];
    if (!uploadedImage) return;

    let savedImg = URL.createObjectURL(uploadedImage);
    setImageUrl(savedImg);
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(uploadedImage);
    reader.onloadend = async () => {
      const bufferImage = await convertToBuffer(reader);
      setImage(bufferImage);
    };
  }, []);

  const handleUpload = async () => {
    if (signer) {
      setLoading(true);
      // @ts-ignore
      const ipfsHash = await ipfsClient.add(image);
      console.log("ipfsHash", ipfsHash);
      let url = `https://ipfs.io/ipfs/${ipfsHash.path}`;
      console.log("ipfsHash", url);
      let dataToUpload: any = {
        image: url,
        price: form.price,
        name: form.name,
        description: form.description,
      };
      let result: any = await uploadNft(dataToUpload);
      console.log("result.path}", result.path);
      await nftContract.mint(`https://ipfs.io/ipfs/${result.path}`);
      const id = await nftContract.tokenCount();
      console.log("ID", id);
      await nftContract.setApprovalForAll(storeContractAddress, true);
      const listingPrice = utils.parseEther(form.price.toString());
      await storeContract.makeItem(nftContractAddress, id, listingPrice);
      setMintData(result);
      setLoading(false);
    }
  };
  const handleInputChange = (e: any) => {
    let err = { ...error };
    // @ts-ignore
    err[e.target.name] = !e.target.value;
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError({ ...err });
  };
  const handleError = (panel: number): number => {
    let err = { ...defaultError };
    if (panel === 0) {
      if (!form.name) err.name = true;
      if (!form.price) err.price = true;
      if (!form.description) err.description = true;
    } else {
      if (!form.image) err.image = true;
    }

    setError(err);
    if (err.name || err.price || err.description) return 0;
    else if (err.image) return 1;
    return -1;
  };

  const renderFirstPanel = () => {
    return (
      <VStack gap={"1rem"} alignItems={"flex-start"}>
        <Text color={"text.200"} mt={"1rem"}>
          Add some general informations{" "}
        </Text>

        <FormControl isRequired>
          <Input
            isInvalid={!!error.name}
            bg={"text.100"}
            h={"54px"}
            placeholder="Name"
            value={form.name}
            name={"name"}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl isRequired>
          <NumberInput
            isInvalid={!!error.name}
            placeholder={"Price"}
            value={formatNumberInput(form.price.toString())}
            onChange={(e) => {
              handleInputChange({
                target: {
                  name: "price",
                  value: parseNumberInput(e),
                },
              });
            }}
            h={"54px"}
            name={"price"}
            min={1}
          >
            <NumberInputField
              placeholder={"Price"}
              bg={"text.100"}
              h={"54px"}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl isRequired>
          <Textarea
            isInvalid={!!error.name}
            bg={"text.100"}
            placeholder="Description"
            value={form.description}
            name={"description"}
            minH={"12rem"}
            onChange={handleInputChange}
          />
        </FormControl>

        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          textAlign={"center"}
          w={"100%"}
        >
          <Box
            p={"0.4rem"}
            cursor={"pointer"}
            onClick={() => setPage(0)}
            borderRadius={"full"}
            bg={"#000"}
          />
          <Box
            cursor={"pointer"}
            onClick={() => setPage(1)}
            p={"0.4rem"}
            borderRadius={"full"}
            bg={"#F3F3F3"}
          />
        </Stack>
        <Box textAlign={"center"} w={"100%"}>
          <Button
            minW={"10rem"}
            color={"#fff"}
            bg={"#000"}
            _hover={{
              bg: "#00000088",
            }}
            onClick={() => {
              let errPanel = handleError(0);
              if (errPanel === -1 || errPanel === 1) setPage(1);
            }}
          >
            Next
          </Button>
        </Box>
      </VStack>
    );
  };

  const renderSecondPanel = () => {
    return (
      <VStack gap={"1rem"} alignItems={"flex-start"}>
        <Box w={"100%"} h={"100%"}>
          <Text color={"text.200"} mt={"2rem"} textAlign={"center"}>
            Now add photo of your Nft
          </Text>
          {/* <FormControl isRequired>
            <Input
              isInvalid={!!error.name}
              bg={"text.100"}
              h={"54px"}
              placeholder="Image"
              type="file"
              name={"image"}
              onChange={(event: any) => {
                console.log("File", event.target.files[0]);
                ipfsClient
                  .add(event.target.files[0])
                  .then((value) => {
                    console.log("Value", value.path);
                  })
                  .catch((err) => {
                    console.log("err", err.message);
                  });
              }}
            />
          </FormControl> */}
          <Dropzone
            multiple={false}
            accept={{
              "image/jpeg": ["jpeg"],
              "image/png": ["png"],
            }}
            onDrop={onDrop}
          >
            {({ getRootProps, getInputProps }) => (
              <Box
                mt={"4rem"}
                mb={"4rem"}
                bg={"text.100"}
                borderRadius={"1rem"}
                alignItems={"center"}
                justifyContent={"center"}
                borderColor={!error.image ? "gray.200" : "red.500"}
                borderWidth={2}
                minH={"14rem"}
                display={"flex"}
                flex={1}
              >
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <Text cursor={"pointer"} fontWeight={"600"} color={"#333"}>
                    Drag 'n' drop some files here, or click to select files
                  </Text>
                  <em>(Only *.jpeg and *.png images will be accepted)</em>
                </div>
              </Box>
            )}
          </Dropzone>
          <Box w={"100%"}>
            {image && (
              <div className="file-item">
                <Image
                  boxSize={"8rem"}
                  objectFit={"cover"}
                  alt={`img - 1`}
                  src={imageUrl}
                />
                <Text w={"8rem"} textAlign={"center"} fontSize={"sm"}>
                  {form.image?.name}
                </Text>
              </div>
            )}
          </Box>
        </Box>

        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          textAlign={"center"}
          w={"100%"}
        >
          <Box
            cursor={"pointer"}
            onClick={() => setPage(0)}
            p={"0.4rem"}
            borderRadius={"full"}
            bg={"#F3F3F3"}
          />
          <Box
            cursor={"pointer"}
            onClick={() => setPage(1)}
            p={"0.4rem"}
            borderRadius={"full"}
            bg={"#000"}
          />
        </Stack>

        <Box textAlign={"center"} w={"100%"}>
          <Button
            isLoading={loading}
            disabled={isError}
            loadingText={"Uploading"}
            minW={"10rem"}
            color={"#fff"}
            bg={"#000"}
            _hover={{
              bg: "#00000088",
            }}
            onClick={() => {
              let errPanel: any = handleError(0);
              if (errPanel === -1) {
                // handle add nft api
                handleUpload();
              } else {
                setPage(errPanel);
              }
            }}
          >
            Add NFT
          </Button>
        </Box>
      </VStack>
    );
  };

  return (
    <Container minW={"100vw"} minH={"100vh"} position={"relative"} bg="bg.100">
      {isConnected ? (
        <Stack
          position={"absolute"}
          left={0}
          top={0}
          w={"100vw"}
          direction={"row"}
          p={"1rem"}
          alignItems={"center"}
          justifyContent={"flex-end"}
          gap={"1rem"}
          height={"75px"}
        >
          <Link href={`/home`}>
            <a className={styles.linkHome}>Home</a>
          </Link>

          <Link href={`/create`}>
            <a className={styles.linkHome}>Upload your Nft</a>
          </Link>

          <ConnectButton />
        </Stack>
      ) : (
        <Box height={"75px"} />
      )}
      <Stack
        minH={"80vh"}
        flex={1}
        direction={"row"}
        wrap={"wrap"}
        pt={"6rem"}
        pl={"4rem"}
        pr={"4rem"}
      >
        <Box
          minW={"360px"}
          display={"flex"}
          flex={1}
          alignItems={"center"}
          pb={"2rem"}
        >
          <VStack gap={"1rem"} alignItems={"flex-start"}>
            <Box textAlign={"center"} ml={"auto"} mr={"auto"}>
              <Image
                boxSize="8rem"
                src={"/assets/gold-coin.png"}
                alt={"golden-coin"}
              />
            </Box>

            <Heading color={"brand.100"}>Canggu Properti</Heading>
            <Text fontSize="xl" fontWeight={"500"} color={"text.200"}>
              We build the future with Nfts
            </Text>
          </VStack>
        </Box>

        <Box minW={"360px"} minH={"100%"} flex={1} position={"relative"}>
          <Box boxShadow="base" p="6" rounded="md" bg="white" minH={"600px"}>
            <Heading color={"brand.100"} textAlign={"center"}>
              Welcome
            </Heading>
            {!page ? renderFirstPanel() : renderSecondPanel()}
          </Box>
        </Box>
      </Stack>

      <Box
        position={"absolute"}
        top={"2rem"}
        left={"-4rem"}
        borderRadius={"full"}
        boxSize={"10rem"}
        bg={"brand.400"}
      />
      <Box
        position={"absolute"}
        top={"-2rem"}
        left={"0rem"}
        borderRadius={"full"}
        boxSize={"10rem"}
        bg={"brand.400"}
      />
    </Container>
  );
};

export default Create;
