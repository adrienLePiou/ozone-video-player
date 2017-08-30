/// <amd-module name="ozone-edit-video"/>
import "polymer/polymer.html"

import './ozone-edit-video.html';
import 'taktik-polymer-typeScript/type';

import {customElement} from 'taktik-polymer-typeScript'
import {getPlayer, ClapprType, ClapprPlayer} from 'taktik-clappr-wrapper'

import 'my-template' // import webComponent
import {MyTemplate} from '../bower_components/my-template/src/my-template' // import type

/**
 * <ozone-edit-video>
 */
@customElement('ozone-edit-video')
export class OzoneEditVideo extends Polymer.Element{

    /**
     * property one
     */
    prop1: string;
    $: {v : MyTemplate};

    increment: number = 0;

    static get properties() {
        return {
            prop1: {
                type: String,
                notify: true,
                value: 'ozone-edit-video ici',
            },
        }
    }
    ready(){
        super.ready();
        this.$.v.addEventListener('click', ()=> {this.update()})
    }

    update(){
        console.log('update')
        this.increment++;
        this.$.v.prop1 = `click ${this.increment}`;

    }
}

