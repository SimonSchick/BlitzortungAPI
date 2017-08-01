import * as WebSocket from 'ws';
import { Client } from './src/Client';

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
    c.setArea({
        latitude: 55.5,
        longitude: 2,
    },
    {
        latitude: 45.3,
        longitude: 18,
    });
})
c.on('data', strike => console.log(strike));
