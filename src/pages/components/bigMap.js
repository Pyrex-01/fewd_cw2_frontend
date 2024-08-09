import { GoogleMap, MarkerF } from '@react-google-maps/api';
import mapStyle from "./mapStyle";

const containerStyle = {
    width: '100%',
    height: '100%',
};

const defaultOptions = {
    mapTypeControl: false,
    streetViewControl: false,
    styles: mapStyle
}

const BigMap = ({ center }) => {

    return (
        <div className='map'>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={12}
                options={defaultOptions}>
                    <MarkerF key="default" position={center} />
            </GoogleMap>
        </div>
    )
}

export default BigMap;