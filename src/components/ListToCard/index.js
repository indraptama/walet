import {h, Component} from 'preact';

export default class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state={
      detailOpen: false,
    }
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({
      detailOpen: !this.state.detailOpen,
    })
  }

  render() {
    const OpenDetail = this.state.detailOpen ? 'display:flex' : 'display:none';
    return (
      <div>
        <a onClick={this.handleClick.bind(this)}
          href="#"
          className="elevation-hover pointer ListToCard flex flex-column-l items-center w-100 justify-between link black db-l mw5-l ba-l b--black-10">
          <div className="w3 center-l mt4-l mb3-l">
            <div className="w3 h3 bg-red br-100 overflow-hidden cover" style={`background:url(${this.props.avatar}) center`}>
              <img src={this.props.avatar} alt="" className="dn"/>
            </div>
          </div>
          <div className=" ph3 w-100 f7 gray pv2 h4-l">
            <h4 className="f6 black mb1 ttc">{this.props.name}</h4>
            <p className="f7 ttc"><span>{this.props.city}</span><span> - </span>
            <span>{this.props.prov}</span><br />
            </p>
          </div>
          <div className="w2 ph3-l f6 bg-primary-l w-100-l tc pv2-l dn-l">
              <span className="mr3 dn dib-l white fw6 ttc f7">details</span>
              <i className="icon icon-angle-right dn-l"></i>
          </div>
        </a>

      <div style={OpenDetail} onClick={this.handleClick.bind(this)} className="ContactDialog bg-black-70 fixed w-100 h-100 absolute--fill z-5 pa3 flex items-center">
        <div className="w-90 mw6-l w-100-l center bg-white f7 br2 elevation-10 ttc">
          <div className="pa4 center">
            <div className="w3 h3 bg-red br-100 overflow-hidden cover center" style={`background:url(${this.props.avatar}) center`}>
              <img src={this.props.avatar} alt="" className="dn"/>
            </div>
          </div>
            <div className="bt b--black-10 pv2 ph3">
              <div className="cf justify-between">
               <span className="fl dib gray w-third f7">Nama</span>
               <span className="fl dib black tr pl4 w-two-thirds">{this.props.name}</span>
              </div>
            </div>
            <div className="bt b--black-10 pv2 ph3">
              <div className="cf justify-between">
                <span className="fl dib gray w-third f7">Alamat</span>
                <span className="fl dib black tr pl4 w-two-thirds ttc">{this.props.streetAddress}</span>
              </div>
            </div>
            <div className="bt b--black-10 pv2 ph3">
              <div className="cf justify-between">
                <span className="fl dib gray w-third f7">Kota</span>
                <span className="fl dib black tr pl4 w-two-thirds">{`${this.props.city} - ${this.props.prov}`}</span>
              </div>
            </div>
            <div className="bt b--black-10 pv2 ph3">
              <div className="cf justify-between">
                <span className="fl dib gray w-third f7">Kontak</span>
                <span className="fl dib black tr pl4 w-two-thirds">{this.props.contact}</span>
              </div>
            </div>

        </div>
      </div>

      </div>
    )
  }
}
