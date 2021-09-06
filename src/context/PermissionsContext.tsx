import React, {createContext, useEffect, useState} from "react";
import {AppState, Platform} from "react-native";
import {check, openSettings, PERMISSIONS, PermissionStatus, request} from "react-native-permissions";

export  interface PermissionsState {
    locationStatus: PermissionStatus;
}

export const permissionInitState: PermissionsState= {
    locationStatus: 'unavailable',
}

type PermissionsContextProps = {
    permissions: PermissionsState;
    askLocationPermission: () => void;
    cheLocationPermission: () => void;
}

export const PermissionsContext= createContext({} as PermissionsContextProps);

export const PermissionsProvider= ({children}: any) => {

    const [permissions, setPermissions] = useState(permissionInitState);

    useEffect(() => {
        cheLocationPermission();

        AppState.addEventListener('change', state => {
            if (state !== 'active') return;

            cheLocationPermission();
        })
    }, []);

    const askLocationPermission= async () => {
        let permisionStatus: PermissionStatus;

        if (Platform.OS === 'ios') {
            permisionStatus= await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        }else {
            permisionStatus= await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        }

        if (permisionStatus === 'blocked') {
            openSettings();
        }

        setPermissions({
            ...permissions,
            locationStatus: permisionStatus,
        })
    }

    const cheLocationPermission= async () => {
        let permisionStatus: PermissionStatus;

        if (Platform.OS === 'ios') {
            permisionStatus= await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        }else {
            permisionStatus= await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        }

        setPermissions({
            ...permissions,
            locationStatus: permisionStatus,
        })
    }

    return (
        <PermissionsContext.Provider
            value={{
                permissions,
                askLocationPermission,
                cheLocationPermission
            }}
        >
            {children}
        </PermissionsContext.Provider>
    )
}
