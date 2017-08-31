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

    buildMarker(time: number, duration: number){

        var aMarker = new myClapprMarkersPlugin.CropMarker(time,duration);

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

        function updateMarker(){
            aMarker.getDuration();
            aMarker.getTime();
        }
        function initResize(e: Event)
        {
            e.stopPropagation();
            window.addEventListener('mousemove', Resize, false);
            window.addEventListener('mouseup', stopResize, false);
        }
        function Resize(e: MouseEvent)
        {
            e.stopPropagation();
            const movePx = (e.clientX - element.offsetLeft);
            const parentElement = element.parentElement as HTMLElement;
            const movePc = (movePx / parentElement.clientWidth) * 100;

            element.style.width = movePc + '%';
            updateMarker();
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
            e.stopPropagation();
            window.removeEventListener('mousemove', transtlate, false);
            window.removeEventListener('mouseup', stopTranstlate, false);
        }
        aMarker._$marker = element;
        return aMarker;
    }


    async loadVideo(data?: any){

        const ClapprWrapper = getPlayer();
        if(ClapprWrapper) {
            //const mediaUrl = new MediaUrl(data.id as string, this.ozoneTypeApi.config);
            //const url = mediaUrl.getVideoUrl();
            const url = this.videoUrl;
            console.log('url', url)
            var aMarker = this.buildMarker(80,10);

            var bMarker = this.buildMarker(10,10);

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
                var cMarker = this.buildMarker(50, 5);
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

