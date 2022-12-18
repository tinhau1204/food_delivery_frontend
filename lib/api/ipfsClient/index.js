import { create } from "ipfs-http-client";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
const projectKey = process.env.NEXT_PUBLIC_SECRET_KEY;

// create connection with ipfs
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectKey).toString("base64");
// Create connection to IPFS using infura
export const IpfsClient = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});
