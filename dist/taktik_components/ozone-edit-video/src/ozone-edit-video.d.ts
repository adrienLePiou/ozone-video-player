import 'taktik-polymer-typeScript/type';
import 'ozone-video-player';
import { OzoneMediaUrl } from 'ozone-media-url';
import * as OzoneType from 'ozone-type';
import { OzoneApiItem } from 'ozone-api-item';
export declare type Blob = {
    creationDate: string;
    hashMd5: string;
    id: uuid;
    size: number;
    status: string;
    storageUnitId: uuid;
};
export declare class VideoArea {
    time: number;
    duration: number;
}
export declare type VideoMarker = Array<VideoArea>;
/**
 * <ozone-edit-video>
 */
export declare class OzoneEditVideo {
    ozoneApi: OzoneApiItem;
    private _ozoneMediaUrlCollection;
    mediaUrlFactory(video: OzoneType.Video): Promise<OzoneMediaUrl>;
    constructor();
    private _createNewPlayListFile(originalVideo, chunksList);
    _savePlayList(playList: string): Promise<object>;
    private _createBlobFile(playListBlob);
    private getVideoFile(originalVideo);
    private getFileType(type);
    private _createFolder(playListFile, originalVideoFile, chunks, originaFileTypeIdentifier);
    private _duplicateVideo(originalVideo, newFolder);
    createSubVideo(originalVideo: OzoneType.Video, chunks: Array<Array<string>>): Promise<any>;
}
