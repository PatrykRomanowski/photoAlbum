import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { listAll, ref, getDownloadURL } from "firebase/storage";
import myStorage from "../firebase";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import "./showPhotosComponent.css";

const ShowPhotos = () => {
  const activeAlbum = useSelector((state) => state.album.actualAlbumID);
  const activeEmail = useSelector((state) => state.login.email);
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    const storageRef = ref(myStorage, `${activeEmail}/${activeAlbum}`);

    listAll(storageRef)
      .then((res) => {
        const imageUrls = res.items.map((item) =>
          getDownloadURL(item).then((url) => ({
            original: url,
            thumbnail: url,
            originalClass: "showPhoto",
            thumbnailClass: "showPhoto-thumbnail",
          }))
        );
        Promise.all(imageUrls).then((urls) => setImageList(urls));
      })
      .catch((err) => console.log(err));
  }, [activeAlbum, activeEmail]);

  return (
    <div className="showPhotosContainer">
      <ImageGallery items={imageList} />
    </div>
  );
};

export default ShowPhotos;
