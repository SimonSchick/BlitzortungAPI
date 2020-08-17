import * as WebSocket from 'ws';
import { Client } from './src';

interface GeoPoint {
    latitude: number;
    longitude: number;
}

function degToRad(deg: number): number {
    return deg / 180 * Math.PI;
}

function sphericalDistance(pos1: GeoPoint, pos2: GeoPoint, radius: number) {
    const φ1 = degToRad(pos1.latitude);
    const φ2 = degToRad(pos2.latitude);
    const Δφ2 = degToRad(pos2.latitude - pos1.latitude) / 2;
    const Δλ2 = degToRad(pos2.longitude - pos1.latitude) / 2;

    const a = Math.sin(Δφ2) * Math.sin(Δφ2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ2) * Math.sin(Δλ2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return radius * c;
}

const myPos: GeoPoint = {
    latitude: 52.3024,
    longitude: 4.7618,
}

const c = new Client({
    make(address: string): WebSocket {
        return new WebSocket(address);
    }
});

c.connect();
c.on('error', console.error);
c.on('data', strike => {
    console.log({
        ...strike,
        distance: Math.round(sphericalDistance(myPos, strike.location, 6371))
    });
});
