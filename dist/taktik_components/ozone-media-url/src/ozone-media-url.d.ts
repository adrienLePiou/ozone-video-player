/**
 * Created by hubert on 21/06/17.
 */
import 'taktik-polymer-typeScript/type';
import * as Config from 'ozone-config';
export declare type SizeEnum = Number;
export declare class OzonePreviewSize {
    static Small: SizeEnum;
    static Medium: SizeEnum;
    static Large: SizeEnum;
}
/**
 * JavaScript class to convert media ID to URL
 */
export declare class OzoneMediaUrl {
    id: uuid;
    config: Config.ConfigType;
    constructor(id: uuid, config: Config.ConfigType);
    private ozoneApi?;
    private _getOzoneApi();
    getNumericId(): number;
    private _buildBaseUrl(action);
    getPreviewUrlJpg(size: SizeEnum): string;
    getOriginalFormat(): string;
    getPreviewUrlPng(size: SizeEnum): string;
    getPreviewUrl(size: SizeEnum): Promise<string>;
    getVideoUrl(): Promise<string>;
    getVideoUrlMp4(): string;
    private _fileTypeRequest(filetypeIdentifier);
    private _getVideoFileType();
    private _referedVideoFormat?;
    getPreferedVideoFormat(): Promise<string>;
}
