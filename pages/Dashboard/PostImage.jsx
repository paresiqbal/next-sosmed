import { useState, useEffect } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "@/utils/firebase";
import { v4 } from "uuid";

export default function Postimage() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const imagesListRef = ref(storage, "gallery/");
  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `gallery/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <div className="my-20 max-w-md mx-auto ">
      <h1 className="text-3xl text-center font font-semibold underline decoration-purple-600 pb-8">
        Gallery
      </h1>
      <p className="pb-2">Share your story with photo</p>
      <div className="flex flex-col shadow-lg">
        <input
          type="file"
          onChange={(event) => {
            setImageUpload(event.target.files[0]);
          }}
          className="pb-2"
        />
        <button
          onClick={uploadFile}
          className="bg-gray-800 py-2 px-4 rounded-md text-white font-semibold"
        >
          Upload Image
        </button>
      </div>
      <div className="flex max-w-6xl w-full flex-wrap">
        {imageUrls.map((url) => {
          return <img src={url} />;
        })}
      </div>
    </div>
  );
}
