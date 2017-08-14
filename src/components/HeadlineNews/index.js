import {h} from 'preact';
import style from './style';

function HeadlineNews(props) {
  return (
    <div className={style.HLN}>
      <a href={props.link} className={style.HLN_C}>
        <div className={style.outer}>
          <div className={style.inner}
            style={`background-image:url(${props.imageThumb})`}/>
        </div>
        <div className={style.HLN_Con}>
          <h3 className={style.HLN_T}>{props.title}</h3>
          <div className={style.HLN_D}>
            <i className="icon icon-calendar mr2" />
            <span className="mr4 fw6">{props.postDate}</span>
            <i className="icon icon-eye mr2" />
            <span className="fw6">{props.viewer} viewer</span>
          </div>
          <div className={style.HLN_P}>
            {props.reviews}
          </div>
        </div>
      </a>
    </div>
  )
}

export default HeadlineNews
