declare function TaktikSearchApiMixin(element: any): TaktikSearchApiMixinConstructor;
interface TaktikSearchApiMixinConstructor {
    new (): TaktikSearchApiMixinType;
}
/**
 *
 * defines standard behavior for search modules compatible with *taktik-free-text-search*.
 *
 *
 * ### Events
 *
 * * *results-found* Fired when results are found by the API.
 *
 */
declare class TaktikSearchApiMixinType extends PolymerElement {
    /**
     * searchString string for search query.
     */
    searchString: string;
    /**
     * Array of search results
     */
    searchResults: string;
    _setSearchResults(): void;
    /**
     * If true, automatically performs an Ajax request when either *searchString*, *itemType* or *size* changes.
     */
    auto: boolean;
    _resultsFound(): void;
}
