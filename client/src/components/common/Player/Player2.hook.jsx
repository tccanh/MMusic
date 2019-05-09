// import React, { useRef, useState, useEffect } from 'react';
// import './Player.css';
// import {
//   FastForward,
//   FastRewind,
//   PlayCircleOutline,
//   VolumeDown,
//   VolumeUp
// } from '@material-ui/icons';

// import formatTime from '../../../apis/formatTime';
// function Player2(props) {
//   const ref_audio = useRef();
//   const ref_progress = useRef(null);

//   const [isPlaying, setIsPlaying] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [volume, setVolume] = useState(0.5);
//   const [curSrc, setCurSrc] = useState('');
//   const [curTime, setCurTime] = useState(0);
//   const [totalTime, setTotalTime] = useState(0);
//   useEffect(() => {
//     setCurSrc(props.src);
//     setTotalTime(ref_audio.current.duration);
//     setCurTime(ref_audio.current.currentTime);
//     console.log('Inside mount', ref_audio.current);
//     return () => {
//       console.log('DID mount');
//     };
//   }, [props.src]);

//   useEffect(() => {
//     setCurTime(ref_audio.current.currentTime);
//     return () => {};
//   }, []);
//   useEffect(() => {
//     setProgress(curTime / totalTime);
//     return () => {};
//   }, [curTime, totalTime]);

//   useEffect(() => {
//     if (isPlaying) {
//       ref_audio.current.play();
//       console.log('Onplay');
//     } else {
//       ref_audio.current.pause();
//       console.log('Onplay');
//     }
//     return () => {};
//   }, [isPlaying]);

//   function handleOnEnded(src) {
//     props.onDone(src);
//     ref_audio.current.play();
//   }
//   return (
//     <div className="player">
//       <div className="controls">
//         <FastRewind />
//         <PlayCircleOutline
//           onClick={() => {
//             console.log('Click set is Playing');
//             setIsPlaying(pre => !pre);
//           }}
//         />
//         <FastForward />
//       </div>
//       <div className="progress">
//         <div ref={ref_progress} className="bar">
//           <div style={{ width: progress * 100 + '%' }} />
//         </div>
//       </div>
//       <div className="volume">
//         <VolumeDown onClick={() => setVolume(pre => pre - 0.1)} />
//         <a href>{Math.floor(volume * 100)} </a>
//         <VolumeUp onClick={() => setVolume(pre => pre + 0.1)} />
//       </div>
//       <div className="time">
//         {formatTime(curTime)} / {formatTime(totalTime)}
//       </div>
//       <audio
//         onEnded={() => handleOnEnded(ref_audio.current.currentSrc)}
//         ref={ref_audio}
//         // autoPlay={isPlaying}
//       >
//         <source src={curSrc} />
//         <source />
//       </audio>
//     </div>
//   );
// }

// export default Player2;

// function offsetLeft(el) {
//   var left = 0;
//   while (el && el !== document) {
//     left += el.offsetLeft;
//     el = el.offsetParent;
//   }
//   return left;
// }
