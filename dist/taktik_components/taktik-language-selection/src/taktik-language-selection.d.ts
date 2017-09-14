import "polymer/polymer.html";
import "iron-selector/iron-selector.html";
import './taktik-language-selection.html';
import 'taktik-polymer-typeScript/type';
/**
 * <taktik-language-selection> is a simple language selection module.
 *
 * ```html
 * <taktik-language-selection current-language="{{language}}" ></taktik-language-selection>
 * ```
 *
 * ### Events
 *
 * *current-language-change* Fired when language change.
 * This event will be fired if currentLanguage change.
 *
 */
export declare class TaktikLanguageSelection extends Polymer.Element {
    /**
     * currentLanguage
     * @notify: true
     * @value: 'en'
     */
    currentLanguage: string;
    /**
     * list of availableLanguages
     * @notify: true
     * @value: ['en', 'fr']
     */
    availableLanguages: Array<string>;
    /**
     * defaultLanguage
     * @value: 'en'
     */
    defaultLanguage: string;
    static readonly properties: {
        currentLanguage: {
            type: StringConstructor;
            notify: boolean;
            value: string;
            observer: string;
        };
        defaultLanguage: {
            type: StringConstructor;
            value: string;
        };
        availableLanguages: {
            type: ArrayConstructor;
            notify: boolean;
            value: () => string[];
        };
    };
    /**
     * _currentLanguageChange
     * @param newLanguage
     * @private
     */
    _currentLanguageChange(newLanguage: string): void;
}
