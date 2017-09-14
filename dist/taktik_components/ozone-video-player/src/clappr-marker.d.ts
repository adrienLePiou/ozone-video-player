import * as ClapprMarkersPlugin from 'clappr-markers-plugin';
export declare type MarkerOnVideo = {
    time: number;
    duration: number;
};
export declare class ClapprMarkerFactory {
    parent: PolymerElement;
    constructor(parent: PolymerElement);
    createMarker(marker: MarkerOnVideo, index: number): ClapprMarkersPlugin.CropMarker;
}
