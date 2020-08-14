import React from 'react';
import  './Footer.scss';

const Footer = props => {
    return (<footer className="footer">
              <div>Anushree Dave | <a href="https://www.andramazo.com">andramazo.com</a> | <a href="https://twitter.com/andramazo">@andramazo</a> </div>
              <div>Made with <span className="heartEmoji">&#10084;</span> in Toronto</div>
            </footer>
            )
};

export default Footer;