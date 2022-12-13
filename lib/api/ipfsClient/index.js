import { create } from "ipfs-http-client";

// SECRET_KEY="e93675f6784fe418e77bf7395e354ba1"
// PROJECT_ID="2IUv8IJOW3PBHP1mTzZCij3fcW4"

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
