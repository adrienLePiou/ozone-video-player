import * as Clappr from 'Clappr'


declare module 'Clappr-Subtitle'{

    export interface SubtitleParam{
        src : string,
        auto : boolean, // automatically loads subtitle
        backgroundColor : string,
        fontWeight : string,
        fontSize : string,
        color: string,
        textShadow : string
    }


}