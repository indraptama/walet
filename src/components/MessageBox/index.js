import {h} from 'preact';
import TextField from '../TextField';

function MessageBox(props) {
  return (
    <div className="MessageBox bg-white">
      <form className="pa4" onSubmit="">
      <ul>
        <li className="mb3"><TextField label="Full Name"/></li>
        <li className="mb3"><TextField label="your email"/></li>
        <li className="mb3"><TextField label="your message"/></li>
        <li className="">
          <button className="f7 bg-primary tc bn db w-100 pa3 ttu fw5 sans tracked white">
            Kirim Pesan
          </button>
        </li>
      </ul>
      </form>
    </div>
  )
}

export default MessageBox;
