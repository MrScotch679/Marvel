import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

const setContent = (process, Component, newItemLoading) => {
  switch (process) {
    case 'waiting':
      return <Spinner/>;
    case 'loading':
      return newItemLoading ? <Component/> : <Spinner/>;
    case 'confirmed':
      return <Component/>;
    case 'error': 
      return <ErrorMessage/>;
    default: 
      break;
  }
}

const CharList  = (props) => {

  const [charList, setCharList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);

  const {process, setProcess, getAllCharacters} = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
    // eslint-disable-next-line
  }, [])

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);

    getAllCharacters(offset)
      .then(onCharListLoaded)
      .then(() => setProcess('confirmed'))
      .catch(() => setProcess('error'));
  }

  const onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList < 9) {
      ended = true;
    }

    setCharList(charList => [...charList, ...newCharList]);
    setNewItemLoading(newItemLoading => false);
    setOffset(offset => offset + 9);
    setCharEnded(charEnded => ended);
  }

  function renderItems(arr) {
    const items = arr.map((item) => {
      let imgStyle = {'objectFit' : 'cover'};
      if (item.thumbnail.includes('image_not_available')) {
        imgStyle = {'objectFit' : 'unset'};
      }

      let className = 'char__item';
      if (item.id === props.selectedChar) {
        className += ' char__item_selected'
      }

      return (
        <li className={className}
          tabIndex={0}
          key={item.id}
          onClick={ () => props.onCharSelected(item.id) }
          onKeyPress={ (e) => e.code === 'Enter' ? props.onCharSelected(item.id) : null }>
            <img src={item.thumbnail} 
              alt={item.name}
              style={imgStyle}/>
            <div className="char__name">{item.name}</div>
        </li>
      )
    })

    return (
      <ul className="char__grid">
        {items}
      </ul>
    )
  }

  return (
    <div className="char__list">
      {setContent(process, () => renderItems(charList), newItemLoading)}
      <button className="button button__main button__long"
          disabled={newItemLoading}
          style={{'display': charEnded ? 'none' : 'block'}}
          onClick={() => onRequest(offset)}>
        <div className="inner">load more</div>
      </button>
    </div>
  )

}

export default CharList;