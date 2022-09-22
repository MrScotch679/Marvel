import { useParams, Link } from 'react-router-dom';

import './singleCharacterLayout.scss';

const SingleCharacterPage = (props) => {

  let {charName} = useParams();

  console.log(charName)

  const {name, description, thumbnail} = props.foundChar;

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