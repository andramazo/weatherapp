import React from 'react';
import './Modal.scss';
import Backdrop from '../Backdrop/Backdrop';


const modal = props =>{
    return (
        <React.Fragment>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            <div  className="Modal" style={{
                    opacity: props.show ? '1' : '0'
                }}>     
                <div>
                    {props.children}
                </div>           
            </div>
        </React.Fragment>
    )
}

export default  React.memo(modal, (prevProps, nextProps) => nextProps.show === prevProps.show && nextProps.children === prevProps.children);
