/// <amd-module name="ozone-edit-video"/>
import "polymer/polymer.html"

import './ozone-edit-video.html';
import 'taktik-polymer-typeScript/type';

import {customElement} from 'taktik-polymer-typeScript'
/**
 */


@customElement('ozone-edit-video')
export class MyTemplate extends Polymer.Element{

    /**
     * property one
     */
    prop1: string;

    static get properties() {
        return {
            prop1: {
                type: String,
                notify: true,
                value: 'ozone-edit-video',
            },
        }
    }
}

