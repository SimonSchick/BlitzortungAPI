import { Location, Detector } from './Client';
import * as WebSocket from 'ws';
import { EventEmitter } from 'events';

export interface SocketFactory {
  make(url: string): WebSocket;
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
}

export interface GeoArea {
  from: GeoLocation;
  to: GeoLocation;
}

export const enum Polarity {
  Negative,
  Positive,
}

interface RawLocation {
  lat: number;
  lon: number;
  /**
    * altitude in meters.
    */
  alt: number;
}

interface RawDetector extends RawLocation {
  /**
    * Station ID.
    */
  sta: string;
  /**
    * Bitflag.
    */
  status: number;
  /**
    * Delay in nanoseconds.
    */
  time: number
}

interface RawStrike extends RawLocation {
  /**
    * Unix timestamp in nanoseconds
    */
  time: number;
  /**
    * Polarity, polarity, -1 or +1
    */
  pol: number;
  /**
    * Deviation.
    */
  mds: number;
  /**
    * Max circular gap
    */
  mcg: number;
  /**
    * List of detectors.
    */
  sig: RawDetector[];
  /**
    * In seconds.
    */
  delay: number;
}

export interface Location extends GeoLocation {
  altitude: number;
}

export interface Detector {
  /**
  * ID.
  */
  id: string;
  location: Location;
  /**
  * Unknown.
  */
  status: number;
  /**
  * Delay in nanoseconds.
  */
  delay: number
}

export interface Strike {
  location: Location;
  time: Date;
  detectors: Detector[];
  delay: number;
  deviation: number;
  polarity: Polarity;
  maxDeviation: number;
  maxCircularGap: number;
}

export class NotConnectedError extends Error {
  constructor(public readonly client: Client) {
    super('Client not connected');
  }
}

export interface Client {
  on(event: 'data', cb: (strike: Strike) => void): this;
  on(event: 'connect', cb: (socket: WebSocket) => void): this;
  on(event: 'error', cb: (error: Error) => void): this;

  once(event: 'data', cb: (strike: Strike) => void): this;
  once(event: 'connect', cb: (socket: WebSocket) => void): this;
  once(event: 'error', cb: (error: Error) => void): this;

  addListener(event: 'data', cb: (strike: Strike) => void): this;
  addListener(event: 'connect', cb: (socket: WebSocket) => void): this;
  addListener(event: 'error', cb: (error: Error) => void): this;
}

export class Client extends EventEmitter {
  private socket: WebSocket | undefined;

  constructor(private socketFactory: SocketFactory) {
    super();
  }

  public getSocket(): WebSocket | undefined {
    return this.socket;
  }

  /**
  * Connects to the remote API.
  */
  public connect() {
    const socket = this.socket = this.socketFactory.make('ws://ws.blitzortung.org:8060/');
    socket.on('message', (rawData: string) => {
      this.emit('data', this.buildStrikeData(JSON.parse(rawData)));
    });
    socket.on('open', () => {
      this.emit('connect', socket);
    });
    socket.on('error', err => this.emit('error', err));
  }

  /**
    * Closes the connection to the remote API and detaches all listeners.
    */
  public close() {
    if (!this.socket) {
      throw new NotConnectedError(this);
    }
    this.socket.close();
    this.removeAllListeners();
  }

  /**
    * Sets the geo area the API should send data for.
    * Please note that this does not affect the incoming data immediately.
    */
  public setArea(area: GeoArea) {
    if (!this.socket) {
      throw new NotConnectedError(this);
    }
    this.sendJSON({
      west: area.from.longitude,
      east: area.to.longitude,
      north: area.from.latitude,
      south: area.to.latitude
    });
  }

  /**
    * Requested the API include/omit any detector data.
    * Please note that this does not affect the incoming data immediately.
    */
  public setIncludeDetectors(include: boolean) {
    if (!this.socket) {
      throw new Error('Socket not connected');
    }
    this.sendJSON({
      sig: include,
    });
  }

  private processRawLocation(location: { lat: number; lon: number; alt: number }): Location {
    return {
      latitude: location.lat,
      longitude: location.lon,
      altitude: location.alt,
    };
  }

  private buildStrikeData(strike: RawStrike): Strike {
    return {
      location: this.processRawLocation(strike),
      deviation: strike.mds,
      delay: strike.delay,
      time: new Date(Math.floor(strike.time / 1e6)),
      detectors: strike.sig.map(rawDec => ({
        id: rawDec.sta,
        location: this.processRawLocation(rawDec),
        status: rawDec.status,
        delay: rawDec.time,
      })),
      polarity: strike.pol > 0 ? Polarity.Positive : Polarity.Negative,
      maxDeviation: strike.mds,
      maxCircularGap: strike.mcg,
    }
  }

  private sendJSON(data: any) {
    this.socket!.send(JSON.stringify(data));
  }
}
