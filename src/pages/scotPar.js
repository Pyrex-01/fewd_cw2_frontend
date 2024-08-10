import React, { useState, useEffect } from 'react';
import { useJsApiLoader } from "@react-google-maps/api";
import BigMap from './components/bigMap';
import Axios from 'axios'

const MAP_API_KEY = process.env.REACT_APP_MAP_API_KEY;

const ScotPar = () => {

    const [postcode, setPostcode] = useState("G4 0BA");
    const [defaultCenter, setDefaultCentre] = useState({
        lat: 55.9520553,
        lng: -3.1749664
    });
    const [postcodeInput, setPostcodeInput] = useState("");
    const [scotPostcodeData, setScotPostcodeData] = useState({});
    const [scotConstituency, setScotConstituency] = useState([]);
    const [membersConstituency, setMembersConstituency] = useState([]);
    const [memberDetails, setMemberDetails] = useState({});
    const [memberEmail, setMemberEmail] = useState({});
    const [memberParty, setMemberParty] = useState({});

    useEffect(() => {
        var constCode = ""
        var constId = {}
        var repId = {}
        var partyId = {}
        console.log(postcode)
        Axios.get("https://api.postcodes.io/postcodes/" + postcode)
            .then((data) => {
                console.log(data)
                if (data.data.result.country === "Scotland") {
                var lat = data.data.result.latitude
                var lng = data.data.result.longitude
                setDefaultCentre({ lat, lng })
                console.log(defaultCenter)
                }
            }).then(() => {
                return Axios.get("https://api.postcodes.io/scotland/postcodes/" + postcode)
            }).then((data) => {
                setScotPostcodeData(data)
                console.log(data)
                constCode = data?.data?.result?.codes?.scottish_parliamentary_constituency
            }).then(() => {
                return Axios.get("https://data.parliament.scot/api/constituencies")
            }).then((data) => {
                console.log(data.data)
                let response = data.data
                console.log("ConstCode: " + constCode)
                constId = response.filter(o => {return (o.ConstituencyCode === constCode && o.ValidUntilDate === null)})
                setScotConstituency(constId[0])
                console.log(constId[0])
            }).then(() => {
                return Axios.get("https://data.parliament.scot/api/MemberElectionConstituencyStatuses")
            }).then((data) => {
                console.log(data)
                let response = data.data
                repId = response.find(o => {return (o.ConstituencyID === constId[0].ID && o.ValidUntilDate === null)})
                setMembersConstituency(repId)
                console.log(repId)
                return repId
            }).then((repId) => {
                return Axios.get("https://data.parliament.scot/api/members/" + repId.PersonID)
            }).then((data) => {
                setMemberDetails(data.data)
                console.log(data.data)
            }).then(() => {
                return Axios.get("https://data.parliament.scot/api/emailaddresses")
            }).then((data) => {
                console.log(data.data)
                let response = data.data
                let member = response.find(o => {return (o.PersonID === repId.PersonID && o.IsDefault === true)})
                console.log(member)
                setMemberEmail(member)
            }).then(() => {
                return Axios.get("https://data.parliament.scot/api/memberparties")
            }).then((data) => {
                console.log(data.data)
                let response = data.data
                partyId = response.find(o => {return (o.PersonID === repId.PersonID && o.ValidUntilDate === null)})
                return partyId
            }).then((id) => {
                return Axios.get("https://data.parliament.scot/api/parties/" + id.PartyID)
            }).then((data) => {
                setMemberParty(data.data)
                console.log(data.data)
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
                        <h2>Scottish Parliament</h2>
                            <br />
                            <p className="text search-heading">Enter your postcode:</p>
                            <input className="Search-text" type="text" placeholder="Type here..." onChange={(e) => { setPostcodeInput(e.target.value) }}></input>
                            <button className="" onClick={sumbitPostcode}>Search</button>
                        </div>
                    </div>
                    <div className='fs-4 fw-bold text-black m-2'>{scotPostcodeData?.data?.result?.scottish_parliamentary_constituency}</div>
                    <div className=''>
                        <br></br>
                        <table className='table table-bordered m-2'>
                            <tr>
                                <th>Representative Info:</th>
                            </tr>
                            <tr>
                                <th>Name</th>
                                <td>{memberDetails?.ParliamentaryName}</td>
                            </tr>
                            <tr>
                                <th>Party</th>
                                <td colSpan="3">{memberParty?.ActualName}</td>
                            </tr>
                            <tr>
                                <th>Email Address</th>
                                <td>{memberEmail?.Address}</td>
                            </tr>
                        </table>
                    </div>
                    <br></br>
                    <div className='d-flex flex-column justify-content-evenly w-100 h-100 bg-black p-4'>
                        <div id='representitive-image' className='fs-4 fw-bold text-white'>
                            <img className='d-flex flex-column justify-content-evenly w-100 h-25 p-4' src={memberDetails?.PhotoURL} alt=""></img>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ScotPar;