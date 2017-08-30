import "polymer/polymer.html";
import './ozone-edit-video.html';
import 'taktik-polymer-typeScript/type';
import 'my-template';
import { MyTemplate } from '../bower_components/my-template/src/my-template';
/**
 * <ozone-edit-video>
 */
export declare class OzoneEditVideo extends Polymer.Element {
    /**
     * property one
     */
    prop1: string;
    $: {
        v: MyTemplate;
    };
    increment: number;
    static readonly properties: {
        prop1: {
            type: StringConstructor;
            notify: boolean;
            value: string;
        };
    };
    ready(): void;
    update(): void;
}
