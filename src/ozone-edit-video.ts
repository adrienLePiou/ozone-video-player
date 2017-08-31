import "polymer/polymer.html"

import './ozone-edit-video.html';
import 'taktik-polymer-typeScript/type';
import {customElement} from 'taktik-polymer-typeScript'
import {getClapprMarkersPlugin, MarkersPluginType, CropMarker} from './clappr-markers-plugin-wrapper'

import {getPlayer, ClapprType, ClapprPlayer} from 'taktik-clappr-wrapper'


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



    static get properties() {
        return {
            player: {
                type: Object,
                value: false,
            },
            videoUrl: {
                type: String
            },
        }
    }
    ready() {
        super.ready();

        this.loadVideo('any')
    }


    async loadVideo(data?: any){

        const ClapprWrapper = getPlayer();
        if(ClapprWrapper) {
            //const mediaUrl = new MediaUrl(data.id as string, this.ozoneTypeApi.config);
            //const url = mediaUrl.getVideoUrl();
            const url = this.videoUrl;
            console.log('url', url)

            this.player = new (ClapprWrapper as ClapprType).Player({
                source: url,
            });

            //console.log(aMarker)
            var playerElement = document.createElement('div');
            this.$.player.appendChild(playerElement);
            this.player.attachTo(playerElement);

        }
    }
}

