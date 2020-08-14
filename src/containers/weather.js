import React, { Component } from 'react';
import Input from '../components/Input/Input';
import axios from 'axios';
import './weather.scss';
import './Weather_search.scss';
import cityList from '../assets/city.list.min.json';
import Card from '../components/Card/Card';
import Modal from '../components/UI/Modal/Modal';
import CityList from '../components/CityList/CityList';


class Weather extends Component {
    state = {
        city : "",
        cityId : null,
        searchedData : {},
        weather : {},
        search_classes : ["search"],
        selectFrommultipleCity: false,
        focusInput : false
    }

    //Get the sunrise and sunset into the local time
    get_sun_time = (time,timezone) => {
        let newDate = window.moment.unix(time).utcOffset(timezone/60).format('HH:mm');
        return newDate;
    }

    //Get the temperature into degree celcius
    get_temperature = temp =>{
        //For fehr - let fahrenheit = Math.round(((parseFloat(data.main.temp)-273.15)*1.8)+32); 
        return Math.round(parseFloat(temp)-273.15)
    }

    //Set the state for the provided city's weather
    designTheWeather = (data)=> {
        let celcius = this.get_temperature(data.main.temp);
        let feels_like = this.get_temperature(data.main.feels_like);
        let min_temp = this.get_temperature(data.main.temp_min);
        let max_temp = this.get_temperature(data.main.temp_max);
        let sunrise = this.get_sun_time(data.sys.sunrise,data.timezone);
        let sunset = this.get_sun_time(data.sys.sunset,data.timezone);
        this.setState({weather : { sunrise: sunrise, celcius: celcius, sunset : sunset,
                                    min_temp : min_temp, max_temp: max_temp,
                                    city: data.name, country: data.sys.country,
                                    humidity : data.main.humidity, visibility : (data.visibility/ 1000),
                                   feels_like : feels_like, description: data.weather[0].description}})
    }
    
    //Two way binding for the city name input
    findCityWeather = (evt) =>{
        this.setState({city : evt.target.value})
    }

    //Search display
    searchCityWeather = () =>{
        const new_data = cityList.filter(data =>{
            return data.name.toLowerCase() === this.state.city.toLowerCase()
        })
       this.setState({searchedData : new_data, cityId : '', city: ''})
       this.props.weatherFeel('')
       if(new_data.length === 1 ){
            this.setState({cityId : new_data[0].id});
            axios.get('https://api.openweathermap.org/data/2.5/weather?id='+ new_data[0].id +'&appid='+ process.env.REACT_APP_OPEN_WEATHER_API_KEY)
            .then(response =>{
                console.log(response.data)
                if(response.data.weather[0].main === "Rain") this.props.weatherFeel('rain')
                else if(response.data.weather[0].main === "Cloudy" || response.data.weather[0].main === "Clouds") this.props.weatherFeel('cloudy')
                else if(response.data.weather[0].main === "Snow") this.props.weatherFeel('snow')
                else if(response.data.weather[0].main === "Haze" || response.data.weather[0].main === "Mist") this.props.weatherFeel('haze')
                else this.props.weatherFeel('sunny')
                this.designTheWeather(response.data)
            }).catch((err)=>{
                console.log(err)
            })
       }else if(new_data.length !== 0){
           this.setState({selectFrommultipleCity : true})
       }
    }

    //When multiple city name's are found and use selects the one, execute this to show the weather
    selectCityHandler = (city_id)=>{
        this.setState({cityId : city_id, searchedData : [], selectFrommultipleCity : false});
        axios.get('https://api.openweathermap.org/data/2.5/weather?id='+ city_id +'&appid='+ process.env.REACT_APP_OPEN_WEATHER_API_KEY)
        .then(response =>{
            this.designTheWeather(response.data)
            if(response.data.weather[0].main === "Rain") this.props.weatherFeel('rain')
            else if(response.data.weather[0].main === "Cloudy" || response.data.weather[0].main === "Clouds") this.props.weatherFeel('cloudy')
            else if(response.data.weather[0].main === "Snow") this.props.weatherFeel('snow')
            else if(response.data.weather[0].main === "Haze" || response.data.weather[0].main === "Mist") this.props.weatherFeel('haze')
            else this.props.weatherFeel('sunny')
        }).catch((err)=>{
            console.log(err)
        })
    }

    toggleSearchButton = () =>{
        //User is searching for the input and has clicked the search button
        if(this.state.search_classes.length > 1){
            this.setState({search_classes : ["search"], focusInput : false})
            this.searchCityWeather();
        }else{
            this.setState({search_classes : ["search","open"], focusInput : true})
        }
    }

    closeselectCityHandler = () =>{
        this.setState({selectFrommultipleCity : false})
    }

    render () {
        let citylist = null;

        //Default display- when there is no city selected.
        let display_weather_info = (<div className="defaultDiv">
                                        <span role="img" aria-label="none" className="emojiStyle">&#128522;</span>
                                        <span className="empjitext">Please find the location to check the weather.</span>
                                    </div>);

        //Display list of possible cities when there is more than one city possible with that name                            
        if(this.state.searchedData.length > 1){
            citylist = <CityList listofcities={this.state.searchedData} clicked={this.selectCityHandler} cancelSearch={this.closeselectCityHandler} />
        }

        //Display the weather information for the selected city
        if(this.state.cityId){
            display_weather_info = <Card temperature={this.state.weather.celcius} description={this.state.weather.description} sunset={this.state.weather.sunset}
                                            sunrise={this.state.weather.sunrise} visibility={this.state.weather.visibility} humidity={this.state.weather.humidity}
                                            feels_like={this.state.weather.feels_like}
                                        min_temp={this.state.weather.min_temp} max_temp={this.state.weather.max_temp}
                                        country={this.state.weather.country} name={this.state.weather.city}   />
        }

        return (
            <div>
                 <Modal show={this.state.selectFrommultipleCity} modalClosed={this.closeselectCityHandler}>
                    {citylist}
                </Modal>
                <div className="Wrap">
                    <div className={this.state.search_classes.join(' ')}>
                        <Input name="City Name" type="text" focusInput={this.state.focusInput} placeholder="City Name" cityname={this.state.city} changed={this.findCityWeather} />
                        <span className="search-button" onClick={this.toggleSearchButton} >
                            <span className="search-icon"></span>
                        </span>
                    </div>
                   {display_weather_info}
                </div>               
            </div>
        );
    }
}

export default Weather;