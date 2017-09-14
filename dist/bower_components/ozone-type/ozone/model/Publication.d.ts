export interface Publication {
    id?: string;
    token?: string;
    scheme?: string;
    fileTypes?: Array<string>;
    creationDate?: Date;
    startValidityDate?: Date;
    endValidityDate?: Date;
    accessDate?: Date;
    accessCount?: number;
    accessMax?: number;
    item?: string;
}
