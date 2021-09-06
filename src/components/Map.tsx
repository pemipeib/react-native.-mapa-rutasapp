import React, {useEffect, useRef, useState} from 'react';
import MapView, {Marker, Polyline} from "react-native-maps";
import {useLocation} from "../hooks/useLocation";
import LoadingScreen from "../pages/LoadingScreen";
import Fab from "./Fab";
import Geolocation from "@react-native-community/geolocation";

interface Props {
    markers?: Marker[];
}

const Map = ({markers}: Props) => {

    const [showPolyline, setShowPolyline] = useState(true);

    const {
        hasLocation,
        initialPosition,
        userLocation,
        routeLines,
        getCurrentLocation,
        followUserLocation,
        stopFollowUserLocation,
    }= useLocation();

    const mapViewRef = useRef<MapView>();
    const following = useRef<boolean>(true);

    useEffect(() => {
        followUserLocation();

        return () => {
            stopFollowUserLocation();
        }
    }, []);

    useEffect(() => {
        if (!following.current) return;

        const {latitude, longitude}= userLocation;

        mapViewRef.current?.animateCamera({
            center: {latitude, longitude}
        });
    }, [userLocation]);



    const centerPosition= async () => {
        const {latitude, longitude}= await getCurrentLocation();

        following.current = true;

        mapViewRef.current?.animateCamera({
            center: {latitude, longitude}
        });
    }

    if (!hasLocation) {
        return <LoadingScreen />

    }

    return (
        <>
            <MapView
                ref={(el) => mapViewRef.current = el!}
                style={{flex: 1}}
                showsUserLocation
                initialRegion={{
                    latitude: initialPosition.latitude,
                    longitude: initialPosition.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onTouchStart={() => following.current= false}
            >

                {
                    showPolyline && (
                        <Polyline
                            coordinates={routeLines}
                            strokeColor="black"
                            strokeWidth={3}
                        />
                    )
                }

                {/*<Marker*/}
                {/*    image={require('../assets/img/custom-marker.png')}*/}
                {/*    coordinate={{*/}
                {/*        latitude: 38.96991897719092,*/}
                {/*        longitude: -0.18771161591105637,*/}
                {/*    }}*/}
                {/*    title="Hola lucas"*/}
                {/*    description="Descripción"*/}
                {/*/>*/}

            </MapView>

            <Fab
                iconName="compass-outline"
                onPress={centerPosition}
                style={{
                    position: 'absolute',
                    bottom: 20,
                    right: 20
                }}
            />
            <Fab
                iconName="brush-outline"
                onPress={() => setShowPolyline(!showPolyline)}
                style={{
                    position: 'absolute',
                    bottom: 80,
                    right: 20
                }}
            />
        </>
    );
};

export default Map;
