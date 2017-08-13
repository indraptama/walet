import {h} from 'preact';

function ProductThumb(props) {
  return (
    <div className="ProductThumb relative shadow-1">
      <div className="ProductThumb_container">
        <div className="aspect-ratio aspect-ratio--3x4 z-1">
          <div className="aspect-ratio--object cover"
            style={`background:url(${props.imageThumb}) center`}></div>
        </div>
        <div style={Style.productDetails} className="absolute tc bottom-0 bg-white pa2 pa3-l z-3 w-80 center">
          <h4 className="f6 f5-l fw6 mb2">{props.title}</h4>
          <span className="f7 ttc">lihat details</span>
        </div>
      </div>
    </div>
  )
}

const Style = {
  productDetails: {
    left: '10%',
  }
}

export default ProductThumb
