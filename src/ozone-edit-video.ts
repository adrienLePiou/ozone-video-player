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

        this.loadVideo('any')
        //this.buildMarker()
        //this.buildMarker()
    }

    buildMarker(): HTMLElement{
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


        function initResize(e: Event)
        {
            e.stopPropagation();
            window.addEventListener('mousemove', Resize, false);
            window.addEventListener('mouseup', stopResize, false);
        }
        function Resize(e: MouseEvent)
        {
            e.stopPropagation();
            const movePx = (e.clientX - element.offsetLeft)
            const parentElement = element.parentElement as HTMLElement;
            const movePc = (movePx / parentElement.clientWidth) * 100;

            element.style.width = movePc + '%';
        }
        function stopResize(e: Event)
        {
            e.stopPropagation();
            window.removeEventListener('mousemove', Resize, false);
            window.removeEventListener('mouseup', stopResize, false);
        }

        function initResizeLeft(e: Event)
        {
            e.stopPropagation();
            window.addEventListener('mousemove', ResizeLeft, false);
            window.addEventListener('mouseup', stopResizeLeft, false);
        }
        function ResizeLeft(e: MouseEvent)
        {
            e.stopPropagation();
            let left = parseFloat(element.style.left || '')
            if (isNaN(left)) {
                left = 0;
            }
            const movePx = (e.clientX - element.offsetLeft);
            const parentElement = element.parentElement as HTMLElement;
            const movePc = (movePx / parentElement.clientWidth) * 100;

            element.style.left = left + movePc + '%';
            element.style.width =  parseFloat(element.style.width || '') -  movePc + '%';
        }
        function stopResizeLeft(e: Event)
        {
            e.stopPropagation();
            window.removeEventListener('mousemove', ResizeLeft, false);
            window.removeEventListener('mouseup', stopResizeLeft, false);
        }


        function initTranslate(e: Event)
        {
            e.stopPropagation();
            window.addEventListener('mousemove', transtlate, false);
            window.addEventListener('mouseup', stopTranstlate, false);
        }
        function transtlate(e: MouseEvent )
        {
            e.stopPropagation();
            let left = parseFloat(element.style.left || '')
            if (isNaN(left)) {
                left = 0;
            }
            const movePx = (e.clientX - element.offsetLeft);
            const parentElement = element.parentElement as HTMLElement;
            const movePc = (movePx / parentElement.clientWidth) * 100;

            element.style.left = left + movePc + '%';
        }
        function stopTranstlate(e: Event)
        {
            window.removeEventListener('mousemove', transtlate, false);
            window.removeEventListener('mouseup', stopTranstlate, false);
        }
        return element;
    }


    async loadVideo(data?: any){

        const ClapprWrapper = getPlayer();
        if(ClapprWrapper) {
            //const mediaUrl = new MediaUrl(data.id as string, this.ozoneTypeApi.config);
            //const url = mediaUrl.getVideoUrl();
            const url = "http://tjenkinson.me/clappr-thumbnails-plugin/assets/video.mp4"
            var aMarker = new myClapprMarkersPlugin.CropMarker(80,10);
            aMarker._$marker = this.buildMarker();

            var bMarker = new myClapprMarkersPlugin.CropMarker(10,10);
            bMarker._$marker = this.buildMarker();

            this.player = new (ClapprWrapper as ClapprType).Player({
                source: url,

               plugins: {
                    core: [myClapprMarkersPlugin],
                },
                markersPlugin: {
                    markers: [
                        aMarker,
                        bMarker,
                    ],
                }
            });

            //console.log(aMarker)
            var playerElement = document.createElement('div');
            this.$.player.appendChild(playerElement);
            this.player.attachTo(playerElement);

            this.set('isVideo', true);

            var markersPlugin = this.player.getPlugin('markers-plugin') as MarkersPluginType;


            this.$.save.onclick = () => {
                markersPlugin.getAll().forEach((maker:CropMarker)=>{
                    debugger
                    console.log('Marker - start:', maker.getTime(), ' duration:', maker.getDuration())
                });
            };

            this.$.add.onclick = () => {
                var cMarker = new myClapprMarkersPlugin.CropMarker(50,10)
                cMarker._$marker = this.buildMarker();
                markersPlugin.addMarker(cMarker);
            };

            this.$.remove.onclick = () => {
                markersPlugin.removeMarker(aMarker);
            };
            this.$.clear.onclick = () => {
                markersPlugin.clearMarkers();
            };
        }
    }
}

