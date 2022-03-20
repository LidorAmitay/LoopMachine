import React, { useRef, useEffect, useState } from 'react'
// icons and tags imports 
import VolumeOff from "@mui/icons-material/VolumeOff";
import VolumeUp from "@mui/icons-material/VolumeUp";
import { Col, Row, Button } from 'react-bootstrap';
// css
import styles from "./Channel.module.css";

// tracks source directory
const dataDir = './tracks/';

export default function Channel({ playing, setPlaying, looping, newTime, setDuration, setCurTime, trackName }) {
  // state
  const [isMuted, setIsMuted] = useState(false);
  const [trackColor, setTrackColor] = useState();

  const trackRef = useRef(null); // refrence to the channel's audio
  const progressBar = useRef(null); // refrence to the channel's progress bar 

  useEffect(() => {
    if (playing) {
      playTrack();
    } else {
      stopTrack();
    }
  }, [playing]);


  useEffect(() => {
    // ended event is fired when the end of the media is reached
    trackRef.current.addEventListener("ended", loopHandler);

    // effect cleanup
    return () => {
      trackRef.current.removeEventListener("ended", loopHandler);
    }
  }, [looping])

  // updating the current audio time according to changes in the parent component
  useEffect(() => {
    trackRef.current.currentTime = newTime;
  }, [newTime])


  useEffect(() => {
    // loadeddata event is fired when the first frame of media is finished loading 
    trackRef.current.addEventListener("loadeddata", setAudioData);
    
    // random color 
    setTrackColor(getRandomColor());
    return () => {
      trackRef.current.removeEventListener("loadeddata", setAudioData);
    }
  }, [])

  const handleMuteClick = () => {
    if (isMuted) {
      setIsMuted(false);
    } else {
      setIsMuted(true);
    }
  }

  const loopHandler = () => {
    if (looping) {
      playTrack();
    } else {
      stopTrack();
      setPlaying(false);
    }
  }

  const playTrack = () => {
    trackRef.current.play();
  }

  const stopTrack = () => {
    trackRef.current.pause();
    trackRef.current.currentTime = 0;
  }

  // initial settings 
  const setAudioData = () => {
    setDuration(trackRef.current.duration);
    progressBar.current.max = trackRef.current.duration;
    progressBar.current.value = trackRef.current.currentTime;
  }

  const changeRange = () => {
    trackRef.current.currentTime = progressBar.current.value;
  }

  // updating the progress bar current time when audio time is change
  const changeTime = () => {
    progressBar.current.value = trackRef.current.currentTime;
    setCurTime(trackRef.current.currentTime);
  }
  
  const getRandomColor = () => {
    return '#'+Math.floor(Math.random()*16777215).toString(16);
  }


  return (
    <div className='player'>
      <Row className={styles.channel}>
        <Col className='controls' xs={12} lg={4}>
          {isMuted ?
            <audio className={styles.audio} id="audio" onTimeUpdate={changeTime} ref={trackRef} muted>
              <source src={dataDir + trackName} />
            </audio> :
            <audio className="audio" id="audio" onTimeUpdate={changeTime} ref={trackRef} >
              <source src={dataDir + trackName} />
            </audio>
          }
          <p className={styles.trackName}>{trackName}</p>
        </Col>
        <Col className="align-items-center" xs={12} lg={2}>
          <Button className="mute_button" variant="outline-secondary" size="sm" onClick={() => handleMuteClick()}>
            {isMuted ? <VolumeOff /> : <VolumeUp />}
          </Button>
        </Col>
        <Col xs={12} lg={2}>
          <svg height="30" width="30">
            <circle cx="15" cy="15" r="7" stroke="black" strokeWidth={3} fill={trackColor} />
          </svg>
        </Col>
        <Col xs={12} lg={4}>
          {/* <Form.Range disabled type="range" className="progress-bar" ref={progressBar} onChange={changeRange} style={{width:"100%"}}></Form.Range> */}
          <input disabled type="range" className="progress-bar" ref={progressBar} onChange={changeRange} style={{ width: "100%" }} />
        </Col>
        <hr />
      </Row>

    </div>
  )
}
