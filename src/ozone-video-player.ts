import "polymer/polymer.html"

import './ozone-video-player.html';
import 'ozone-config/ozone-config.html';
import {customElement} from 'taktik-polymer-typeScript'


import {OzoneMediaUrl, OzonePreviewSize, SizeEnum} from 'ozone-media-url'
import {getClappr, ClapprType, ClapprPlayer, ClapprParam, getClapprRtmp} from './taktik-clappr-wrapper'
import {getClapprMarkersPlugin, MarkersPluginType, CropMarker} from './clappr-markers-plugin-wrapper'
import {Video} from 'ozone-type'


export type MarkerOnVideo = {
    time: number,
    duration: number,
}
/**
 * <ozone-video-player>
 */
@customElement('ozone-video-player')
export class OzoneVideoPlayer extends Polymer.Element{

    /**
     * Clappr player element
     */
    public player: ClapprPlayer | undefined;

    /**
     * Url to play a video directly
     */
    public videoUrl: string;

    /**
     * Ozone video to play
     */
    public video: Video;

    /**
     * Reference to ozone configuration
     */
    private config: {configPromise: Promise<ConfigType>};

    /**
     * hide element and pause the player.
     */
    public hidden: boolean;

    /**
     * default parameters apply to Clapper Player
     */
    public defaultClapprParameters: ClapprParam = {

        plugins: {
            playback: [getClapprRtmp()],
            core: [getClapprMarkersPlugin()],
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
            }
        }
    }
    static get observers(){
        return ['markersChange(markers.*)'];
    }

    markersChange(){
    }

    /**
     * Called on element ready
     * @return {Promise<void>}
     */
    async ready() {
        super.ready();

        this.config = getOzoneConfig();
    }

    /**
     * Load video from Ozone.
     * @param {Video} data
     * @return {Promise<void>}
     */
    public async loadOzoneVideo(data?: Video){
        const config = await (this.config.configPromise);

        if(data) {
            const mediaUrl = new this.OzoneMediaUrl(data.id as string, config);
            const url = await mediaUrl.getVideoUrl();
            const previewImage = mediaUrl.getPreviewUrlJpg(OzonePreviewSize.Small);

            const param: ClapprParam = Object.assign({
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

        const param: ClapprParam = Object.assign({
            source: url,
        }, this.defaultClapprParameters);
        this.createPlayer(param);
    }

    createPlayer(param: ClapprParam){
        this.destroy();
        const ClapprWrapper = getClappr();
        if(ClapprWrapper) {
            this.player = new (ClapprWrapper as ClapprType).Player(param);
            var playerElement = document.createElement('div');
            this.$.player.appendChild(playerElement);
            this.player.attachTo(playerElement);
        }
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
        if(this.player){
            this.player.destroy();
        }
    }

    buildMarker(marker: MarkerOnVideo, index: number): CropMarker{
        const myClapprMarkersPlugin =  getClapprMarkersPlugin();
        var aMarker = new myClapprMarkersPlugin.CropMarker(marker.time, marker.duration);

        //const element = this.$.element;
        const element = document.createElement('div');

        //this.element.classList.add('crop-marker');
        //const element = document.createElement('div');

        element.className = 'element';

        //this.$.container.appendChild(element)

        var resizer = document.createElement('div');
        resizer.className = 'resizer';
        resizer.style.right = '0';

        element.appendChild(resizer);
        resizer.addEventListener('mousedown', (e) => {
            initResize(e)
        }, false);
        var resizerL = document.createElement('div');
        resizerL.className = 'resizer';
        element.appendChild(resizerL);

        resizerL.addEventListener('mousedown', (e) => {
            initResizeLeft(e)
        }, false);


        element.addEventListener('mousedown', (e) => {
            initTranslate(e)
        }, false);

        const updateMarker= ()=> {
            this.set(`markers.${index}.duration`, aMarker.getDuration());
            this.set(`markers.${index}.time`, aMarker.getTime());
        };
        function initResize(e: Event)
        {
            console.log('STOP initResize')
            e.stopPropagation();
            window.addEventListener('mousemove', Resize, false);
            window.addEventListener('mouseup', stopResize, false);
        }
        function Resize(e: MouseEvent)
        {
            console.log('STOP Resize')
            e.stopPropagation();
            const movePx = (e.clientX - element.offsetLeft);
            const parentElement = element.parentElement as HTMLElement;
            const movePc = (movePx / parentElement.clientWidth) * 100;

            element.style.width = movePc + '%';
            updateMarker();
        }
        function stopResize(e: Event)
        {
            console.log('STOP stopResize')
            e.stopPropagation();
            window.removeEventListener('mousemove', Resize, false);
            window.removeEventListener('mouseup', stopResize, false);
        }

        function initResizeLeft(e: Event)
        {
            console.log('STOP initResizeLeft')
            e.stopPropagation();
            window.addEventListener('mousemove', ResizeLeft, false);
            window.addEventListener('mouseup', stopResizeLeft, false);
        }
        function ResizeLeft(e: MouseEvent)
        {
            console.log('STOP ResizeLeft')
            e.stopPropagation();
            let left = parseFloat(element.style.left || '');
            if (isNaN(left)) {
                left = 0;
            }
            const movePx = (e.clientX - element.offsetLeft);
            const parentElement = element.parentElement as HTMLElement;
            const movePc = (movePx / parentElement.clientWidth) * 100;

            element.style.left = left + movePc + '%';
            element.style.width =  parseFloat(element.style.width || '') -  movePc + '%';
            updateMarker();
        }
        function stopResizeLeft(e: Event)
        {
            console.log('STOP stopResizeLeft')
            e.stopPropagation();
            window.removeEventListener('mousemove', ResizeLeft, false);
            window.removeEventListener('mouseup', stopResizeLeft, false);
        }


        function initTranslate(e: Event)
        {
            console.log('STOP initTranslate')
            e.stopPropagation();
            window.addEventListener('mousemove', transtlate, false);
            window.addEventListener('mouseup', stopTranstlate, false);
        }
        function transtlate(e: MouseEvent )
        {
            console.log('STOP transtlate')
            e.stopPropagation();
            let left = parseFloat(element.style.left || '');
            if (isNaN(left)) {
                left = 0;
            }
            const movePx = (e.clientX - element.offsetLeft);
            const parentElement = element.parentElement as HTMLElement;
            const movePc = (movePx / parentElement.clientWidth) * 100;

            element.style.left = left + movePc + '%';
            updateMarker();
        }
        function stopTranstlate(e: Event)
        {
            console.log('STOP stopTranstlate')
            e.stopPropagation();
            window.removeEventListener('mousemove', transtlate, false);
            window.removeEventListener('mouseup', stopTranstlate, false);
        }
        aMarker._$marker = element;
        return aMarker;
    }

    addMarker(videoMarker: MarkerOnVideo) {
        if (this.player) {
            this.push('markers', videoMarker);
            const aMarker = this.buildMarker(videoMarker, this.markers.length -1);
            const markersPlugin = this.player.getPlugin('markers-plugin') as MarkersPluginType;
            markersPlugin.addMarker(aMarker);
        }
    };

    removeMarker(id: number) {
        if (this.player) {
            const markersPlugin = this.player.getPlugin('markers-plugin') as MarkersPluginType;
            const marker = markersPlugin.getByIndex(id);
            markersPlugin.removeMarker(marker);
            this.splice('markers', id, 1);
        }
    };

    clearMarkers() {
        if (this.player) {
            const markersPlugin = this.player.getPlugin('markers-plugin') as MarkersPluginType;
            markersPlugin.clearMarkers();
            this.set('markers',[]);
        }
    };

    getSelectedChunks(updateToFitHlsChunk=false):Array<Array<string>> | null{
        if (this.player) {
            const markersPlugin = this.player.getPlugin('markers-plugin') as MarkersPluginType;
            return markersPlugin.getAll()
                .map((marker, index) => {
                    const markerC = marker as CropMarker;
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

