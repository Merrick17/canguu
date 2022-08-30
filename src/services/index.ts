import { create as ipfsHttpClient } from "ipfs-http-client";

const ipfsUrl: string = "https://ipfs.infura.io:5001/api/v0";
const projectId: string = "2DpOLOP4HN7zXLV1dY8tWHxseAG";
const projectSecret: string = "8882ec1dca0a263533a626f5c6a3daba";
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");
const ipfsClient = ipfsHttpClient({
  url: ipfsUrl,
  headers: { authorization: auth },
});

export { ipfsClient };
