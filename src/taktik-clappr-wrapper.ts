
// TODO use import * as Clappr from 'Clappr' currently declare in ozone-video-player

declare var Clappr: ClapprType | undefined ;


declare var RTMP:object;
/**
 * return Clapper player
 * @return {ClapprType|any}
 */
export function getClappr(): ClapprType | undefined{
    let clapperCopy: ClapprType | undefined;
    try {
        clapperCopy = Clappr;

        console.log('clappr OK')
    } catch (err) {
        clapperCopy = undefined;
        console.log('clappr not found')
    }
    return clapperCopy
}
/**
 * return Clapper player
 * @return {ClapprType|any}
 */
export function getClapprRtmp(): object |undefined {
    let copy: object | undefined;
    try {
        copy = RTMP;

        console.log('clappr RTMP OK')
    } catch (err) {
        copy = undefined;
        console.log('clappr RTMP not found')
    }
    return copy
}
export interface ClapprType {
    Player: {new(param:ClapprParam): ClapprPlayer}
}

export interface ClapprPlayer {
    play():void
    pause():void
    stop():void
    destroy(): void
    attachTo(element: Element):void
    getPlugin(name: string): any
}

export interface ClapprParam {
    /**
     * Source to play
     */
    source?: string;
    /**
     * Image preview to display
     */
    poster?: string,
    /**
     * true if video should automatically play after page load
     */
    autoPlay?:boolean;
    /**
     *  `partial` if video should play automatically when it is partially appearing on the screen.
     *  `full` to auto play only when it is full visible
     */
    autoPlayVisible?: 'partial' | 'full';
    /**
     * true if you want the player to act in chromeless mode.
     */
    chromeless?:boolean;
    /**
     * height
     */
    height?: number | string;
    /**
     * false to disable media control auto hide
     */
    hideMediaControl?:boolean;
    /**
     * true to hide volume bars
     */
    hideVolumeBar?:boolean;
    /**
     * you can customize control bar colors adding the mediacontrol hash, eg: mediacontrol: `{seekbar: "#E113D3", buttons: "#66B2FF"}
     */
    mediacontrol?: object;
    /**
     * true if you want to start player with no sound
     */
    mute?: boolean;
    /**
     * width
     */
    width?: number| string,
    plugins?: object,
    [key: string]: any,
}