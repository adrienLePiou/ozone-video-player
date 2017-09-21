import "polymer/polymer.html";
import './ozone-video-player.html';
import * as Config from 'ozone-config';
import * as Clappr from 'Clappr';
import * as ClapprMarkersPlugin from 'clappr-markers-plugin';
import { MarkerOnVideo } from './clappr-marker';
import { Video } from 'ozone-type';
export declare type MarkerOnVideo = MarkerOnVideo;
/**
 * <ozone-video-player>
 */
export declare class OzoneVideoPlayer extends Polymer.Element {
    /**
     * Clappr player element
     */
    player: Clappr.Player | undefined;
    /**
     * Url to play a video directly
     */
    videoUrl: string;
    /**
     * Ozone video to play
     */
    video: Video;
    /**
     * hide element and pause the player.
     */
    hidden: boolean;
    /**
     * default parameters apply to Clapper Player
     */
    defaultClapprParameters: Clappr.ClapprParam;
    private OzoneMediaUrl;
    markers: Array<MarkerOnVideo>;
    private _markerFactory?;
    private readonly markerFactory;
    subtitlesAvailable: Array<string>;
    subtitleSelected: string;
    private _subtitles;
    private _intervalReporter?;
    private _videoPlaying?;
    $: {
        player: HTMLElement;
    };
    static readonly properties: {
        hidden: {
            type: BooleanConstructor;
            value: boolean;
            observer: string;
        };
        player: {
            type: ObjectConstructor;
            value: boolean;
        };
        videoUrl: {
            type: StringConstructor;
            observer: string;
        };
        video: {
            type: ObjectConstructor;
            observer: string;
        };
        markers: {
            type: ArrayConstructor;
            notify: boolean;
            value: () => never[];
        };
        subtitlesAvailable: {
            type: ArrayConstructor;
            notify: boolean;
            value: () => never[];
        };
        subtitleSelected: {
            type: StringConstructor;
            observer: string;
        };
    };
    static readonly observers: string[];
    markersChange(): void;
    subtitleSelectedChange(subtitle: string): Promise<void>;
    addConfigSubtitle(video: Video, config: Config.ConfigType): Clappr.ClapprParam;
    private _updateSubtitlesAvailable(video);
    /**
     * Load video from Ozone.
     * @param {Video} data
     * @return {Promise<void>}
     */
    loadOzoneVideo(data?: Video): Promise<void>;
    /**
     * Load a video from an url.
     * @param {string} url
     * @return {Promise<void>}
     */
    loadVideoUrl(url: string): Promise<void>;
    private intervalReporter;
    reportUsage(): void;
    createPlayer(param: Clappr.ClapprParam): void;
    private visibilityChange();
    private videoUrlChange(url?);
    private videoChange(video?);
    destroy(): void;
    buildMarker(marker: MarkerOnVideo, index: number): ClapprMarkersPlugin.CropMarker;
    addMarker(videoMarker: MarkerOnVideo): void;
    removeMarker(id: number): void;
    clearMarkers(): void;
    getSelectedChunks(updateToFitHlsChunk?: boolean): Array<Array<string>> | null;
}
