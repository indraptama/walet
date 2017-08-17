import {h} from 'preact';
import style from './style';

function TestiBox(props) {
  return (
    <div className={style.TestiBox}>
      <div className="serif lh-title f4 white aspect-ratio aspect-ratio--16x9">
        <div className="aspect-ratio--object bg-primary pa4">
          {props.quote}
        </div>
      </div>
      <div className="pa3 bg-white">
        <div className="dt w-100">
          <div className="dtc w3 v-mid">
            <img src="assets/images/ava/image-1.png" alt="" className="br-100"/>
          </div>
          <div className="dtc pl3 v-mid">
            <h4 className="f6 lh-solid ttc">{props.user}</h4>
            <span className="f7 primary ttc">{props.city} - {props.prov}</span>
          </div>
        </div>
      </div>
    </div>

  )
}

export default TestiBox
