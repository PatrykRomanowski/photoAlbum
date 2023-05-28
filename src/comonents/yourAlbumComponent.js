import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { listAll, ref, deleteObject } from "firebase/storage";
import { myStorage } from "../firebase";

import { albumActions } from "../store/album-context";

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

  const [refresh, setRefresh] = useState(0);

  const [showModal, setShowModal] = useState(false); // Stan modala

  const [albumToDelete, setAlbumToDelete] = useState(null); // Stan przechowujący informacje o albumie do usunięcia

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const getPhotosHandler = (prefix) => {
    console.log("działa");
    navigate("/showPhotos");
    dispatch(albumActions.setActualID({ value: prefix }));
  };

  const deleteItem = async (event, prefix) => {
    event.stopPropagation();
    console.log("xD");
    console.log(activeEmail);

    setAlbumToDelete(prefix); // Ustaw informacje o albumie do usunięcia
    setShowModal(true); // Pokaż modal potwierdzenia usunięcia
  };

  const confirmDelete = async () => {
    const prefix = albumToDelete;

    const storageRef = ref(myStorage, "/" + activeEmail + "/" + prefix);

    const { items } = await listAll(storageRef);
    console.log(items);

    try {
      if (items.length > 0) {
        // Usuń każdy plik w folderze
        for (const item of items) {
          await deleteObject(item);
        }
        console.log("Folder usunięty pomyślnie.");
        setRefresh(refresh + 1);
      }
    } catch (error) {
      console.log("Wystąpił błąd podczas usuwania folderu:", error);
    }

    setShowModal(false); // Ukryj modal potwierdzenia usunięcia
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
        prefix: prefix.name,
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
  }, [refresh]);

  const albumElements = catalogsData.map((item) => {
    console.log(item.logo);
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
      <div className="albumContainerWithButton">
        <div
          onClick={() => getPhotosHandler(item.prefix)}
          className="albumContainer"
        >
          <div className="itemContainer">
            <div className="itemData">{item.date}</div>
            <div className="itemName">{item.name}</div>
          </div>
          <div className="photoContainer">
            <img className="itemPhoto" src={imageSrc} alt="example" />
          </div>
          <div className="deleteAlbum">
            <button
              className="delete-album-btn"
              onClick={(event) => deleteItem(event, item.prefix)}
            >
              USUŃ
            </button>
          </div>
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

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Potwierdzenie usunięcia</h2>
              <span className="close" onClick={() => setShowModal(false)}>
                &times;
              </span>
            </div>
            <div className="modal-body">
              Czy na pewno chcesz usunąć ten album?
            </div>
            <div className="modal-footer">
              <button className="btn-login" onClick={confirmDelete}>
                Tak
              </button>
              <button className="btn-login" onClick={() => setShowModal(false)}>
                Nie
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPhotoComponent;
