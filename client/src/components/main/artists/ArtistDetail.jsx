import React from 'react';
// import PropTypes from 'prop-types';
import { Favorite } from '@material-ui/icons';
const ArtistDetail = props => {
  return (
    <section className="row">
      <div className="album-tracks col-7">
        <ol>
          <li>
            <span>Feel Invincible</span>
            <span>Feel Invincible</span>
            <span>3:49</span>
          </li>
          <li>
            <span>Back From The Dead</span>
            <span>3:33 </span>
          </li>
          <li>
            <span>Stars</span>
            <span>3:47</span>
          </li>
          <li>
            <span>I Want To Live</span>
            <span>3:28</span>
          </li>
          <li>
            <span>Undefeated</span>
            <span>3:35</span>
          </li>
          <li>
            <span>Famous</span>
            <span>3:18</span>
          </li>
          <li>
            <span>Lions</span>
            <span>3:24</span>
          </li>
          <li>
            <span>Out Of Hell</span>
            <span>3:34</span>
          </li>
          <li>
            <span>Burn It Down</span>
            <span>3:16</span>
          </li>
          <li>
            <span>Watching For Comets</span>
            <span>3:29</span>
          </li>
          <li>
            <span>Saviors Of The World</span>
            <span>3:46</span>
          </li>
          <li>
            <span>The Resistance</span>
            <span>3:52</span>
          </li>
        </ol>
      </div>
      <div className="album-info col-5">
        <div className="album-art">
          <img src="https://target.scene7.com/is/image/Target/51223401?wid=520&amp;hei=520&amp;fmt=pjpeg" />
          <div className="actions">
            <div className="play">Play</div>
            <div className="bookmark">
              <Favorite color="error" />
            </div>
          </div>
        </div>
        <div className="album-details">
          <h2>
            <img src="https://68.media.tumblr.com/avatar_edbd71e8c8ac_128.png" />
            Skillet
          </h2>
          <h1>Unleashed</h1>
          <span>
            <span>Hard Rock </span>
            <br />
            <span>&copy; 2016 Atlantic Recording Corporation</span>
          </span>
          <br />
          <br />
          <p>
            Unleashed is the tenth album by American Christian rock band
            Skillet, released on August 5, 2016. The album was announced on May
            20, 2016, and a lyric video was released for the track "Feel
            Invincible" at the same time on the band's YouTube channel. Six days
            later, the band released a lyric video for the track "Stars" on
            their YouTube channel.
          </p>
        </div>
      </div>
    </section>
  );
};

ArtistDetail.propTypes = {};

export default ArtistDetail;
