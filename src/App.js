import React,{ useState} from 'react';
import Weather from './containers/weather';
import './App.scss';
import './styles/Sunny.scss';
import './styles/Rain.scss';
import './styles/Snow.scss';
import './styles/Haze.scss';
import './styles/Cloudy.scss';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

function App() {
  const [initalWeatherFeel, setWeatherFeel] = useState('');

  //Set the weather feel so that backgroudn changes
  const weatherfeelHandler = (value)=>{
      setWeatherFeel(value);
  }
  let weather_feel = null;

  /**
   * Currently, this app shows weather bg for - sunny, haze,cloudy, rain and snow
   */
  if(initalWeatherFeel === 'sunny'){
    weather_feel = (< React.Fragment>
                      <div className="sunny"></div>
                      <div className="sunnyTwo"></div>
                      <div className="sunnyThree"></div>
                      <div className="sunnyFour"></div>
                    </React.Fragment>  )
  }
  if(initalWeatherFeel === 'rain'){
    let items = [];
    for(let i= 0 ;i < 7; i++){
      items.push(<div key={i} className="rain">
                    <div className="drop"></div>
                    <div className="waves">
                      <div></div>
                      <div></div>
                    </div>
                    <div className="splash"></div>
                    <div className="particles">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>)
    }
    let rai_drop= (<div className="container">{items}</div>)
    weather_feel = (< React.Fragment>
                        {rai_drop}
                    </React.Fragment>  )
  }
  if(initalWeatherFeel === 'haze'){
    weather_feel = (<div  className="containerCloud"><div className="fog"></div></div>)
  }
  if(initalWeatherFeel === 'cloudy'){
    weather_feel = (<div className="containerCloud">
                        <div className="cloud-intro"></div>
                      </div>)
  }
  if(initalWeatherFeel === 'snow'){
    let items = [];
    for(let i= 0 ;i < 10; i++){
      items.push(<div className="snowflake" key={i}>❅</div>)
    }
    weather_feel = (< React.Fragment>
                      <div className="containerCloud">
                        <div className="snowflakes" aria-hidden="true">
                          {items}                         
                        </div>
                      </div>
                    </React.Fragment>  )
  }

  return (<div className="App Site">
            <div className="Sitecontent">
              <div className="App-header">
                <Header />
              </div>
              <div className="main">
                <div className="containerBehind">
                  {weather_feel}
                </div>
                <Weather weatherFeel={weatherfeelHandler} />
              </div>
            </div>
            <Footer />
          </div>)
}

export default App;
