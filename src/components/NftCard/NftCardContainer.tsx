import React, { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import NftCard from ".";
import { storeContractAddress } from "../../constants/contractInfo";
import { STORE_ABI } from "../../constants/nft.abi";
type NftCardContainerType = {
  nftInd: number;
};
const NftCardContainer = ({ nftInd }: NftCardContainerType) => {
  const { data, isLoading } = useContractRead({
    addressOrName: storeContractAddress,
    contractInterface: STORE_ABI,
    functionName: "items",
    args: nftInd,
  });
  const [tokenInfo, setTokenInfo] = useState<any>(null);
  useEffect(() => {
    console.log("Data", data);
    if (!isLoading && data) {
      console.log("Data", data);
      let info: any = data;
      setTokenInfo({
        tokenId: info["tokenId"].toNumber(),
        itemId: info["itemId"].toNumber(),
        price: info["price"],
        sold: info["sold"],
      });
    }
  }, [isLoading]);
  return (
    <>
      <NftCard nft={tokenInfo} />
    </>
  );
};

export default NftCardContainer;
