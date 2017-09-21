import "polymer/polymer.html"
import './demo-app.html';
import {customElement} from 'taktik-polymer-typescript'
import {OzoneVideoPlayer} from "../ozone-video-player"

@customElement('demo-app')
class demoApp extends Polymer.Element {

    $: {
        mediaPlayer: OzoneVideoPlayer,
        addMarker: Element,
        clear: Element,
    };

    static get properties() {
        return {
            aVideo: {
                type: Object,
            },
            subtitles: {
                type: Object,
            },
            markers: {
                type: Array,
            },
            subtitleSelect: {
                type: String,
            },
            display: {
                type: Boolean,
                value: false,
            }
        };
    }

    ready() {
        super.ready();
        this.$.addMarker.addEventListener('click', e => this._addMarker());
        this.$.clear.addEventListener('click', e => this._clearMarkers());
    }

    _addMarker(){
        console.log('_addMarker')

        this.$.mediaPlayer.addMarker({duration:  10, time: 10});

    }
    _clearMarkers(){

        console.log('_clearMarker')
        this.$.mediaPlayer.clearMarkers();

    }

}