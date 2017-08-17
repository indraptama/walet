import {h,Component} from 'preact';
import anime from 'animejs';
import style from './style';


export default class Drawer extends Component {
  constructor(props) {
    super(props);
    this.state={
      active: false,
    }
  }

  handleClose() {
    DrawerOut(this.drawerBg, this.drawerContent);
    this.setState({
      active: !this.state.active,
    })
  }
  componentWillReceiveProps() {
    this.setState({
      active: !this.props.active,
    })
    const drawerActive = this.state.active ? DrawerIn(this.drawerBg, this.drawerContent) : DrawerOut(this.drawerBg, this.drawerContent);
  }

  render() {
    return (
      <div id="DR" style={Style.MainDrawer} className={style.Drawer} ref={(div) => {this.drawerBg = div}} onClick={this.handleClose.bind(this)}>
        <div id="DR_C" className={style.Drawer_container} ref={(div) => {this.drawerContent = div}}>
          {console.log(`from_drawer ${this.state.active}`)}
        </div>
      </div>
    );
  }
}

const Style = {
  MainDrawer: {
    zIndex: 9999,
  }
}

function DrawerIn(elem1, elem2) {
  anime.timeline({
    targets: elem1,
    width: window.innerWidth,
    duration: 1,
    easing:[0.0, 0.0, 0.2, 1]
  })
  .add({
    targets: elem2,
    translateX: 300,
    duration: 500,
    easing:[0.0, 0.0, 0.2, 1]
  });
}

function DrawerOut(elem1, elem2) {
  anime.timeline({
    targets: elem2,
    translateX: 0,
    duration: 500,
    easing:[0.0, 0.0, 0.2, 1]
  })
  .add({
    targets: elem1,
    width: 0,
    duration: 1,
    easing:[0.0, 0.0, 0.2, 1]
  });
}
