import {h} from 'preact';
import style from './style';

function ProductCard(props) {
  return (
    <div className={style.ProductCard}>
      <div className="bg-primary aspect-ratio aspect-ratio--1x1 aspect-ratio--4x3-l">
        <div className="aspect-ratio--object cover" style={`background:url(${props.image}) center`}>
          <img src={props.image} alt="" className="dn"/>
        </div>
      </div>
      <div className="pa3 pa3-l lh-title">
        <h4 className="f6 truncate mb1">{props.title}</h4>
        <span className="primary f7 fw6">{props.price}</span>
      </div>
    </div>
  )
}

export default ProductCard
