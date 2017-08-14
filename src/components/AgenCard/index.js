import {h} from 'preact';
import style from './style';
import Link from 'preact-router'

function AgenCard(props) {
  return (
    <div className={style.AgenCard}>
      <div className={style.AgenCard_container}>
        <div className={style.AgenCard_ava}>
          <img src={props.avatar} alt=""/>
        </div>
        <div className={style.AgenCard_content}>
          <div className={style.AgenCard_name}>
            {props.name}
          </div>
          <div className={style.AgenCard_address}>
            <p>{props.address}</p>
            <p>{props.contact}</p>
          </div>
        </div>
        <div className={style.AgenCard_Arrow}>
          <button href="#">
            <span>Detail</span>
            <i className="icon icon-angle-right"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AgenCard
