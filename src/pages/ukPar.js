import React, { useState, useEffect } from 'react';
import { useJsApiLoader } from "@react-google-maps/api";
import BigMap from './components/bigMap';
import Axios from 'axios'

const MAP_API_KEY = process.env.REACT_APP_MAP_API_KEY;

const UKPar = () => {

    const [postcode, setPostcode] = useState("G4 0BA");
    const [defaultCenter, setDefaultCentre] = useState({
        lat: 55.9520553,
        lng: -3.1749664
    });
    const [postcodeInput, setPostcodeInput] = useState("");
    const [ukPostcodeData, setUKPostcodeData] = useState({});
    const [ukConstituency, setUKConstituency] = useState({});
    const [contactDetails, setContactDetails] = useState({});
    const [portraitUrl, setPortraitUrl] = useState({});

    useEffect(() => {
        var id = ""
        console.log(postcode)
        Axios.get("https://api.postcodes.io/postcodes/" + postcode)
            .then((data) => {
                console.log(data)
                setUKPostcodeData(data)
                var lat = data.data.result.latitude
                var lng = data.data.result.longitude
                setDefaultCentre({ lat, lng })
                console.log(defaultCenter)
                return data
            }).then((constituency) => {
                return Axios.get("https://members-api.parliament.uk/api/Location/Constituency/Search?searchText=" + constituency?.data?.result?.parliamentary_constituency_2024 + "&skip=0&take=0")
            }).then((data) => {
                setUKConstituency(data)
                console.log(data)
                id = data?.data?.items[0].value?.currentRepresentation?.member?.value?.id
                return data
            }).then((memberData) => {
                return Axios.get("https://members-api.parliament.uk/api/Members/" + memberData?.data?.items[0].value?.currentRepresentation?.member?.value?.id + "/Contact")
            }).then((data) => {
                setContactDetails(data)
                console.log(data)
            }).then(() => {
                return Axios.get("https://members-api.parliament.uk/api/Members/" + id + "/PortraitUrl")
            }).then((data) => {
                setPortraitUrl(data)
                console.log(data)
            });
    }, [postcode]);

    const sumbitPostcode = () => {
        let result = postcodeInput.replace(/ /gi, "");
        setPostcode(result)
    }

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: MAP_API_KEY
    })

    return (
        <div>
            <div className='map-page'>
                {isLoaded ? <BigMap center={defaultCenter} /> : <h1>Loading...</h1>}
            </div>
            <div className='representitive-info'>
                <div className=''>
                    <div className="Search">
                        <div className="">
                            <h2>UK Parliament</h2>
                            <br />
                            <p className="text search-heading">Enter your postcode:</p>
                            <input className="Search-text" type="text" placeholder="Type here..." onChange={(e) => { setPostcodeInput(e.target.value) }}></input>
                            <button className="" onClick={sumbitPostcode}>Search</button>
                        </div>
                    </div>
                    <div className='fs-4 fw-bold text-black m-2'>{ukPostcodeData?.data?.result?.parliamentary_constituency_2024}</div>
                    <div className=''>
                        <br></br>
                        <table className='table table-bordered m-2'>
                            <tr>
                                <th>Representative Info:</th>
                            </tr>
                            <tr>
                                <th>Name</th>
                                <td>{ukConstituency?.data?.items[0]?.value?.currentRepresentation?.member?.value?.nameDisplayAs}</td>
                            </tr>
                            <tr>
                                <th>Party</th>
                                <td colSpan="3">{ukConstituency?.data?.items[0]?.value?.currentRepresentation?.member?.value?.latestParty?.name}</td>
                            </tr>
                            <tr>
                                <th>Email Address</th>
                                <td>{contactDetails?.data?.value[0]?.email}</td>
                            </tr>
                        </table>
                    </div>
                    <br></br>
                    <div className='d-flex flex-column justify-content-evenly w-100 h-100 bg-black p-4'>
                        <div id='representitive-image' className='fs-4 fw-bold text-white'>
                            <img className='d-flex flex-column justify-content-evenly w-100 h-25 p-4' src={portraitUrl?.data?.value} alt=""></img>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UKPar;