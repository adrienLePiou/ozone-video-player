import "polymer/polymer.html"

import './ozone-video-player.html';
import '../bower_components/ozone-config/ozone-config.html';
import 'taktik-polymer-typeScript/type';
import {customElement} from 'taktik-polymer-typeScript'
import {getClapprMarkersPlugin, MarkersPluginType, CropMarker} from './clappr-markers-plugin-wrapper'

import {MediaUrl, OzonePreviewSize, SizeEnum} from './ozone-media-url'
import {getPlayer, ClapprType, ClapprPlayer} from 'taktik-clappr-wrapper'
import {Video} from 'ozone-type'

/**
 * <ozone-video-player>
 */
@customElement('ozone-video-player')
export class ozoneVideoPlayer extends Polymer.Element{

    /**
     * Clappr player element
     */
    public player: ClapprPlayer | undefined;

    /**
     * Url to play a video directly
     */
    public videoUrl: string;

    /**
     * Reference to ozone configuration
     */
    private config: {configPromise: Promise<ConfigType>};

    /**
     * hide element and pause the player.
     */
    public hidden: boolean;



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
        const ClapprWrapper = getPlayer();
        if(ClapprWrapper && data) {
            const mediaUrl = new MediaUrl(data.id as string, config);
            const url = mediaUrl.getVideoUrl();
            const previewImage = mediaUrl.getPreviewUrl(OzonePreviewSize.Small)

            this.player = new (ClapprWrapper as ClapprType).Player({
                source: url,
                poster: previewImage,
            });

            //console.log(aMarker)
            var playerElement = document.createElement('div');
            this.$.player.appendChild(playerElement);
            this.player.attachTo(playerElement);

        }
    }

    /**
     * Load a video from an url.
     * @param {string} url
     * @return {Promise<void>}
     */
    public async loadVideoUrl(url: string){

        const ClapprWrapper = getPlayer();
        if(ClapprWrapper) {
            this.player = new (ClapprWrapper as ClapprType).Player({
                source: url,
            });

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


}

