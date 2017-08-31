import "polymer/polymer.html"

import './ozone-video-player.html';
import '../bower_components/ozone-config/ozone-config.html';
import 'taktik-polymer-typeScript/type';
import {customElement} from 'taktik-polymer-typeScript'
import {getClapprMarkersPlugin, MarkersPluginType, CropMarker} from './clappr-markers-plugin-wrapper'

import {MediaUrl, OzonePreviewSize, SizeEnum} from './ozone-media-url'
import {getPlayer, ClapprType, ClapprPlayer} from 'taktik-clappr-wrapper'
import {Video} from 'ozone-type'

export declare class VideoArea {
    time: number;
    duration:number
}
export declare type VideoMarker = Array<VideoArea>

const myClapprMarkersPlugin = getClapprMarkersPlugin() as MarkersPluginType;
/**
 * <ozone-edit-video>
 */
@customElement('ozone-edit-video')
export class OzoneEditVideo extends Polymer.Element{

    /**
     * videoMarker ozone marker object
     */
    videoMarker: VideoMarker;

    //element: HTMLElement;

    /**
     * Clappr player element
     */
    player: ClapprPlayer | undefined;

    videoUrl: string;

    config: {configPromise: Promise<ConfigType>};

    /**
     * hide element and pause the player.
     */
    hidden: boolean;



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
    async ready() {
        super.ready();

        this.config = getOzoneConfig();
    }


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
    async loadVideoUrl(url: string){

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

    visibilityChange(){
        if(this.hidden && this.player){
            this.player.pause();
        }
    }

    videoUrlChange(url? : string){
        if (url){
            this.loadVideoUrl(url);
        }
    }


}

