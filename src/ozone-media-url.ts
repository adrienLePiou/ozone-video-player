/// <amd-module name="./ozone-media-url"/>
/**
 * Created by hubert on 21/06/17.
 */


import {jsElement} from 'taktik-polymer-typeScript'

export type SizeEnum = Number;
@jsElement()
export class  OzonePreviewSize{
    static Small: SizeEnum= 250;
    static Medium: SizeEnum = 500;
    static Large:SizeEnum = 1500;
}

/**
 * JavaScript class to convert media ID to URL
 */
@jsElement()
export class MediaUrl {

    id:uuid;
    config: ConfigType;
    constructor(id:uuid, config: ConfigType){
        this.id = id;
        this.config = config;
    }

    getNumericId():number{
        return parseInt('0x' + this.id.split('-')[4])
    }
    private _buildBaseUrl(action:Array<string | number>):string{
        return `${this.config.host}${this.config.view}/${action.join('/')}`;
    }

    getPreviewUrl(size: SizeEnum):string{
        const preview = 'org.taktik.filetype.image.preview.'
                        + size;
        return this
            ._buildBaseUrl([this.getNumericId(), preview])

    }
    getPreviewUrlPng(size: SizeEnum):string{
        const preview = 'preview.png.'
                        + size;
        return this
            ._buildBaseUrl([this.getNumericId(), preview])

    }
    getVideoUrl():string{
        return this
            ._buildBaseUrl([this.getNumericId(),
                'org.taktik.filetype.flowr.video',
                'index.m3u8'])
    }
    getVideoUrlMp4():string{
        return this
            ._buildBaseUrl([this.getNumericId(),
                'org.taktik.filetype.video.mp4'])
    }

}