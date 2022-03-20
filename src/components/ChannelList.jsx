import React, { useRef, useState, useEffect } from 'react'
import Channel from './Channel';
// icons and tags imports
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import LoopIcon from '@mui/icons-material/Loop';
import { Container, Row, Col, ButtonGroup, Button } from 'react-bootstrap';
// css
import styles from "./ChannelList.module.css";

const trackNames = ['_tambourine_shake_higher.mp3', 'B VOC.mp3',
  'DRUMS.mp3', 'HE HE VOC.mp3', 'JIBRISH.mp3', 'LEAD 1.mp3', 'UUHO VOC.mp3', 'HIGH VOC.mp3']

// each channel represent an audio track
const createChannels = (playing, setPlaying, looping, newTime, setDuration, setCurTime) => {
  const channels = [];
  for (let index in trackNames) { // creating the channels
    channels.push(<Channel key={index} playing={playing} setPlaying={setPlaying} looping={looping}
      newTime={newTime} setDuration={setDuration}
      setCurTime={setCurTime} trackName={trackNames[index]} />)
  }
  return channels;
}

export default function ChannelList() {
  // states
  const [looping, setLooping] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [newTime, setNewTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [curTime, setCurTime] = useState(0);

  // reference
  const allTracksControl = useRef();

  useEffect(() => { // set the progress bar duration to the audio files length 
    allTracksControl.current.max = duration;
  }, [duration])

  useEffect(() => { // updating the progress bar current time
    allTracksControl.current.value = curTime;
  }, [curTime])


  const changeRange = () => { // updating new play time 
    setNewTime(Math.floor(allTracksControl.current.value));
  }


  // format the display time
  const calcTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10? `0${minutes}`: `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10? `0${seconds}`: `${seconds}`;

    return `${returnedMinutes} : ${returnedSeconds}`;
  }

  return (
    <div>
      <Container className='mt-4'>
        <h1 id={styles.header}>Loop Machine</h1>
        <hr />
        {createChannels(playing, setPlaying, looping, newTime, setDuration, setCurTime)}
      </Container>
      <Container>
        <Row>
          <Col xs={12}>
            <ButtonGroup aria-label="Basic example">
              <Button variant="outline-secondary" className="player__button" onClick={() => setPlaying(true)}>
                <PlayCircleIcon />
              </Button>
              <Button variant="outline-secondary" className="player__button" onClick={() => setPlaying(false)}>
                <StopCircleIcon />
              </Button>
              <Button variant={looping ? "secondary" : "outline-secondary"} className="player__button" onClick={() => setLooping(!looping)}>
                <LoopIcon />
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <div className='progress-bar-time'>{calcTime(curTime)}</div>
          </Col>
          <Col lg={10} xs={12} >
            <input type="range" className={styles.progress_bar} ref={allTracksControl} onChange={changeRange} />
          </Col>
          <Col>
            <div className='progress-bar-duration'>{calcTime(duration)}</div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
