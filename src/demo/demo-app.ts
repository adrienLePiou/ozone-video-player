import "polymer/polymer.html"
import './demo-app.html';
import {customElement} from 'taktik-polymer-typescript'

@customElement('demo-app')
class demoApp extends Polymer.Element {
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
    }

}