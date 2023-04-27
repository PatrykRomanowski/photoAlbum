import { useSelector } from "react-redux";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import myStorage from "../firebase";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import DatePicker from "react-datepicker";
import { format } from "date-fns";

import "./addPhotoComponent.css";

import "react-datepicker/dist/react-datepicker.css";

const YourAlbumComponent = () => {
  const [files, setFiles] = useState([]);
  const [uploadDate, setUploadDate] = useState(new Date());
  const [albumTitle, setAlbumTitle] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const activeEmail = useSelector((state) => state.login.email);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleChange = (date) => {
    setUploadDate(date);
  };

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
      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
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
      const formattedDate = format(uploadDate, "d-M-yyyy");

      const childRef = ref(
        myStorage,
        activeEmail +
          "/" +
          albumTitle +
          "_'_" +
          formattedDate +
          "__'__" +
          selectedOption +
          "/" +
          file.name
      );
      uploadBytes(childRef, file).then(() => {
        getDownloadURL(childRef).then((url) => {
          console.log(`Plik ${file.name} został przesłany. URL: ${url}`);
        });
      });
    });

    setUploadDate(new Date());
    setAlbumTitle("");
    setFiles([]);
    setSelectedOption("");
  };

  return (
    <div className="addPhotoContainer">
      <h2 className="addPhotoTextTitle">Dodaj nowy katalog ze zdjęciami</h2>
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
      <p className="addPhotoDescription">wybierz datę zdjęć:</p>
      <div className="inputStyle">
        <DatePicker selected={uploadDate} onChange={handleChange} />
      </div>
      <p className="addPhotoDescription">wpisz tytuł katalogu: </p>
      <input
        className="inputStyle"
        value={albumTitle}
        onChange={(e) => setAlbumTitle(e.target.value)}
      />
      <p className="addPhotoDescription">wybierz okoliczności zdjęć:</p>
      <select
        className="inputStyle"
        value={selectedOption}
        onChange={handleOptionChange}
      >
        <option value="">Wybierz...</option>
        <option value="gory">Góry</option>
        <option value="morze">Morze</option>
        <option value="atrakcje">Atrakcje</option>
        <option value="miejsca">Miejsca</option>
        <option value="rodzina">Rodzina</option>
        <option value="inne">Inne</option>
      </select>
      <button className="addPhotoButton" onClick={uploadFiles}>
        Wyślij
      </button>
    </div>
  );
};

export default YourAlbumComponent;
