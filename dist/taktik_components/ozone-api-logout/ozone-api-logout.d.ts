/**
 * `ozone-api-logout` is a Logout facility for Ozone.
 *
 * Example:
 *
 * ```html
 * <ozone-api-logout></ozone-api-logout>
 * ```
 *
 * ### Events
 *
 * * *ozone-logout* Fired when logout to ozone succeeds.
 *
 * ### Styling
 *
 * The following custom properties and mixins are available for styling:
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--ozone-api-logout-button` | css mixin for logout button | `{}`
 *
 */
declare class OzoneApiLogout extends OzoneApiAjaxMixinType {
    /**
     * Submit ozone logout query
     */
    ozoneDisconnect(): void;
}
