/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import {
  PlaylistPlay,
  Favorite,
  Shuffle,
  Repeat,
  RepeatOne
} from '@material-ui/icons';
import PropTypes from 'prop-types';
import Player from './Player';

const Audio = props => {
  const [curSrc, setCurSrc] = useState('');
  const [index, setIndex] = useState(0);
  const [songs, setSongs] = useState(null);
  const [total, setTotal] = useState(0);
  const [loop, setLoop] = useState(0);
  const [love, setLove] = useState(false);
  const [suffle, setSuffle] = useState(false);
  const [random, setRandom] = useState(1);
  useEffect(() => {
    setSongs(props.songs);
    setTotal(props.songs.length);
    setCurSrc(props.songs[0]);
    setRandom(Math.floor(Math.random() * (props.songs.length - 1)) + 1);
    return () => {
      console.log('Did UnMount 1');
    };
  }, [props.songs]);
  useEffect(() => {
    if (songs) setCurSrc(songs[index]);
    console.log('Did Mount 2');
    return () => {
      console.log('Did UnMount 2');
    };
  }, [index, songs]);
  function collapeArtists(artists) {
    if (artists) {
      return artists
        .map(art => {
          return art.name;
        })
        .join(',  ');
    } else return undefined;
  }
  function handleLoop() {
    setLoop(pre => (pre + 1) % 3);
  }
  function handleLove() {
    setLove(pre => !pre);
  }
  function handleSuffle() {
    setSuffle(pre => !pre);
    setRandom(Math.floor(Math.random() * (total - 1) + 1));
  }
  return (
    <>
      <img className="imagesong" src={curSrc.image} />
      <div className="infosong">
        <p className="namesong">{curSrc.name}</p>
        {collapeArtists(curSrc.artists) && (
          <p className="artistsong">{collapeArtists(curSrc.artists)}</p>
        )}
      </div>
      {love ? (
        <Favorite
          onClick={() => handleLove()}
          className="songicon lovesong"
          style={{ fontSize: 'x-large', color: 'red' }}
        />
      ) : (
        <Favorite
          onClick={() => handleLove()}
          className="songicon lovesong"
          style={{ fontSize: 'x-large' }}
        />
      )}
      {suffle ? (
        <Shuffle
          onClick={() => handleSuffle()}
          className="songicon sufflesong"
          style={{ color: 'red' }}
        />
      ) : (
        <Shuffle
          onClick={() => handleSuffle()}
          className="songicon sufflesong"
        />
      )}

      {loop === 0 && (
        <Repeat onClick={() => handleLoop()} className=" songicon repeatsong" />
      )}
      {loop === 1 && (
        <Repeat
          onClick={() => handleLoop()}
          className=" songicon repeatsong"
          style={{ color: 'red' }}
        />
      )}
      {loop === 2 && (
        <RepeatOne
          onClick={() => handleLoop()}
          className=" songicon repeatsong"
          style={{ color: 'red' }}
        />
      )}
      <Player
        src={curSrc.link}
        onNext={() => {
          const next = suffle ? random : 1;
          console.log('ran1', next);
          return setIndex(pre => (pre + next) % total);
        }}
        onPrev={() => {
          const next = suffle ? random : 1;
          console.log('ran2', next);
          return setIndex(pre => (pre + total - next) % total);
        }}
        onDone={() => {
          const next = suffle ? random : 1;
          console.log('ondone');
          return setIndex(pre => (pre + next) % total);
        }}
      />
      <PlaylistPlay
        onClick={() => console.log(collapeArtists(curSrc.artists))}
        className="songicon btnplaylist"
        style={{ fontSize: 'xx-large' }}
      />
    </>
  );
};

Audio.propTypes = {
  songs: PropTypes.array.isRequired
};

export default Audio;
