import * as WebSocket from 'ws';
import { Client } from './src/Client';
import { locations } from './src/locations';

const c = new Client({
    make(address: string): WebSocket {
        return new WebSocket(address);
    }
});

c.connect();
c.getSocket()!.on('data', console.log);
c.on('error', console.error);
c.on('connect', () => {
    c.setIncludeDetectors(false);
    c.setArea(locations.global);
})
c.on('data', strike => console.log(strike));
