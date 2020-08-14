import React from 'react';
import './CityList.scss';

//If there are more than one city with similar name, modal opens up and displays the list of cities from here
const cityList = (props) => {
    let list_of_cities = props.listofcities.map(sd=>{
        let disp_text = sd.name + " " + (sd.state ? ", " +sd.state : "") + (sd.country ? ", " +sd.country : "")
        return (<span key={sd.id} onClick={()=>props.clicked(sd.id)}> {disp_text}</span>)
    })

    return (
        <React.Fragment>
            <div className="mainContainer">
                <div>Select the City</div>
                <div>{list_of_cities}</div>                
                <div>
                    <button  className="btn" onClick={props.cancelSearch}>Go Back</button>
                </div>
            </div>
        </React.Fragment>
    )  
};

export default cityList;

