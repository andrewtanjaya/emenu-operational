import { ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { storage } from "../../../Config/Firebase";
import "./AdminMenuPhoto.css";

function AdminMenuPhoto({
  isMain,
  keyId,
  index,
  setPhotosData,
  photosData,
  deletePhoto,
}) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState();

  useEffect(() => {
    let objectUrl;
    console.log(photosData[index].file)
    if (!file && !photosData[index].file) {
      setPreview(undefined);
      return;
    }
    if(!file && photosData[index].file){
        setFile(photosData[index].file);
        objectUrl = URL.createObjectURL(photosData[index].file);
    }else{
        objectUrl = URL.createObjectURL(file);
    }
    
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return (
    <div className="admin-menu-photo-container">
      {file ? (
        <img className="menu-photo-preview" src={preview} alt="" />
      ) : (
        <div className="menu-photo-placeholder"></div>
      )}
      <input
        id={`img-photo-` + keyId}
        type="file"
        className="admin-menu-hidden-input"
        onChange={(event) => {
          if (isMain !== true && photosData.length <= 4) {
            setPhotosData((prev) => {
              return [
                ...prev,
                {
                  keyId: prev[prev.length - 1].keyId + 1,
                  isMain: false,
                  file: null,
                },
              ];
            });
          }
          setPhotosData((prev) => {
            prev[index].file = event.target.files[0];
            return prev;
          });
          setFile(event.target.files[0]);
        }}
      />
      {preview && isMain !== true? (
        <button
          onClick={() => {
            setFile(null)
            deletePhoto(keyId);
          }}
        >
          delete photo
        </button>
      ) : (
        <></>
      )}
      {preview ? (
          <label for={`img-photo-` + keyId} className="admin-menu-input-file">
            Update Photo
          </label>
        
      ) : isMain && isMain === true ? (
        <label for={`img-photo-` + keyId} className="admin-menu-input-file">
          Upload Main Photo
        </label>
      ) : (
        <label for={`img-photo-` + keyId} className="admin-menu-input-file">
          Upload More Photo
        </label>
      )}
    </div>
  );
}

export default AdminMenuPhoto;
