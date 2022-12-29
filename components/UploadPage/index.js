import { React, useState } from "react";
import { Button, FileInput } from "@mantine/core";
import { IpfsClient } from "@/lib/api/ipfsClient";

function UploadPage() {
  const [file, setFile] = useState(null);
  const [emptyImage, setEmptyImage] = useState(false);
  const [fileUrl, setFileUrl] = useState("");

  async function uploadImage() {
    const fileAdded = await IpfsClient.add(file);
    console.log(fileAdded.path);
  }

  return (
    <>
      <div className="store_detail" align="center">
        <FileInput
          label="Your store's image"
          placeholder="Pick an image of your store"
          required
          mt="md"
          style={{
            maxWidth: 200,
          }}
          error={emptyImage}
          value={file}
          onChange={(value) => {
            if (value) {
              setFileUrl(URL.createObjectURL(value));
              setFile(value);
            }
          }}
        />
        <Button
          fullWidth
          mt="xs"
          mb={15}
          style={{
            maxWidth: 200,
          }}
          onClick={uploadImage}
        >
          Continue
        </Button>
      </div>
    </>
  );
}

export default UploadPage;
