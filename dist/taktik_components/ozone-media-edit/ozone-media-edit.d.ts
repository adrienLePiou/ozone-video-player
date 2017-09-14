/**
 * Created by hubert on 23/06/17.
 */
import "polymer/polymer-element.html";
import "taktik-language-selection/taktik-language-selection.html";
import "ozone-localized-string/ozone-localized-string.html";
import './ozone-media-edit.html';
import { Item } from 'ozone-type';
import { OzoneItemAbstractViewConstructor } from 'ozone-item-abstract-view';
import 'ozone-edit-entry';
import 'ozone-edit-set-entry';
import 'ozone-edit-text-entry';
import 'ozone-edit-number-entry';
import 'ozone-api-type';
import 'ozone-video-player';
import { OzoneVideoPlayer } from 'ozone-video-player';
export interface EditableFields {
    fieldType: string;
    name: string;
    value: string;
}
declare const OzoneMediaEdit_base: OzoneItemAbstractViewConstructor;
/**
 * <ozone-media-edit> is an element that provide material design to edit an media Item.
 *
 * ```html
 *  <link rel="import" href="../ozone-media-edit/ozone-media-edit.html">
 *      ...
 *  <ozone-media-edit item-data={{item}}>  </ozone-media-edit>
 * ```
 */
export declare class OzoneMediaEdit extends OzoneMediaEdit_base {
    $: {
        editableList: Element;
        player: OzoneVideoPlayer;
    };
    static editEntryClass: string;
    /**
     * hide element and pause the player.
     */
    hidden: boolean;
    playerElement?: OzoneVideoPlayer;
    ready(): void;
    static readonly properties: {
        hidden: {
            type: BooleanConstructor;
            value: boolean;
            observer: string;
        };
        isVideo: {
            type: BooleanConstructor;
            value: boolean;
        };
    };
    dataChange(data: Item): Promise<void>;
    private addInputElement(description, data, permission);
    private getEditableItemName(type);
    /**
     * get the item with it's modifies fields.
     * @return {Item}
     */
    getUpdatedData(): Item;
    private getEntryList();
    private removeEntryIfExist();
    loadVideo(data?: Item): Promise<void>;
    private hiddenChange(hidden?);
}
