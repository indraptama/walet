import {h} from 'preact';

function NewsList(props) {
  return(
    <div className="NewsList">
      <a className="link inherit flex-l flex-column justify-between min-h10-l dim pointer">
        <div className="">
          <h5 className="f5 mb3 lh-title fw6">{props.title}</h5>

        </div>
        <div className="f7">
          <p className="f7 serif mb3">{props.preview}</p>
          <div className="cf pt3 bt b--primary-2 f8 fw6 primary">
            <div className="fl"><i className="icon icon-calendar mr2"></i>{props.postDate}</div>
            <div className="fr"><i className="icon icon-eye mr2"></i>{props.viewer} views</div>
          </div>
        </div>
      </a>
    </div>
  )
}

export default NewsList;
