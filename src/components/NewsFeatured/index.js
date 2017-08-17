import {h} from 'preact';

function NewsFeatured(props) {
  return(
    <div className="NewsFeatured elevation-10">
      <div className="flex-l">
        <div className="w-two-thirds-l cover" style={`background:url(${props.image}) center`}>
          <div className="aspect-ratio aspect-ratio--4x3">
            <div className="aspect-ratio--object cover">
              <img src={props.image} alt="" className="dn"/>
            </div>
          </div>
        </div>
        <div className="w-third-l bg-near-black pa3 pa4-l white flex-l flex-column justify-between">
          <div className="content">
            <h3 className="ttc primary f4 lh-title fw6 mb3 bb b--primary-2 pb3">{props.title}</h3>
            <p className="f6 serif">{props.preview}</p>
          </div>
          <div className="action f7">
            <a href="#" className="link primary"><span className="v-mid">Baca Selengkapnya</span> <i className="icon icon-angle-right ml3 v-mid"></i></a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsFeatured
