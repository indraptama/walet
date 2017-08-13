import {h} from 'preact'
import style from './style'

function NewsThumb(props) {
  return(
    <div className={style.NewsThumb}>
      <a href="#" className='flex link black'>
        <div className="w-25 mr3">
          <div className="aspect-ratio aspect-ratio--3x4">
            <div className="aspect-ratio--object cover" style={`background:url(${props.imageThumb}) center`}>
              <img src={`${props.imageThumb}`} alt="" className="dn"/>
            </div>
          </div>
        </div>
        <div className="w-75">
          <div className={style.NewsThumb_title}>
            {props.title}
          </div>
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
