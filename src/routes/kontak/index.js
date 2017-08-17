import{h, Component} from 'preact';
import TextField from '../../components/TextField';
import TextFieldRow from '../../components/TextField/TextFieldRow.js';

export default class Kontak extends Component {
  constructor(props) {
    super(props);
  }


  handleSubmit(e) {
    e.preventDefault();
    alert('submited')
  }

  render() {
    return (
      <div className="div">
      <div className="pt5" />
      <section className="bg-primary ph3">
        <div className="flex items-center mw8 center vh-50">
          <div className="measure-wide white">
            <h2 className="f3 f2-l fw6 white">Hubungi kami</h2>
            <p className="serif f5-l">Hubungi Kami untuk bertanya dan konsultasi seputar bisnis sarang burung walet dan perawatannya.</p>
          </div>
        </div>
      </section>

      <section className="ph3-l">
        <div className="mw8 bg-white center elevation-10 ft--4-l">
          <div className="flex-l">
            <div className="w-two-thirds-l pa3 pa5-l">
            <h4 className="f4 primary mb4">Sampaikan Pesan Anda</h4>
            <form action="">
              <div className="cf mb3">
                <div className="fl-l dib-l w-100 w-50-l mb3 pr4-l">
                  <TextField label="nama lengkap"/>
                </div>
                <div className="fl-l dib-l w-100 w-50-l mb3 pr2-l">
                  <TextField label="Alamat"/>
                </div>
                <div className="fl-l dib-l w-100 w-50-l mb3 pr4-l">
                  <TextField label="Nomor Telepon" type="number"/>
                </div>
                <div className="fl-l dib-l w-100 w-50-l mb3 pr2-l">
                  <TextField label="Email" type="email"/>
                </div>
                <div className="fl-l dib-l w-100 mb3 pr2-l">
                  <TextFieldRow label="pesan anda"/>
                </div>
              </div>
              <div className="sendButton tr">
                <button onClick={this.handleSubmit.bind(this)} className="br-100 bn bg-primary white w3 h3 elevation-10 f4 lh-solid tc">
                  <i className="icon icon-paper-plane-o"></i>
                </button>
              </div>
            </form>
            </div>
            <div className="w-third-l bg-near-black white pa3 ph4-l pv5-l">
              <h4 className="f4 primary mb4">Kontak</h4>
              <div className="">
                <div className="div f7 mb4">
                  <h6 className="mb3 ttu tracked f7 fw6 primary">Office</h6>
                  <p>Jl. Dr. Soetomo 41 Weleri – Kendal 51355, Jawa Tengah – Indonesia</p>
                </div>
                <div className="div f7 mb4">
                  <h6 className="mb3 ttu tracked f7 fw6 primary">Telepon</h6>
                  <p className="mb2"><i className="icon icon-phone mr3"></i>082138388899</p>
                  <p className=""><i className="icon icon-whatsapp mr3"></i>082138388899</p>
                </div>
                <div className="div f7 mb4">
                  <h6 className="mb3 ttu tracked f7 fw6 primary">email</h6>
                  <p>arief.walet@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      </div>
    );
  }
}
