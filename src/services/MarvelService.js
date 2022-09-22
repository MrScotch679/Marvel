import { useState, useCallback } from "react";

const axios = require('axios').default;

const useMarvelService = () => {
  const [process, setProcess] = useState('waiting');

  const clearError = useCallback(() => {
    setProcess('loading');
  }, []);

  const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  const _apiKey = 'apikey=1993ba6ffb336a484ae8d64ac5c9983a';
  const _baseOffset = 210;

  const getAllCharacters = async (offset = _baseOffset) => {
    setProcess('loading');
    const res = await axios.get(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
    return res.data.data.results.map(_transformChar);
  }

  const getCharacter = async (id) => {
    setProcess('loading');
    const res = await axios.get(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformChar(res.data.data.results[0]);
  }

  const getCharacterByName = async (name) => {
    setProcess('loading');
    const res = await axios.get(`${_apiBase}characters?name=${name}&${_apiKey}`);
    return _transformChar(res.data.data.results[0]);
  }

  const _transformChar = (char) => {
    return {
      name: char.name,
      description: char.description ? `${char.description.slice(0, 210)}...` : 'No description for this character...',
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      id: char.id,
      comics: char.comics.available !== 0 ? char.comics.items.slice(0, 10) : [{name: 'No information about comics...'}],
    }
  }

  const getSingleComic = async (id) => {
    setProcess('loading');
    const res = await axios.get(`${_apiBase}comics/${id}?${_apiKey}`);
    return _transformComics(res.data.data.results[0]);
  }

  const getAllComics = async (offset = _baseOffset) => {
    setProcess('loading');
    const res = await axios.get(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
    return res.data.data.results.map(_transformComics);
  }

  const _transformComics = (comics) => {
    return {
      title: comics.title,
      description: comics.description ? comics.description : 'No description for this comic...',
      pages: comics.pageCount + ' pages',
      shop: comics.urls.url,
      prices: comics.prices[0].price ? comics.prices[0].price + '$' : 'No price information...',
      thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
      id: comics.id,
    }
  }

  return {
    process, 
    setProcess, 
    getAllCharacters, 
    getCharacter, 
    getCharacterByName, 
    getSingleComic, 
    getAllComics, 
    clearError,
  }
}

export default useMarvelService;