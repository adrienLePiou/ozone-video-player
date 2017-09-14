/**
 * Ozone
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 3.0.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import * as models from './models';
export interface Reservation extends models.Item {
    date?: number;
    roomNumber?: string;
    shareFlag?: string;
    guestVipStatus?: string;
    guestName?: string;
    workstationId?: string;
    noPostStatus?: string;
    guestLanguage?: string;
    guestDepartureDate?: number;
    swapFlag?: string;
    classOfService?: string;
    videoRights?: string;
    minibarRights?: string;
    guestArrivalDate?: number;
    profileNumber?: string;
    a0?: string;
    a1?: string;
    a2?: string;
    a3?: string;
    guestGroupNumber?: string;
    a4?: string;
    a5?: string;
    tvRights?: string;
    a6?: string;
    a7?: string;
    a8?: string;
    guestFirstName?: string;
    a9?: string;
    guestTitle?: string;
    reservationNumber?: number;
    oldRoomNumber?: string;
    time?: number;
    checkOut?: number;
}
