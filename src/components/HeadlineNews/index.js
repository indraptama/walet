import {h} from 'preact';

function HeadlineNews(props) {
  return (
    <div className="HeadlineNews bg-white-l">
      <a href={props.link} className="HeadlineNews_container link black">
        <div className="aspect-ratio aspect-ratio--16x9 z-1">
          <div className="aspect-ratio--object cover"
            style={`background:url(${props.imageThumb}) center`}/>
        </div>
        <div className="pv3 bg-white-l w-90-l center tc-l ft--3-l z-2 relative">
          <h3 className="fw6 f4 f3-l mb3">{props.title}</h3>
          <div className="f7 mb3 primary">
            <i className="icon icon-calendar mr2" />
            <span className="mr4 fw6">{props.postDate}</span>
            <i className="icon icon-eye mr2" />
            <span className="fw6">{props.viewer} viewer</span>
          </div>
          <div className="lh-copy">
            {props.reviews}
          </div>
        </div>
      </a>
    </div>
  )
}

export default HeadlineNews
