import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyDFpCCXIx9aPrjOrae7Laa_a1MCryxnjKc");

Geocode.setRegion("br");
Geocode.enableDebug();

export const getLatLongFromAddress = (address) => {
    return new Promise((resolve, reject) => {
        Geocode.fromAddress(address).then(
            response => {
                const { lat, lng } = response.results[0].geometry.location;
                console.log(lat, lng);
                resolve({ lat, lng })
            },
            error => {
                reject(error);
            }
        );
    })

}
/*
Geocode.fromLatLng("48.8583701", "2.2922926").then(
    response => {
        const address = response.results[0].formatted_address;
        console.log(address);
    },
    error => {
        console.error(error);
    }
);
*/