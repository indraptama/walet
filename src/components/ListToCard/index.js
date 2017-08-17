import {h, Component} from 'preact';

export default class MyComponent extends Component {
  constructor(props) {
    super(props);
  }

  handleClick(e) {
    e.preventDefault()
  }

  render() {
    return (
      <div>
        <a onClick={this.handleClick.bind(this)}
          href="#"
          className="elevation-hover pointer ListToCard flex flex-column-l items-center w-100 justify-between link black db-l mw5-l ba-l b--black-10">
          <div className="w3 w-100-l center-l">
            <div className="w3 h3 w-100-l h4-l bg-red br-100 br0-l overflow-hidden cover" style={`background:url(${this.props.avatar}) center`}></div>
          </div>
          <div className=" ph3 w-100 f7 gray pv2 h4-l">
            <h4 className="f6 black mb1 ttc">{this.props.name}</h4>
            <p className="f7 ttc"><span>{this.props.city}</span><span> - </span>
            <span>{this.props.prov}</span><br />
            </p>
          </div>
          <div className="db-l w2 ph3-l f6 bg-primary-l w-100-l tc pv2-l">
              <span className="mr3 dn dib-l white fw6 ttc f7">details</span>
              <i className="icon icon-angle-right dn-l"></i>
          </div>
        </a>

      <div style={'display:none'} className="ContactDialog bg-black-70 fixed w-100 h-100 absolute--fill z-5 pa3 flex items-center">
        <div className="mw6 center bg-white shadow-1 f6 br2">
          <div className="pa4 center">
            <div className="w4 h4 bg-red br-100 overflow-hidden center"></div>
          </div>
            <div className="bt b--black-10 pa3">
              <div className="cf justify-between">
               <span className="fl dib gray w-third">Name</span>
               <span className="fl dib black tr pl4 w-two-thirds">{this.props.name}</span>
              </div>
            </div>
            <div className="bt b--black-10 pa3">
              <div className="cf justify-between">
                <span className="fl dib gray w-third">Alamat</span>
                <span className="fl dib black tr pl4 w-two-thirds">{this.props.streetAddress}</span>
              </div>
            </div>
            <div className="bt b--black-10 pa3">
              <div className="cf justify-between">
                <span className="fl dib gray w-third">Kota</span>
                <span className="fl dib black tr pl4 w-two-thirds">{`${this.props.city} - ${this.props.prov}`}</span>
              </div>
            </div>
            <div className="bt b--black-10 pa3">
              <div className="cf justify-between">
                <span className="fl dib gray w-third">Kontak</span>
                <span className="fl dib black tr pl4 w-two-thirds">{this.props.contact}</span>
              </div>
            </div>

        </div>
      </div>

      </div>
    )
  }
}
