import "polymer/polymer.html";
import './ozone-edit-video.html';
import 'taktik-polymer-typeScript/type';
/**
 */
export declare class MyTemplate extends Polymer.Element {
    /**
     * property one
     */
    prop1: string;
    static readonly properties: {
        prop1: {
            type: StringConstructor;
            notify: boolean;
            value: string;
        };
    };
}
