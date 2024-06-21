import {
  FastForward,
  FastRewind,
  PlayArrow,
  Pause,
  VolumeUp,
  Fullscreen,
  VolumeOff,
  SmartDisplay,
} from "@mui/icons-material";
import {
  Button,
  Container,
  Grid,
  IconButton,
  Popover,
  Slider,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import { useRef, useState } from "react";
import ReactPlayer from "react-player";
import screenfull from "screenfull";
import InputFile from "../components/InputFile";

function ValueLabelComponent(props) {
  const { children, value } = props;
  return (
    <Tooltip enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}
const PrettoSlider = styled(Slider)({
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&::before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
  },
});
let count = 0;
export default function VideoPlayer() {
  const [srcVideo, setSrcVideo] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  function displayideo(e) {
    let file = e.target.files[0];
    let src = URL.createObjectURL(file);
    let title = file.name;
    setSrcVideo(src);
    setVideoTitle(title);
  }
  const [state, setState] = useState({
    playing: true,
    muted: true,
    volume: 0.5,
    playBackRate: 1.0,
    played: 0,
    seeking: false,
  });

  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const controlsRef = useRef(null);
  const { playing, muted, volume, playBackRate, played, seeking } = state;
  const currentTime = playerRef.current
    ? playerRef.current.getCurrentTime()
    : "00:00";
  const duration = playerRef.current
    ? playerRef.current.getDuration()
    : "00:00";
  const format = (seconds) => {
    if (isNaN(seconds)) return "00:00";

    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, "0");
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
    }
    return `${mm}:${ss}`;
  };
  const elapsedTime = format(currentTime);
  const totalDuration = format(duration);

  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "playbackrate-popover" : undefined;
  //   function to play or pause
  const handlePlayPause = () => {
    setState({ ...state, playing: !state.playing });
  };
  //   function to Rewind video 10s
  const handleRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };
  //   function to Forward video 10s
  const handleFastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  };
  const handleMuted = () => {
    setState({ ...state, muted: !state.muted });
  };
  const handleOnVolumeChange = (e, newValue) => {
    setState({
      ...state,
      volume: parseFloat(newValue / 100),
      muted: newValue === 0 ? true : false,
    });
  };
  const handleOnVolumeSeekUp = (e, newValue) => {
    setState({
      ...state,
      volume: parseFloat(newValue / 100),
      muted: newValue === 0 ? true : false,
    });
  };
  const handlePlayBackRateChange = (rate) => {
    setState({ ...state, playBackRate: rate });
  };
  const toggleFullScreen = () => {
    screenfull.toggle(playerContainerRef.current);
  };

  const handleProgress = (changeState) => {
    if (count > 1) {
      controlsRef.current.style.visibility = "hidden";
      count = 0;
    }
    if (controlsRef.current.style.visibility === "visible") {
      count++;
    }
    if (!state.seeking) {
      setState({ ...state, ...changeState });
    }
  };

  const handleOnSeek = (e, newValue) => {
    setState({ ...state, played: parseFloat(newValue / 100) });
  };
  const handelOnSeekMouseDown = (e) => {
    setState({ ...state, seeking: true });
  };
  const handleOnSeekMouseUp = (e, newValue) => {
    setState({ ...state, seeking: false });
    playerRef.current.seekTo(newValue / 100);
  };
  const handleMouseMove = () => {
    controlsRef.current.style.visibility = "visible";
    count = 0;
  };
  const ImageIcon = () => <SmartDisplay />;
  return (
    <div className="containt">
      <InputFile
        title=" a Video"
        choose={displayideo}
        accept="video/*"
        multiple={false}
        icon={ImageIcon()}
      />
      <Container maxWidth="md">
        <div
          ref={playerContainerRef}
          onMouseMove={handleMouseMove}
          className="playerWrapper"
        >
          <ReactPlayer
            ref={playerRef}
            height="100%"
            width="100%"
            url={srcVideo}
            playing={playing}
            muted={muted}
            volume={volume}
            playbackRate={playBackRate}
            onProgress={handleProgress}
          />
          <div ref={controlsRef} className="controlsWrapper">
            {/* top controls */}
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              style={{ padding: 16 }}
            >
              <Grid item>
                <Typography variant="h5" style={{ color: "#fff" }}>
                  {videoTitle}
                </Typography>
              </Grid>
            </Grid>

            {/* middle controls */}
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="center"
            >
              <IconButton
                onClick={handleRewind}
                className="controlIcon"
                aria-label="reqind"
              >
                <FastRewind fontSize="inhert" />
              </IconButton>
              <IconButton
                onClick={handlePlayPause}
                className="controlIcon"
                aria-label="reqind"
              >
                {playing ? (
                  <Pause fontSize="large" />
                ) : (
                  <PlayArrow fontSize="large" />
                )}
              </IconButton>
              <IconButton
                onClick={handleFastForward}
                className="controlIcon"
                aria-label="reqind"
              >
                <FastForward fontSize="inhert" />
              </IconButton>
            </Grid>

            {/* bottom controls */}
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              style={{ padding: 16 }}
            >
              <Grid item xs={12}>
                <PrettoSlider
                  min={0}
                  max={100}
                  defaultValue={played * 100}
                  ValueLabelComponent={(props) => (
                    <ValueLabelComponent {...props} value={elapsedTime} />
                  )}
                  valueLabelDisplay="auto"
                  onChange={handleOnSeek}
                  onMouseDown={handelOnSeekMouseDown}
                  onChangeCommitted={handleOnSeekMouseUp}
                />
              </Grid>
              <Grid item>
                <Grid container alignItems="center" direction="row">
                  <IconButton onClick={handlePlayPause} className="bottomIcon">
                    {playing ? (
                      <Pause fontSize="large" />
                    ) : (
                      <PlayArrow fontSize="large" />
                    )}
                  </IconButton>
                  <IconButton onClick={handleMuted} className="bottomIcon">
                    {muted ? (
                      <VolumeOff fontSize="large" />
                    ) : (
                      <VolumeUp fontSize="large" />
                    )}
                  </IconButton>
                  <Slider
                    min={0}
                    max={100}
                    value={volume * 100}
                    className="volumeSlider"
                    onChange={handleOnVolumeChange}
                    onChangeCommitted={handleOnVolumeSeekUp}
                  />
                  <Button variant="text" style={{ margin: 16, color: "#fff" }}>
                    <Typography>
                      {elapsedTime}/{totalDuration}
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
              <Grid item>
                <Button
                  variant="text"
                  onClick={handlePopover}
                  className="bottomIcon"
                >
                  <Typography>{playBackRate}X</Typography>
                </Button>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                >
                  <Grid container direction="column-reverse">
                    {[0.5, 1, 1.5, 2].map((rate) => (
                      <Button
                        onClick={() => handlePlayBackRateChange(rate)}
                        variant="text"
                      >
                        <Typography
                          color={
                            playBackRate === rate ? "secondary" : "default"
                          }
                        >
                          {rate}
                        </Typography>
                      </Button>
                    ))}
                  </Grid>
                </Popover>
                <IconButton onClick={toggleFullScreen} className="bottomIcon">
                  <Fullscreen fontSize="large" />
                </IconButton>
              </Grid>
            </Grid>
          </div>
        </div>
      </Container>
    </div>
  );
}
