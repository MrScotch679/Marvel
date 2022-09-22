import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import useMarvelService from '../../../services/MarvelService';
import setContent from '../../../utils/setContent';

import './singleCharacterLayout.scss';

const SingleCharacterPage = () => {

  const {characterName} = useParams();

  const [char, setChar] = useState({});

  const {process, setProcess, getCharacterByName, clearError} = useMarvelService();

  useEffect(() => {
    updateChar();
    // eslint-disable-next-line
  }, [characterName])

  const updateChar = () => {
    clearError();
    getCharacterByName(characterName)
      .then(onComicLoaded)
      .then(() => setProcess('confirmed'))
      .catch(() => setProcess('error'));
  }

  const onComicLoaded = (characterName) => {
    setChar(characterName);
  }

  return (
    <>
      {setContent(process, View, char)}
    </>
  )
}

const View = ({data}) => {
  const {thumbnail, name, description} = data;

  return (
    <div className="single-comic">
      <img src={thumbnail} alt={name} className="single-comic__char-img"/>
      <div className="single-comic__info">
        <h2 className="single-comic__name">{name}</h2>
        <p className="single-comic__descr">{description}</p>
      </div>
      <Link to="/" className="single-comic__back">Back to all</Link>
    </div>
  )
}

export default SingleCharacterPage;