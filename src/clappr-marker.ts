import * as ClapprMarkersPlugin from 'clappr-markers-plugin'

export type MarkerOnVideo = {
    time: number,
    duration: number,
}

export class ClapprMarkerFactory {
    parent: PolymerElement;
    constructor(parent: PolymerElement){
        this.parent = parent;
    }
    createMarker (marker: MarkerOnVideo, index: number): ClapprMarkersPlugin.CropMarker{
        const myClapprMarkersPlugin =  ClapprMarkersPlugin;
        var aMarker = new myClapprMarkersPlugin.CropMarker(marker.time, marker.duration);

        //const element = this.$.element;
        const element = document.createElement('div');

        //this.element.classList.add('crop-marker');
        //const element = document.createElement('div');

        element.className = 'element';

        //this.$.container.appendChild(element)

        var resizer = document.createElement('div');
        resizer.className = 'resizer';
        resizer.style.right = '0';

        element.appendChild(resizer);
        resizer.addEventListener('mousedown', (e) => {
            initResize(e)
        }, false);
        var resizerL = document.createElement('div');
        resizerL.className = 'resizer';
        element.appendChild(resizerL);

        resizerL.addEventListener('mousedown', (e) => {
            initResizeLeft(e)
        }, false);


        element.addEventListener('mousedown', (e) => {
            initTranslate(e)
        }, false);

        const updateMarker= ()=> {
            this.parent.set(`markers.${index}.duration`, aMarker.getDuration());
            this.parent.set(`markers.${index}.time`, aMarker.getTime());
        };
        function initResize(e: Event)
        {
            console.log('STOP initResize')
            e.stopPropagation();
            window.addEventListener('mousemove', Resize, false);
            window.addEventListener('mouseup', stopResize, false);
        }
        function Resize(e: MouseEvent)
        {
            console.log('STOP Resize')
            e.stopPropagation();
            const movePx = (e.clientX - element.offsetLeft);
            const parentElement = element.parentElement as HTMLElement;
            const movePc = (movePx / parentElement.clientWidth) * 100;

            element.style.width = movePc + '%';
            updateMarker();
        }
        function stopResize(e: Event)
        {
            console.log('STOP stopResize')
            e.stopPropagation();
            window.removeEventListener('mousemove', Resize, false);
            window.removeEventListener('mouseup', stopResize, false);
        }

        function initResizeLeft(e: Event)
        {
            console.log('STOP initResizeLeft')
            e.stopPropagation();
            window.addEventListener('mousemove', ResizeLeft, false);
            window.addEventListener('mouseup', stopResizeLeft, false);
        }
        function ResizeLeft(e: MouseEvent)
        {
            console.log('STOP ResizeLeft')
            e.stopPropagation();
            let left = parseFloat(element.style.left || '');
            if (isNaN(left)) {
                left = 0;
            }
            const movePx = (e.clientX - element.offsetLeft);
            const parentElement = element.parentElement as HTMLElement;
            const movePc = (movePx / parentElement.clientWidth) * 100;

            element.style.left = left + movePc + '%';
            element.style.width =  parseFloat(element.style.width || '') -  movePc + '%';
            updateMarker();
        }
        function stopResizeLeft(e: Event)
        {
            console.log('STOP stopResizeLeft')
            e.stopPropagation();
            window.removeEventListener('mousemove', ResizeLeft, false);
            window.removeEventListener('mouseup', stopResizeLeft, false);
        }


        function initTranslate(e: Event)
        {
            console.log('STOP initTranslate')
            e.stopPropagation();
            window.addEventListener('mousemove', transtlate, false);
            window.addEventListener('mouseup', stopTranstlate, false);
        }
        function transtlate(e: MouseEvent )
        {
            console.log('STOP transtlate')
            e.stopPropagation();
            let left = parseFloat(element.style.left || '');
            if (isNaN(left)) {
                left = 0;
            }
            const movePx = (e.clientX - element.offsetLeft);
            const parentElement = element.parentElement as HTMLElement;
            const movePc = (movePx / parentElement.clientWidth) * 100;

            element.style.left = left + movePc + '%';
            updateMarker();
        }
        function stopTranstlate(e: Event)
        {
            console.log('STOP stopTranstlate')
            e.stopPropagation();
            window.removeEventListener('mousemove', transtlate, false);
            window.removeEventListener('mouseup', stopTranstlate, false);
        }
        aMarker._$marker = element;
        return aMarker;
    }
}