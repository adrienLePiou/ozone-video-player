/// <amd-module name="ozone-edit-video"/>
import "polymer/polymer.html"

import './ozone-edit-video.html';
import 'taktik-polymer-typeScript/type';
import {customElement} from 'taktik-polymer-typeScript'
import {getClapprMarkersPlugin, MarkersPluginType, CropMarker} from './clappr-markers-plugin-wrapper'
//import './node_modules/clappr-markers-plugin/src'
/*
//import '../bower_components/ozone-api-type/ozone-api-type.html'
import '../bower_components/ozone-config/ozone-config'
import '../bower_components/ozone-api-behaviors/ozone-api-ajax-mixin'
import '../bower_components/ozone-api-type/ozone-api-type'


import {Item, FieldDescriptor} from 'ozone-type'

import {MediaUrl, OzonePreviewSize} from 'ozone-media-url'

import{OzoneItemAbstractView, OzoneItemAbstractViewConstructor} from 'ozone-item-abstract-view'

*/
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



    static get properties() {
        return {
            player: {
                type: Object,
                value: false,
            },
        }
    }
    ready() {
        super.ready();

        const element = this.$.element;
        //this.element = document.createElement('div');
        //this.element.classList.add('crop-marker');
        //const element = document.createElement('div');
        element.classList.add('element');
        var resizer = document.createElement('div');
        resizer.className = 'resizer';
        resizer.style.width = '5px';
        resizer.style.height = '100%';
        resizer.style.background = 'red';
        resizer.style.position = 'absolute';
        resizer.style.right = '0';
        resizer.style.bottom = '0';
        resizer.style.cursor = 'se-resize';
        element.appendChild(resizer);
        resizer.addEventListener('mousedown', (e) => {
            initResize(e)
        }, false);
        var resizerL = document.createElement('div');
        resizerL.className = 'resizer';
        resizerL.style.width = '5px';
        resizerL.style.height = '100%';
        resizerL.style.background = 'red';
        resizerL.style.position = 'absolute';
//resizerL.style.right = 0;
        resizerL.style.bottom = '0';
        resizerL.style.cursor = 'se-resize';
        element.appendChild(resizerL);
        resizerL.addEventListener('mousedown', (e) => {
            initResizeL(e)
        }, false);


        function initResize(e: Event)
        {
            window.addEventListener('mousemove', Resize, false);
            window.addEventListener('mouseup', stopResize, false);
        }
        function Resize(e: MouseEvent)
        {
            const movePx = (e.clientX - element.offsetLeft)
            const parentElement = element.parentElement as HTMLElement;
            const movePc = (movePx / parentElement.clientWidth) * 100;
            element.style.width = movePc + '%';
        }

        function initResizeL(e: Event)
        {
            window.addEventListener('mousemove', ResizeL, false);
            window.addEventListener('mouseup', stopResizeL, false);
        }
        function ResizeL(e: MouseEvent )
        {
            let left = parseFloat(element.style.left || '')
            if (isNaN(left)){
                left = 0;
            }
            const movePx = (e.clientX - element.offsetLeft);
            const parentElement = element.parentElement as HTMLElement;
            const movePc = (movePx / parentElement.clientWidth) * 100;

            element.style.left = left + movePc + '%';
            element.style.width =  parseFloat(element.style.width || '') +  movePc + '%';
        }
        function stopResize(e: Event)
        {
            console.log('stop tresize')
            window.removeEventListener('mousemove', Resize, false);
            window.removeEventListener('mouseup', stopResize, false);
        }
        function stopResizeL(e: Event)
        {
            console.log('stop tresize L')
            window.removeEventListener('mousemove', ResizeL, false);
            window.removeEventListener('mouseup', stopResizeL, false);
        }

        this.loadVideo('any')
    }



    async loadVideo(data?: any){

        const ClapprWrapper = getPlayer();
        if(ClapprWrapper) {
            //const mediaUrl = new MediaUrl(data.id as string, this.ozoneTypeApi.config);
            //const url = mediaUrl.getVideoUrl();
            const url = "http://tjenkinson.me/clappr-thumbnails-plugin/assets/video.mp4"
            var aMarker = new myClapprMarkersPlugin.CropMarker(80,10);
            aMarker._$marker = this.$.element;

            this.player = new (ClapprWrapper as ClapprType).Player({
                source: url,

               plugins: {
                    core: [myClapprMarkersPlugin],
                },
                markersPlugin: {
                    markers: [
                        aMarker,
                    ],
                }
            });

            //console.log(aMarker)
            var playerElement = document.createElement('div');
            this.$.player.appendChild(playerElement);
            this.player.attachTo(playerElement);

            this.set('isVideo', true);

            var markersPlugin = this.player.getPlugin('markers-plugin') as MarkersPluginType;
            debugger


            this.$.save.onclick = () => {
                markersPlugin.getAll().forEach((maker:CropMarker)=>{
                    debugger
                    console.log('Marker - start:', maker.getTime(), ' duration:', maker.getDuration())
                });
            };

            this.$.add.onclick = () => {
                markersPlugin.addMarker(new myClapprMarkersPlugin.CropMarker(10,10));
            };

            this.$.remove.onclick = () => {
                //markersPlugin.removeMarker(aMarker);
            };
            this.$.clear.onclick = () => {
                markersPlugin.clearMarkers();
            };
        }
    }
}

