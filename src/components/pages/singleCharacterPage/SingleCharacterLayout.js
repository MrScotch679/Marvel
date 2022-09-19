import './singleCharacterLayout.scss';

const SingleCharacterLayout = () => {

  return (
    <div className="single-comic">
      <img src={'*'} alt={'*'} className="single-comic__char-img"/>
      <div className="single-comic__info">
        <h2 className="single-comic__name">{}</h2>
        <p className="single-comic__descr">{}</p>
      </div>
    </div>
  )
}

export default SingleCharacterLayout;