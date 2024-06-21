import { Route, Routes } from "react-router-dom";
import VideoPlayer from "./pages/VideoPlayer";
import NavBar from "./components/NavBar";
import AudioPlayer from "./pages/Audioplayer";
import GallaryImages from "./pages/GallaryImages";
import SideBar from "./components/SideBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <SideBar />

      <Routes>
        <Route path="/video" element={<VideoPlayer />} />
        <Route path="/audio" element={<AudioPlayer />} />
        <Route path="/gallary" element={<GallaryImages />} />
      </Routes>
    </div>
  );
}

export default App;
