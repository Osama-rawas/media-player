import { ImageList, ImageListItem } from "@mui/material";
import { useState } from "react";
import InputFile from "../components/InputFile";
import { Image } from "@mui/icons-material";

export default function GallaryImages() {
  const [images, setImages] = useState([]);
  function displayImages(e) {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...newImages]);
  }

  const ImageIcon = () => <Image />;
  return (
    <div className="containt">
      <InputFile
        title=" images"
        choose={displayImages}
        accept="image/*"
        multiple={true}
        icon={ImageIcon()}
      />

      <ImageList
        sx={{ width: 1200, height: 500 }}
        variant="quilted"
        cols={4}
        rowHeight={121}
      >
        {images.map((item) => (
          <ImageListItem key={item} cols={item.cols || 2} rows={item.rows || 3}>
            <img src={item} alt={item.title} loading="lazy" />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}
