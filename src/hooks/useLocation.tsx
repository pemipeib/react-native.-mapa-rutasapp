import {useEffect, useRef, useState} from "react";
import Geolocation from "@react-native-community/geolocation";

import {Location} from "../interfaces/appInterfaces";


export const useLocation = () => {

    const [hasLocation, setHasLocation] = useState(false);
    const [routeLines, setRouteLines] = useState<Location[]>([]);
    const [initialPosition, setInitialPosition] = useState<Location>({
        latitude: 0,
        longitude: 0
    });
    const [userLocation, setUserLocation] = useState<Location>({
        latitude: 0,
        longitude: 0
    });

    const watchId = useRef<number>();
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current= true

        return () => {
            isMounted.current= false
        };
    }, []);


    useEffect(() => {
        getCurrentLocation()
            .then( location => {

                if (!isMounted) return;

                setInitialPosition(location);
                setUserLocation(location);
                setRouteLines(routes => [...routes, location]);
                setHasLocation(true);
            });

    }, []);

    const getCurrentLocation = (): Promise<Location> => {
        return new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition(
                ({coords})=> {
                    resolve({
                        latitude: coords.latitude,
                        longitude: coords.longitude
                    });

                }, // OK
                error => reject({error}), // Error
                { enableHighAccuracy:true, timeout:20000, maximumAge: 1000 } //Opciones
            ) ;
        })
    }

    const followUserLocation = () => {
       watchId.current= Geolocation.watchPosition(
            ({coords})=> {

                if (!isMounted) return;

                const location: Location = {
                    latitude: coords.latitude,
                    longitude: coords.longitude
                }
                setUserLocation(location);
                setRouteLines(routes => [...routes, location]);
            }, // OK
            error => console.log({error}), // Error
            { enableHighAccuracy:true, distanceFilter: 10, } //Opciones
        );
    }

    const stopFollowUserLocation = () => {
        if (watchId.current)
            Geolocation.clearWatch(watchId.current)
    }

    return {
        hasLocation,
        initialPosition,
        userLocation,
        routeLines,
        getCurrentLocation,
        followUserLocation,
        stopFollowUserLocation,
    }
};
