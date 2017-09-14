
declare module 'Clappr' {

    export const CorePlugin: {extend: {(plugin:object):object}}

    export class Player {
        constructor (param: ClapprParam)

        play(): void

        pause(): void

        stop(): void

        destroy(): void

        attachTo(element: Element): void

        getPlugin(name: string): any

        isPlaying(): void

        options: ClapprParam
    }

    export class UICorePlugin {
        options: object
        constructor(core:any)

    }
    export const Events: {[key:string]:any};

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
        autoPlay?: boolean;
        /**
         *  `partial` if video should play automatically when it is partially appearing on the screen.
         *  `full` to auto play only when it is full visible
         */
        autoPlayVisible?: 'partial' | 'full';
        /**
         * true if you want the player to act in chromeless mode.
         */
        chromeless?: boolean;
        /**
         * height
         */
        height?: number | string;
        /**
         * false to disable media control auto hide
         */
        hideMediaControl?: boolean;
        /**
         * true to hide volume bars
         */
        hideVolumeBar?: boolean;
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
        width?: number | string,
        plugins?: {
            playback?: Array<any>,
            core: Array<any>
        },

        [key: string]: any,
    }

}

declare module 'clappr-rtmp-plugin'{

    export const RTMP: object

};