import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { storage } from "../../../Config/Firebase";
import AdminMenuPhoto from "../../Component/AdminMenuPhoto/AdminMenuPhoto";
import "./AdminAddMenuLayout.css";

function AdminAddMenuLayout() {
  const [file, setFile] = useState(null);
  const [photosData, setPhotosData] = useState([
    { keyId: 1, isMain: true, file: null },
    { keyId: 2, isMain: false, file: null },
  ]);

  const uploadImage = () => {
    for (let i = 0; i < photosData.length; i++) {
      if (photosData[i].file !== null) {
        const foodImageRef = ref(storage, `Food-Images/${photosData[i].file.name + uuid()}`);
        uploadBytes(foodImageRef, photosData[i].file).then((response) => {
          getDownloadURL(response.ref).then((url) =>{
            // TODO: get Image URL here
            console.log(url);
          });
        });
      }
    }
  };

  const deletePhoto = (keyId) => {
    setPhotosData((prev) => {
        prev = prev.filter((p)=>{
            return p.keyId !== keyId});
        return prev;
    })
  }
  useEffect(()=>{
    console.log(photosData)
  }, [photosData])

  return (
    <div>
      <h1>Add Menu</h1>
      <div className="menu-photos-input-container">
        {photosData.map((item, index) => {
          return (
            <AdminMenuPhoto
              isMain={item.isMain}
              key={item.keyId}
              keyId={item.keyId}
              index={index}
              setPhotosData={setPhotosData}
              photosData={photosData}
              deletePhoto={deletePhoto}
            />
          );
        })}
      </div>
      <button className="admin-menu-button" onClick={uploadImage}>
        Upload Image
      </button>
    </div>
  );
}

export default AdminAddMenuLayout;
