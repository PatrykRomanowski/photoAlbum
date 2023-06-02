import { useSelector } from "react-redux";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { myStorage } from "../firebase";
import {
  uploadBytes,
  getDownloadURL,
  ref as storageRef,
} from "firebase/storage";

import "./addPhotoComponent.css";

import "react-datepicker/dist/react-datepicker.css";

const AddAdditionalPhotosComponent = () => {
  const [files, setFiles] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const activeEmail = useSelector((state) => state.login.email);
  const actualPrefix = useSelector((state) => state.album.actualAlbumPrefix);

  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    acceptedFiles.forEach((file) => {
      // check file type and extension here
      if (
        file.type !== "image/jpeg" &&
        file.type !== "image/png" &&
        file.type !== "image/jpg"
      ) {
        console.log(`Plik ${file.name} ma niepoprawny typ lub rozszerzenie`);
        return;
      }

      console.log(acceptedFiles);
      setFiles((prevFiles) => [
        ...prevFiles,
        ...acceptedFiles.filter((file) => !prevFiles.includes(file)),
      ]);
    });

    rejectedFiles.forEach((file) => {
      console.log(`Plik ${file.name} został odrzucony`);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const uploadFiles = () => {
    files.forEach((file) => {
      const childRef = storageRef(
        myStorage,
        `${activeEmail}/${actualPrefix}/${file.name}`
      );
      uploadBytes(childRef, file)
        .then(() => {
          getDownloadURL(childRef).then((url) => {
            console.log(`Plik ${file.name} został przesłany. URL: ${url}`);
          });
        })
        .catch((error) => {
          console.log(
            `Wystąpił błąd podczas przesyłania pliku ${file.name}: ${error}`
          );
        });
    });

    setFiles([]);
    setModalMessage("Zdjęcia zostały przesłane poprawnie.");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalMessage("");
    navigate("/album");
  };

  return (
    <div className="addPhotoContainer">
      <h2 className="addPhotoTextTitle">Dodaj zdjęcia do wybranego katalogu</h2>
      <div
        {...getRootProps()}
        className={`dropzone ${isDragActive ? "active" : ""}`}
        style={{
          borderWidth: isDragActive ? "2px" : "1px",
          borderColor: isDragActive ? "green" : "grey",
          borderStyle: "dashed",
          borderRadius: "5px",
          padding: "80px",
          backgroundColor: "lightgrey",
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Upuść pliki tutaj...</p>
        ) : (
          <div>
            <p className="dropText">
              Przeciągnij i upuść pliki tutaj lub kliknij, aby wybrać plik
            </p>
            <p className="dropText">
              Akceptowane typy plików: .jpeg, .jpg, .png
            </p>
          </div>
        )}
        <ul>
          {files.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      </div>

      <button className="addPhotoButton" onClick={uploadFiles}>
        Wyślij
      </button>
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <p className="modal-message">{modalMessage}</p>
            <span className="close" onClick={closeModal}>
              OK
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddAdditionalPhotosComponent;
