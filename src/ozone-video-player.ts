import "polymer/polymer.html"

import './ozone-video-player.html';
import * as Config from 'ozone-config';
import {customElement} from 'taktik-polymer-typeScript'
import * as Clappr from 'Clappr'
import * as RTMP from 'clappr-rtmp-plugin'
import * as ClapprMarkersPlugin from 'clappr-markers-plugin'
import * as ClapprSubtitle from './Clappr-Subtitle'
import {ClapprMarkerFactory, MarkerOnVideo} from './clappr-marker'
import {OzoneMediaUrl, OzonePreviewSize, SizeEnum} from 'ozone-media-url'
import {Video} from 'ozone-type'


export type MarkerOnVideo = MarkerOnVideo;
/**
 * <ozone-video-player>
 */
@customElement('ozone-video-player')
export class OzoneVideoPlayer extends Polymer.Element{

    /**
     * Clappr player element
     */
    public player: Clappr.Player | undefined;

    /**
     * Url to play a video directly
     */
    public videoUrl: string;

    /**
     * Ozone video to play
     */
    public video: Video;

    /**
     * hide element and pause the player.
     */
    public hidden: boolean;

    /**
     * default parameters apply to Clapper Player
     */
    public defaultClapprParameters: Clappr.ClapprParam = {

        plugins: {
            playback: [RTMP],
            core: [ClapprMarkersPlugin],
        },
        //parentId: "#player",
        rtmpConfig: {
            scaling:'stretch',
            playbackType: 'live',
            bufferTime: 1,
            startLevel: 0,
            switchRules: {
                "SufficientBandwidthRule": {
                    "bandwidthSafetyMultiple": 1.15,
                    "minDroppedFps": 2
                },
                "InsufficientBufferRule": {
                    "minBufferLength": 2
                },
                "DroppedFramesRule": {
                    "downSwitchByOne": 10,
                    "downSwitchByTwo": 20,
                    "downSwitchToZero": 24
                },
                "InsufficientBandwidthRule": {
                    "bitrateMultiplier": 1.15
                }
            }
        },
        markersPlugin: {
            markers: [],
        }
        //mimeType : "application/vnd.apple.mpegurl",
    };

    private OzoneMediaUrl= OzoneMediaUrl; //Exposed for testing purpose

    markers: Array<MarkerOnVideo>;

    private _markerFactory?: ClapprMarkerFactory;
    private get markerFactory(): ClapprMarkerFactory{
        if(! this._markerFactory)
            this._markerFactory = new ClapprMarkerFactory(this);
        return this._markerFactory;
}

    subtitlesAvailable: Array<object>;
    subtitleSelected: string;
    private _subtitles: Map<string, object>;


    $:{
        player: HTMLElement
    };

    static get properties() {
        return {
            hidden: {
                type: Boolean,
                letue: false,
                observer: 'visibilityChange'
            },
            player: {
                type: Object,
                letue: false,
            },
            videoUrl: {
                type: String,
                observer: 'videoUrlChange'
            },
            video:{
                type: Object,
                observer: 'videoChange'
            },
            markers:{
                type:Array,
                notify: true,
                value:()=> [],
            },
            subtitlesAvailable:{
                type:Array,
                notify: true,
                value:()=> [],
            },
            subtitleSelected: {
                type: String,
                observer: 'subtitleSelectedChange'
        },
        }
    }
    static get observers(){
        return ['markersChange(markers.*)'];
    }

    markersChange(){
    }

    subtitleSelectedChange(subtitleSelected?:string){
        if(subtitleSelected && this._subtitles.has(subtitleSelected)){

        }
    }
    private _updateSubtitlesAvailable(video:Video ){


    }
    /**
     * Load video from Ozone.
     * @param {Video} data
     * @return {Promise<void>}
     */
    public async loadOzoneVideo(data?: Video){
        const config = await (Config.OzoneConfig.get());

        if(data) {
            const mediaUrl = new this.OzoneMediaUrl(data.id as string, config);
            const url = await mediaUrl.getVideoUrl();
            const previewImage = mediaUrl.getPreviewUrlJpg(OzonePreviewSize.Small);

            const param: Clappr.ClapprParam = Object.assign({
                source: url,
                poster: previewImage
            }, this.defaultClapprParameters);

            this.createPlayer(param);
        }
    }



    /**
     * Load a video from an url.
     * @param {string} url
     * @return {Promise<void>}
     */
    public async loadVideoUrl(url: string){

        const param: Clappr.ClapprParam = Object.assign({
            source: url,
        }, this.defaultClapprParameters);
        this.createPlayer(param);
    }

    createPlayer(param: Clappr.ClapprParam){
        this.destroy();
        this.player = new Clappr.Player(param);
        var playerElement = document.createElement('div');
        this.$.player.appendChild(playerElement);
        this.player.attachTo(playerElement);
    }

    private visibilityChange(){
        if(this.hidden && this.player){
            this.player.pause();
        }
    }

    private videoUrlChange(url? : string){
        if (url){
            this.loadVideoUrl(url);
        }
    }
    private videoChange(video? : Video){
        if (video){
            this.loadOzoneVideo(video);
        }
    }

    public destroy():void{
        this.set('markers',[]);
        if(this.player){
            this.player.destroy();
        }
    }

    buildMarker(marker: MarkerOnVideo, index: number): ClapprMarkersPlugin.CropMarker{
        return this.markerFactory.createMarker(marker, index);
    }

    addMarker(videoMarker: MarkerOnVideo) {
        if (this.player) {
            this.push('markers', videoMarker);
            const aMarker = this.buildMarker(videoMarker, this.markers.length -1);
            const markersPlugin = this.player.getPlugin('markers-plugin') as ClapprMarkersPlugin.MarkersPluginType;
            markersPlugin.addMarker(aMarker);
        }
    };

    removeMarker(id: number) {
        if (this.player) {
            const markersPlugin = this.player.getPlugin('markers-plugin') as ClapprMarkersPlugin.MarkersPluginType;
            const marker = markersPlugin.getByIndex(id);
            markersPlugin.removeMarker(marker);
            this.splice('markers', id, 1);
        }
    };

    clearMarkers() {
        if (this.player) {
            const markersPlugin = this.player.getPlugin('markers-plugin') as ClapprMarkersPlugin.MarkersPluginType;
            markersPlugin.clearMarkers();
            this.set('markers',[]);
        }
    };

    getSelectedChunks(updateToFitHlsChunk=false):Array<Array<string>> | null{
        if (this.player) {
            const markersPlugin = this.player.getPlugin('markers-plugin') as ClapprMarkersPlugin.MarkersPluginType;
            return markersPlugin.getAll()
                .map((marker, index) => {
                    const markerC = marker as ClapprMarkersPlugin.CropMarker;
                    const selectedChunks = markerC.getHlsFragments(updateToFitHlsChunk);
                    if(updateToFitHlsChunk) {
                        this.set(`markers.${index}.duration`, markerC.getDuration());
                        this.set(`markers.${index}.time`, markerC.getTime());
                    }
                    return selectedChunks;
                })
        }
        return null;
    }
}

