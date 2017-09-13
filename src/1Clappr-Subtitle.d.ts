import * as Clappr from 'Clappr';
export interface SubtitleParam {
    src: string;
    auto: boolean;
    backgroundColor: string;
    fontWeight: string;
    fontSize: string;
    color: string;
    textShadow: string;
}
export declare class ClapprSubtitleClass {
    core: any;
    subtitles: Array<any>;
    element: HTMLElement;
    active: boolean;
    listenTo: {
        (p1?: any, p2?: any, p3?: any): any;
    };
    options: {
        [key: string]: any;
    };
    _options: Clappr.ClapprParam;
    lastMediaControlButtonClick: Date;
    subtitle: Array<any>;
    /**
     * @constructor
     */
    constructor();
    initialize: {
        (): void;
    };
    /**
     * Add event listeners
     */
    bindEvents(): void;
    /**
     * Add event listeners after containers were created
     */
    containersCreated(): void;
    /**
     * On container changed
     */
    onContainerChanged(): void;
    /**
     * Subtitles fetched
     */
    onSubtitlesFetched(data: any): void;
    /**
     * Polyfill
     */
    polyfill(): void;
    /**
     * AJAX request to the subtitles source
     * @param {function} callback
     */
    fetchSubtitle(cb: any): void;
    /**
     * Parse subtitle
     * @param {string} data
     */
    parseSubtitle(datas: any): void;
    /**
     * Converts human duration time (00:00:00) to seconds
     * @param {string} human time
     * @return {float}
     */
    humanDurationToSeconds(duration: any): number;
    /**
     * Initializes the subtitle on the dom
     */
    initializeElement(): void;
    /**
     * Add button to media control
     */
    addButtonToMediaControl(): void;
    /**
     * Button SGV
     * @return {string}
     */
    getMediaControlButtonSVG(): string;
    /**
     * on button click
     */
    onMediaControlButtonClick(mouseEvent: any): void;
    /**
     * Hides the subtitle element
     */
    hideElement(): void;
    /**
     * Shows the subtitle element with text
     * @param {string} text
     */
    showElement(text: any): void;
    /**
     * Subtitle element moves up
     * to give space to the controls
     */
    onMediaControlShow(): void;
    /**
     * Subtitle element moves down
     * when controls hide
     */
    onMediaControlHide(): void;
    /**
     * Show subtitles as media is playing
     */
    run(time: any): void;
}
export declare const ClapprSubtitle: object;
