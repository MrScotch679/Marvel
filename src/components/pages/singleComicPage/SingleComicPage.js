import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import setContent from '../../../utils/setContent';

import useMarvelService from '../../../services/MarvelService';

import './singleComicPage.scss';

const SingleComicPage = () => {

  const {comicId} = useParams();
  const [comic, setComic] = useState({});

  const {process, setProcess, getSingleComic, clearError} = useMarvelService();

  useEffect(() => {
    updateComic();
    // eslint-disable-next-line
  }, [comicId])

  const updateComic = () => {
    clearError();
    getSingleComic(comicId)
      .then(onComicLoaded)
      .then(() => setProcess('confirmed'))
      .catch(() => setProcess('error'));
  }

  const onComicLoaded = (comic) => {
    setComic(comic);
  }

  return (
    <>
      {setContent(process, View, comic)}
    </>
  )
}

const View = ({data}) => {
  const {title, description, pages, prices, thumbnail} = data;

  return (
    <div className="single-comic">
      <img src={thumbnail} alt={title} className="single-comic__img"/>
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">{pages}</p>
        <p className="single-comic__descr">Language: en-us</p>
        <div className="single-comic__price">{prices}</div>
      </div>
      <Link to="/comics" className="single-comic__back">Back to all</Link>
    </div>
  )
}

export default SingleComicPage;