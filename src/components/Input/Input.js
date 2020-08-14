import React, {useRef} from 'react';

const InputElement = props => {
    const textInput = useRef(null);
    if(props.focusInput) textInput.current.focus();
   
    return (<input type={props.type} className="search-box" value={props.cityname} ref={textInput}
            placeholder={props.placeholder} name={props.placeholder} id={props.placeholder} onChange={props.changed} />)
};

export default InputElement;