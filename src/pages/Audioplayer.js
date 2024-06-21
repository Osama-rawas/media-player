import { useState } from "react";
import InputFile from "../components/InputFile";
import { MusicNote } from "@mui/icons-material";

export default function AudioPlayer() {
  const [source, setSource] = useState("");
  function LoadAudio(e) {
    let file = e.target.files[0];
    let sourceAudio = URL.createObjectURL(file);
    setSource(sourceAudio);
  }
  const ImageIcon = () => <MusicNote />;
  return (
    <div className="containt">
      <InputFile
        title=" an Audio"
        choose={LoadAudio}
        accept="audio/*"
        multiple={false}
        icon={ImageIcon()}
      />
      <audio src={source} className="audio" controls></audio>
    </div>
  );
}
