import {h} from 'preact';
import style from './style'


function OwnerPicture(props) {
  return(
    <div className={style.OwnerPicture}>
      <div className={style.OwnerPicture_inner}
           style={`background-image:url(${props.pictures})`}/>
    </div>
  )
}

export default OwnerPicture
