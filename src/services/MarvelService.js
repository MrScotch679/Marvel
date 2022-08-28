import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
  const {loading, request, error, clearError} = useHttp();

  const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  const _apiKey = 'apikey=1993ba6ffb336a484ae8d64ac5c9983a';
  const _baseOffset = 210;


  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformChar);
  }

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformChar(res.data.results[0]);
  }

  const _transformChar = (char) => {
    return {
      name: char.name,
      description: char.description ? `${char.description.slice(0, 210)}...` : 'We have no information about...',
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      id: char.id,
      comics: char.comics.available !== 0 ? char.comics.items.slice(0, 10) : [{name: 'We have no information about...'}],
    }
  }

  const getSingleComic = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    return _transformComics(res.data.results[0]);
  }

  const getAllComics = async (offset = _baseOffset) => {
    const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformComics);
  }

  const _transformComics = (comics) => {
    return {
      title: comics.title,
      description: comics.description ? comics.description : 'We have no description information for this comic',
      pages: comics.pageCount + ' pages',
      shop: comics.urls.url,
      prices: comics.prices[0].price ? comics.prices[0].price + '$' : 'We have no price information for this comic',
      thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
      id: comics.id,
    }
  }

  return {loading, error, getAllCharacters, getCharacter, getSingleComic, getAllComics, clearError}
}

export default useMarvelService;