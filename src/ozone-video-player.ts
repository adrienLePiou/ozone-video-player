import "polymer/polymer.html"
import './ozone-video-player.html';
import * as Config from 'ozone-config';
import {customElement} from 'taktik-polymer-typescript'
import * as Clappr from 'Clappr'
import * as ClapprMarkersPlugin from 'clappr-markers-plugin'
import * as ClapprSubtitle from './Clappr-Subtitle'
import {ClapprMarkerFactory, MarkerOnVideo} from './clappr-marker'
import {OzoneMediaUrl, OzonePreviewSize, SizeEnum} from 'ozone-media-url'
import {Video} from 'ozone-type'
import{ozoneApiMediaplay, ReportInterval_ms} from './ozone-api-mediaplay'



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
            core: [ClapprMarkersPlugin, ClapprSubtitle.ClapprSubtitle],
        },
        markersPlugin: {
            markers: [],
        },
        subtitle :{
            auto : true, // automatically loads subtitle
            backgroundColor : 'transparent',
            fontWeight : 'normal',
            fontSize : '14px',
            color: 'yellow',
            textShadow : '1px 1px #000'
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

    subtitlesAvailable: Array<string>;
    subtitleSelected: string;
    private _subtitles: Map<string, object> = new Map();


    private _intervalReporter?:number;
    private _videoPlaying?: Video;


    $:{
        player: HTMLElement
    };

    static get properties() {
        return {
            hidden: {
                type: Boolean,
                value: false,
                observer: 'visibilityChange'
            },
            player: {
                type: Object,
                value: false,
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

    async subtitleSelectedChange(subtitle:string){
        if(subtitle && this.player){
            const config = await (Config.OzoneConfig.get());
            const mediaUrl = new this.OzoneMediaUrl(this.video.subtitles[this.subtitleSelected] as string, config);
            if(this.player.options.subtitle) {
                const plugin = this.player.getPlugin('subtitle-plugin');
                plugin.options.src = mediaUrl.getOriginalFormat()
                plugin.initSubtitle();
            }
        }

    }

    addConfigSubtitle(video:Video, config:Config.ConfigType){

        if(this.subtitleSelected && this._subtitles.has(this.subtitleSelected)) {

            const mediaUrl = new this.OzoneMediaUrl(video.subtitles[this.subtitleSelected] as string, config);
            this.defaultClapprParameters.subtitle.src = mediaUrl.getOriginalFormat();
        } else {

            this.defaultClapprParameters.subtitle.src = null
        }
        return this.defaultClapprParameters

    }
    private _updateSubtitlesAvailable(video:Video ){

        if(video.subtitles){
            for(let s in  video.subtitles){
                this._subtitles.set(s, video.subtitles[s])
                this.push('subtitlesAvailable',s);
            }
        } else{
            this._subtitles.clear();
            this.set('subtitlesAvailable', [])
        }
    }
    /**
     * Load video from Ozone.
     * @param {Video} data
     * @return {Promise<void>}
     */
    public async loadOzoneVideo(data?: Video){
        const config = await (Config.OzoneConfig.get());

        if(data) {
            this._videoPlaying = data;
            this._updateSubtitlesAvailable(data);
            const mediaUrl = new this.OzoneMediaUrl(data.id as string, config);
            const url = await mediaUrl.getVideoUrl();
            const previewImage = mediaUrl.getPreviewUrlJpg(OzonePreviewSize.Small);

            const clapprConfig = this.addConfigSubtitle(data, config)

            const param: Clappr.ClapprParam = Object.assign({
                source: url,
                poster: previewImage,
            }, clapprConfig);

            this.createPlayer(param);

            this.intervalReporter = window.setInterval(()=>{
                this.reportUsage();
            }, ReportInterval_ms);
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

    private set intervalReporter(interval:number| undefined){
        if (this._intervalReporter){
            clearInterval(this._intervalReporter);
        }
        this._intervalReporter = interval;
    }
    private get intervalReporter ():number | undefined {
        return this._intervalReporter;
    }

    reportUsage(){
        if(this._videoPlaying && this.player && this.player.isPlaying())
            ozoneApiMediaplay.reportMediaUsage(this._videoPlaying);
    }

    createPlayer(param: Clappr.ClapprParam){
        this.destroy();
        this.player = new Clappr.Player(param);
        var playerElement = document.createElement('div');
        this.$.player.appendChild(playerElement);
        this.player.attachTo(playerElement);

        this.player.on(Clappr.Events.PLAYER_PLAY, ()=> {
            this.reportUsage();
        })
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
        this.intervalReporter = undefined;
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

