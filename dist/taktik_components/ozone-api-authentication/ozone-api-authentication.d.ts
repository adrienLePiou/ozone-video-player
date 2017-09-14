/**
 * `ozone-api-authentication` is a facility to verify Ozone connection status.
 *
 * Example:
 *
 * ```html
 * <ozone-api-authentication></ozone-api-authentication>
 * ```
 *
 * ```javaScript
 * var ozoneAuthenticationSigleton = getOzoneAuthenticationStatus()
 * ```
 *
 * ### Events
 *
 * * *ozone-status-change* Fire when connectionStatus change.
 *
 *
 */
declare class OzoneApiAuthentication extends OzoneApiAjaxMixinType {
    /**
     * Indicate the ozone connection status.
     * Possible value: `connected` | `disconnected` | `offline` | `server error`.
     * @notify
     */
    connectionStatus: string;
    /**
     * When a number is set, the connection will be verify periodically.
     * @notify
     */
    refreshPeriod: number;
    /**
     * Verify is the connection connection status Ozone.
     * It will force the refresh of *connectionStatus*
     */
    checkConnectionStatus(): void;
}
/**
 * Return OzoneApiAuthentication singleton.
 */
declare function getOzoneAuthenticationStatus(): OzoneApiAuthentication;
