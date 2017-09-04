import "polymer/polymer.html"

import './ozone-video-player.html';
import 'ozone-config/ozone-config.html';
import {customElement} from 'taktik-polymer-typeScript'


import {OzoneMediaUrl, OzonePreviewSize, SizeEnum} from 'ozone-media-url'
import {getClappr, ClapprType, ClapprPlayer, ClapprParam} from './taktik-clappr-wrapper'
import {Video} from 'ozone-type'



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

    private OzoneMediaUrl= OzoneMediaUrl; //Exposed for testing purpose



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
        }
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
            const url = mediaUrl.getVideoUrlMp4();
            const previewImage = mediaUrl.getPreviewUrl(OzonePreviewSize.Small);

            const param: ClapprParam = {
                source: url,
                poster: previewImage,
            };

            this.createPlayer(param);
        }
    }



    /**
     * Load a video from an url.
     * @param {string} url
     * @return {Promise<void>}
     */
    public async loadVideoUrl(url: string){
        const param: ClapprParam = {
            source: url,
        };
        this.createPlayer(param);
    }

    createPlayer(param: ClapprParam){
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
}

