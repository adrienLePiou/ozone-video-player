import "polymer/polymer.html";
import './ozone-edit-video.html';
import 'taktik-polymer-typeScript/type';
import { CropMarker } from './clappr-markers-plugin-wrapper';
import { ClapprPlayer } from 'taktik-clappr-wrapper';
export declare class VideoArea {
    time: number;
    duration: number;
}
export declare type VideoMarker = Array<VideoArea>;
/**
 * <ozone-edit-video>
 */
export declare class OzoneEditVideo extends Polymer.Element {
    /**
     * videoMarker ozone marker object
     */
    videoMarker: VideoMarker;
    /**
     * Clappr player element
     */
    player: ClapprPlayer | undefined;
    videoUrl: string;
    static readonly properties: {
        player: {
            type: ObjectConstructor;
            value: boolean;
        };
        videoUrl: {
            type: StringConstructor;
        };
    };
    ready(): void;
    buildMarker(time: number, duration: number): CropMarker;
    loadVideo(data?: any): Promise<void>;
}
