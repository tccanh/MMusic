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
import Playing from './Playing';
const Audio = props => {
  const [curSrc, setCurSrc] = useState('');
  const [index, setIndex] = useState(0);
  const [songs, setSongs] = useState(null);
  const [total, setTotal] = useState(0);
  const [loop, setLoop] = useState(0);
  const [love, setLove] = useState(false);
  const [suffle, setSuffle] = useState(false);
  const [random, setRandom] = useState(1);
  const [playlist, setPlaylist] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if (props.songs) {
      setSongs(props.songs);
      setTotal(props.songs.length);
      setCurSrc(props.songs[0]);
      setLove(props.songs[0].isLike);
      setRandom(Math.floor(Math.random() * (props.songs.length - 1)) + 1);
    }
    return () => {
      console.log('Unmount Start');
    };
  }, [props.songs]);

  useEffect(() => {
    if (props.isAuthenticated) {
      setIsAuth(props.isAuthenticated);
    }
    return () => {
      console.log('Unmount: Authenticated');
    };
  }, [props.isAuthenticated]);

  useEffect(() => {
    if (songs) {
      const currentSong = songs[index];
      setCurSrc(currentSong);
    }
    console.log('Mount: CurSrc');
    return () => {
      console.log('Unmount: CurSrc');
    };
  }, [index, songs]);

  useEffect(() => {
    if (curSrc.id) {
      props.increaseView(curSrc.id);
    }

    console.log('Mount: View');
    return () => {
      console.log('Unmount: View');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curSrc.id]);

  useEffect(() => {
    if (curSrc.isLike) {
      setLove(curSrc.isLike);
    }
    console.log('Mount: Love');
    return () => {
      console.log('Unmount: Love');
    };
  }, [curSrc.isLike]);

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
    if (love) {
      console.log(curSrc.id);
      props.unLikeSong(curSrc.id);
    } else {
      console.log(curSrc.id);
      props.likeSong(curSrc.id);
    }
    return setLove(pre => !pre);
  }
  function handleSuffle() {
    setSuffle(pre => !pre);
    setRandom(Math.floor(Math.random() * (total - 1) + 1));
  }

  return (
    <>
      <Playing
        open={playlist}
        songs={songs}
        curIndex={index}
        songPicker={i => setIndex(i)}
      />

      {curSrc && <img className="imagesong" src={curSrc.image} />}
      {curSrc && (
        <div className="infosong">
          <p className="namesong">{curSrc.name}</p>
          {collapeArtists(curSrc.artists) && (
            <p className="artistsong">{collapeArtists(curSrc.artists)}</p>
          )}
        </div>
      )}
      {isAuth ? (
        love ? (
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
        )
      ) : null}
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
        loop={loop === 2}
        onNext={() => {
          const next = suffle ? random : 1;
          // console.log('ran1', next);
          return setIndex(pre => (pre + next) % total);
        }}
        onPrev={() => {
          const next = suffle ? random : 1;
          // console.log('ran2', next);
          return setIndex(pre => (pre + total - next) % total);
        }}
        onDone={() => {
          const next = suffle ? random : 1;
          if (loop !== 2) {
            if (loop === 1) {
              // console.log('ondone');
              return setIndex(pre => (pre + next) % total);
            }
            if (index !== total - 1) {
              return setIndex(pre => (pre + next) % total);
            }
            return setIndex(total - 1);
          }
        }}
      />
      <PlaylistPlay
        onClick={() => setPlaylist(pre => !pre)}
        className="songicon btnplaylist"
        style={{ fontSize: 'xx-large' }}
      />
    </>
  );
};

Audio.propTypes = {
  songs: PropTypes.array.isRequired,
  unLikeSong: PropTypes.func.isRequired,
  likeSong: PropTypes.func.isRequired,
  increaseView: PropTypes.func.isRequired
};

export default Audio;
