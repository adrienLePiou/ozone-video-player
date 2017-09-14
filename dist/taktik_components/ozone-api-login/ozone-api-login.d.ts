/**
 * `ozone-api-login` is a Login facility for Ozone.
 *
 * Example:
 *
 * ```html
 * <ozone-api-login></ozone-api-login>
 * ```
 *
 * ### Events
 * * *ozone-login*  Fire when ozone is connected
 */
declare class OzoneApiLogin extends OzoneApiAjaxMixinType {
    /**
     * Username to use for login.
     */
    username: string;
    /**
     * Password to use for login.
     */
    password: string;
    /**
     * Error message display to explain why the connection fail.
     *
     */
    displayedMessage: string;
    /**
     * Submit the from with parameters filled in
     */
    ozoneConnect(): void;
    /**
     * Reset element
     */
    reset(): void;
}
