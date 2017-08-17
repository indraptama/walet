import {h} from 'preact';
import {focusLine, outFocusLine} from '../animation.js';

function TextFieldRow(props) {
  let highlightLine = null;
  let Labels = null

  function inputOnFocus() {
    focusLine(highlightLine, Labels);
  }

  function inputOnBlur() {
    outFocusLine(highlightLine, Labels);
  }


  return(
    <label className="db">
      <span className="f7 db fw5 ttc silver ttc" ref={(span) => {Labels = span}}>{props.label}</span>
      <textarea
        style={Style.noFocus}
        className="input-reset sans pv2 w-100 bn bg-transparent noFocus"
        type="text"
        onFocus={inputOnFocus}
        onBlur={inputOnBlur}
        {...props}
      />
      <div className="relative w-100 overflow-x-hidden">
        <span className="w-100 db absolute z-2 top-0" ref={(span) => {highlightLine = span}} style={Style.highlightLine}/>
        <span className="w-100 db bb b--black-20 relative z-1"/>
      </div>
    </label>
  )
}

const Style = {
  highlightLine: {
    right: '100%',
    height: 1,
    width: '100%',
    background: 'linear-gradient(to left, #ff00cc, #333399)',
  },
  noFocus: {
    outline: 'none',
    resize: 'vertical',
  }
}


export default TextFieldRow;
