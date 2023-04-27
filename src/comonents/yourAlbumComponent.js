import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { listAll, ref } from "firebase/storage";
import myStorage from "../firebase";

import otherPhoto from "../photoBar/other.jpg"; // importujesz obrazek
import "./yourAlbumComponent.css";

const AddPhotoComponent = () => {
  const [catalogsData, setCatalogData] = useState([{}]);
  const activeEmail = useSelector((state) => state.login.email);
  const [atrakcje, setAttractionImage] = useState(null);
  const [morze, setBeachImage] = useState(null);
  const [gory, setMountainImage] = useState(null);
  const [miejsca, setPlacesImage] = useState(null);
  const [impreza, setPartyImage] = useState(null);
  const [rodzina, setFamilyImage] = useState(null);
  const [inne, setOtherImage] = useState(null);

  const getPhotosHandler = () => {
    console.log("działa");
  };

  const listAllFolders = async () => {
    // create a reference to the folder in Firebase Storage
    console.log(activeEmail);
    const storageRef = ref(myStorage, "/" + activeEmail);

    // list all items in the folder
    const { prefixes } = await listAll(storageRef);

    // get the names of all the folders
    const folderNames = prefixes.map((prefix) => {
      const parts = prefix.name.split("__'__");

      return {
        prefix: prefix.logo,
        name: parts[0],
        date: parts[1],
        logo: parts[2],
      };
    });
    setCatalogData(folderNames);
    console.log(folderNames);
  };

  useEffect(() => {
    listAllFolders();
    // wczytaj obrazek i przypisz go do stanu
    import("../photoBar/other.jpg").then((image) =>
      setOtherImage(image.default)
    );
    import("../photoBar/atrakcje.jpg").then((image) =>
      setAttractionImage(image.default)
    );
    import("../photoBar/beach.jpg").then((image) =>
      setBeachImage(image.default)
    );
    import("../photoBar/family.jpg").then((image) =>
      setFamilyImage(image.default)
    );
    import("../photoBar/mountain.jpg").then((image) =>
      setMountainImage(image.default)
    );
    import("../photoBar/places.jpg").then((image) =>
      setPlacesImage(image.default)
    );
    import("../photoBar/party.jpg").then((image) =>
      setPartyImage(image.default)
    );
  }, []);

  const albumElements = catalogsData.map((item) => {
    let imageSrc;
    switch (item.logo) {
      case "atrakcje":
        imageSrc = atrakcje;
        break;
      case "morze":
        imageSrc = morze;
        break;
      case "gory":
        imageSrc = gory;
        break;
      case "miejsca":
        imageSrc = miejsca;
        break;
      case "impreza":
        imageSrc = impreza;
        break;
      case "rodzina":
        imageSrc = rodzina;
        break;
      default:
        imageSrc = inne;
        break;
    }
    return (
      <div onClick={getPhotosHandler} className="albumContainer">
        <div className="itemContainer">
          <div className="itemData">{item.date}</div>
          <div className="itemName">{item.name}</div>
        </div>
        <div>
          <img src={imageSrc} alt="My Image" />
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="allAlbumContainer">
        <h2 className="albumTitle">Wybierz wydarzenie</h2>
        {albumElements}
      </div>
    </div>
  );
};

export default AddPhotoComponent;
