import { ipfsClient } from "./index";
import { CustomToast } from "../utils/toast";
import CID from "cids";

// export const uploadNft = async ({
//   price,
//   name,
//   description,
//   image,
//   imageUrl,
// }: {
//   price: number;
//   name: string;
//   description: string;
//   image: File;
//   imageUrl: string;
// }) => {
//   try {
//     console.log("IMAGE", imageUrl);
//     let image = imageUrl;
//     let result = await ipfsClient.add(
//       JSON.stringify({ image: image, price, name, description })
//     );
//     CustomToast({ message: "Your NFT uploaded successfully", type: "success" });
//     console.log("result", result);
//     return {
//       ...result,
//       error: false,
//     };
//   } catch (error: any) {
//     CustomToast({
//       message: error.message || "An error has been detected",
//       type: "error",
//     });
//     console.log("Error", error.message);
//     return {
//       error: true,
//       message: error.message,
//     };
//   }
// };
export const uploadNft = async ({ price, name, description, image }: any) => {
  try {
    console.log(image, price, name, description);
    let result = await ipfsClient.add(
      JSON.stringify({ image, price, name, description })
    );
    CustomToast({ message: "Your NFT uploaded successfully", type: "success" });
    console.log("result", result);
    return {
      ...result,
      error: false,
    };
  } catch (error: any) {
    CustomToast({
      message: error.message || "An error has been detected",
      type: "error",
    });
    console.log("Error", error.message);
    return {
      error: true,
      message: error.message,
    };
  }
};
