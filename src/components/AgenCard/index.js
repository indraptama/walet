import {h} from 'preact';
import style from './style';

function AgenCard(props) {
  return (
    <div className={style.AgenCard}>
      <div className={style.AgenCard_container}>
        <div className={style.AgenCard_name}>
          {props.name}
        </div>
        <div className={style.AgenCard_address}>
          {props.address}
        </div>
      </div>
      <div className={style.AgenCard_bar}/>
    </div>
  )
}

export default AgenCard
