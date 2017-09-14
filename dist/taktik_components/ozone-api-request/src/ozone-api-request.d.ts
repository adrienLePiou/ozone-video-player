/**
 * OzoneAPIRequest is a light wrapper over XMLHttpRequest to manager AJAX request to Ozone.
 *
 * ### Events
 *
 * * *ozone-api-request-success* Fired when connection to ozone succeeds.
 * Event detail contains the XMLHttpRequest.
 *
 * * *ozone-api-request-error* Fired when connection to ozone fails.
 * Event detail contains the XMLHttpRequest.
 *

 * * *ozone-api-request-timeout* Fired when connection timeout.
 * Event detail contains the XMLHttpRequest.
 *
 * * *ozone-api-request-unauthorized* Fired when server return 403 unauthorized.
 * Event detail contains the XMLHttpRequest.
 *
 *
 * ### Usage
 *
 * * Basic usage with promise
 * ```typeScript
 * const OzoneAPIRequest = new OzoneAPIRequest();
 * OzoneAPIRequest.url = url;
 * OzoneAPIRequest.method = 'GET';
 * OzoneAPIRequest.sendRequest()
 *    .then((res:XMLHttpRequest) => {
 *        // Do something with XMLHttpRequest
 *        console.log(res.response)
 *    })
 *    .catch((failRequest)=>{
 *        // Do something with XMLHttpRequest to handel the error.
 *        console.error(failRequest.statusText)
 *    })
 * ```
 *
 *
 * * Usage with Event handler
 * ```typeScript
 * this.addEventListener('ozone-api-request-success', (event: Event) => {
 *        // Do something with XMLHttpRequest
 *        console.log(event.detail.response)
 *    })
 * this.addEventListener('ozone-api-request-error', (event: Event) => {
 *        // Do something with XMLHttpRequest to handel the error.
 *        console.error(event.detail.statusText)
 *    })
 * const OzoneAPIRequest = new OzoneAPIRequest();
 * OzoneAPIRequest.setEventTarget(this)
 * OzoneAPIRequest.url = url;
 * OzoneAPIRequest.method = 'GET';
 * OzoneAPIRequest.sendRequest();
 * ```
 *
 * * Modify request before send
 * ```typeScript
 * const OzoneAPIRequest = new OzoneAPIRequest();
 * OzoneAPIRequest.url = url;
 * OzoneAPIRequest.method = 'GET';
 * const request = OzoneAPIRequest.createXMLHttpRequest();
 * // Modify default request
 * request.setRequestHeader('Cache-Control', 'only-if-cached');
 *
 * OzoneAPIRequest.sendRequest(request);
 * // Handel response
 * ```
 *
 */
export declare class OzoneAPIRequest {
    private _url;
    private _method;
    private _body;
    private _responseType;
    url: string;
    body: string;
    method: string;
    responseType: XMLHttpRequestResponseType;
    /**
     * Create and open an XMLHttpRequest
     * @return {XMLHttpRequest}
     */
    createXMLHttpRequest(): XMLHttpRequest;
    /**
     * eventTarget to dispatch *ozone-api-request-success* and *ozone-api-request-error* events
     * Default value is document.
     * @type {EventTarget}
     */
    eventTarget: EventTarget;
    setEventTarget(element: EventTarget): void;
    /**
     *
     * @param {XMLHttpRequest} request (optional) This parameters overwrite the default XmlHttpRequest.
     * @return {Promise<XMLHttpRequest>}
     */
    sendRequest(request?: XMLHttpRequest): Promise<XMLHttpRequest>;
}
