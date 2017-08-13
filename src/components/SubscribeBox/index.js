import {h} from 'preact';

function SubscribeBox(props) {
  return (
    <div className="SubscribeBox pa3 bg-primary white">
      <h4 className="ttu tracked f6 fw6 mb2">Subscribe Us</h4>
      <p className="mb3 lh-copy">Dapatkan info terbaru langsung ke email anda </p>
      <form className="pa1 bg-white flex item-center" onSubmit={console.log('submited')}>
        <input style={Style.Input} className="w-100 input-reset pa2 bn sans" type="email"/>
        <button className="ph3 pv2 bn bg-primary f4 white">
          <i className="icon icon-paper-plane-o" />
        </button>
      </form>
    </div>
  )
}

const Style = {
  Input: {
    fontSize: 16,
  }
}

export default SubscribeBox
