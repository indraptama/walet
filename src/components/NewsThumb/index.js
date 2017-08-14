import {h} from 'preact'
import style from './style'

function NewsThumb(props) {
  return(
    <div className={style.NewsThumb}>
      <a href="#" className={style.NewsThumb_container}>
        <div className={style.NewsThumb_imgContainer}>
          <div className={style.NewsThumb_img}>
              <div className={style.NewsThumb_imgInner} style={`background-image:url(${props.imageThumb})`}>
                <img src={`${props.imageThumb}`} alt="" className={style.dn}/>
              </div>
          </div>
        </div>

        <div className={style.NewsThumb_content}>
          <h4 className={style.NewsThumb_title}>
            {props.title}
          </h4>
          <div className={style.NewsThumb_date}>
            <i className="icon icon-calendar mr2" />
            <span className="mr4 fw6">{props.postDate}</span>
            <i className="icon icon-eye mr2" />
            <span className="fw6">{props.viewer} viewer</span>
          </div>
          <div className={style.NewsThumb_preview}>{props.reviews}</div>
        </div>
      </a>
    </div>
  )
}

export default NewsThumb
