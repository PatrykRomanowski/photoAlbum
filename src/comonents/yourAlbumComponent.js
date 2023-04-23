import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import storage from "../firebase";

const YourAlbumComponent = () => {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    // wykonaj operacje na zaakceptowanych plikach
    setFiles((prevFiles) => [
      ...prevFiles,
      ...acceptedFiles.map((file) => file.name),
    ]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const uploadFiles = () => {
    files.forEach((file) => {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);
      fileRef.put(file).then((snapshot) => {
        console.log("Plik został pomyślnie przesłany do Firebase Storage.");
      });
    });
  };

  return (
    <div
      {...getRootProps()}
      className={`dropzone ${isDragActive ? "active" : ""}`}
      style={{
        borderWidth: isDragActive ? "2px" : "1px",
        borderColor: isDragActive ? "green" : "grey",
        borderStyle: "dashed",
        borderRadius: "5px",
        padding: "20px",
        backgroundColor: "lightgrey",
        textAlign: "center",
        cursor: "pointer",
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Upuść pliki tutaj...</p>
      ) : (
        <p>Przeciągnij i upuść pliki tutaj lub kliknij, aby wybrać plik</p>
      )}
      <ul>
        {files.map((file, index) => (
          <li key={index}>{file}</li>
        ))}
      </ul>
    </div>
  );
};

export default YourAlbumComponent;
