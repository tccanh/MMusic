import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Player from './Player';

const Audio = props => {
  const [curSrc, setCurSrc] = useState('');
  const [index, setIndex] = useState(0);
  const [songs, setSongs] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setSongs(props.songs);
    setTotal(props.songs.length);
    setCurSrc(props.songs[0]);
    return () => {
      console.log('Did UnMount 1');
    };
  }, [props.songs]);

  return (
    <>
      <Player
        src={curSrc.link}
        onNext={() => {
          if (index < total - 1) setIndex(pre => pre + 1);
          else setIndex(0);
          setCurSrc(songs[index]);
        }}
        onPrev={() => {
          if (index > 0) setIndex(pre => pre - 1);
          else setIndex(total - 1);
          setCurSrc(songs[index]);
        }}
        onDone={() => {
          if (index < total - 1) setIndex(pre => pre + 1);
          else setIndex(0);
          setCurSrc(songs[index]);
        }}
      />
      <h6>
        [{index}/{total}][ {curSrc.name}
      </h6>
    </>
  );
};

Audio.propTypes = {
  songs: PropTypes.array.isRequired
};

export default Audio;
