/*!
 *
 *  ClapprSubtitle
 *  Copyright 2016 JMV Technology. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use (this as any) file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 */
import * as Clappr from 'Clappr'


    var BLOCK_REGEX = /[0-9]+(?:\r\n|\r|\n)([0-9]{2}:[0-9]{2}:[0-9]{2}(?:,|\.)[0-9]{3}) --> ([0-9]{2}:[0-9]{2}:[0-9]{2}(?:,|\.)[0-9]{3})(?:\r\n|\r|\n)((?:.*(?:\r\n|\r|\n))*?)(?:\r\n|\r|\n)/g;

    export class  ClapprSubtitle  extends Clappr.UICorePlugin {

        subtitles = []

        element = null

        active = false

        lastMediaControlButtonClick = new Date()

        get name() { return 'subtitle-plugin' }

        /**
         * @constructor
         */
        constructor(core:any) {
            super(core);

            this.subtitles = [];

            // initialize subtitle on DOM
            (this as any).initializeElement();

            // check options
            if (! (this as any)._options.subtitle)
                return;

            var options = (this as any)._options.subtitle;

            // override src and style
            // if 'options' is object
            if (typeof(options) === "object") {
                if('src' in options) {
                    if(typeof(options.src) == 'string' ) {
                        (this as any).options.src = options.src;
                    }
                    else {
                        return;
                    }
                }

                if('auto' in options) {
                    (this as any).options.auto = options.auto === true;
                    if((this as any).options.auto) {
                        (this as any).active = true;
                    }
                }

                if('backgroundColor' in options)
                    (this as any).options.backgroundColor = options.backgroundColor;

                if('color' in options) {
                    (this as any).options.color = options.color;
                }

                if('fontSize' in options)
                    (this as any).options.fontSize = options.fontSize;

                if('fontWeight' in options)
                    (this as any).options.fontWeight = options.fontWeight;

                if('textShadow' in options)
                    (this as any).options.textShadow = options.textShadow;

                // override src if 'options' is string
            } else if (typeof(options) === "string") {
                (this as any).options.src = options;
                (this as any).options.auto = true;
            } else {
                return;
            }
            // initialize subtitle on DOM
            (this as any).initializeElement();
            this.initSubtitle();


        }

        initSubtitle(){
            // fetch subtitles
            this.fetchSubtitle((this as any).onSubtitlesFetched.bind((this as any)));
        }

        /**
         * Add event listeners
         */
        bindEvents() {
            (this as any).listenTo((this as any).core, Clappr.Events.CORE_CONTAINERS_CREATED, (this as any).containersCreated);
            (this as any).listenTo((this as any).core.mediaControl, Clappr.Events.MEDIACONTROL_RENDERED, (this as any).addButtonToMediaControl);
            (this as any).listenTo((this as any).core.mediaControl, Clappr.Events.MEDIACONTROL_SHOW, (this as any).onMediaControlShow);
            (this as any).listenTo((this as any).core.mediaControl, Clappr.Events.MEDIACONTROL_HIDE, (this as any).onMediaControlHide);
            (this as any).listenTo((this as any).core.mediaControl, Clappr.Events.MEDIACONTROL_CONTAINERCHANGED, (this as any).onContainerChanged);
        }

        /**
         * Add event listeners after containers were created
         */
        containersCreated() {
            // append element to container
            (this as any).core.containers[0].$el.append((this as any).element);
            // run
            (this as any).listenTo((this as any).core.containers[0].playback, Clappr.Events.PLAYBACK_TIMEUPDATE, (this as any).run);
        }

        /**
         * On container changed
         */
        onContainerChanged() {
            // container changed is fired right off the bat
            // so we should bail if subtitles aren't yet loaded
            if ((this as any).subtitles.length === 0)
                return;

            // kill the current element
            (this as any).element.parentNode.removeChild((this as any).element);

            // clear subtitles
            (this as any).subtitle = [];

            // initialize stuff again
            (this as any).initialize();

            // trigger containers created
            (this as any).containersCreated();
        }

        /**
         * Subtitles fetched
         */
        onSubtitlesFetched(data:any) {
            // parse subtitle
            (this as any).parseSubtitle(data);
        }


        /**
         * AJAX request to the subtitles source
         * @param {function} callback
         */
        fetchSubtitle(cb:any) {
            var r = new XMLHttpRequest();
            r.open("GET", (this as any).options.src, true);
            r.onreadystatechange = function () {
                // nothing happens if request
                // fails or is not ready
                if (r.readyState != 4 || r.status != 200)
                    return;

                // callback
                if(cb)
                    cb(r.responseText);
            };
            r.send();
        }

        /**
         * Parse subtitle
         * @param {string} data
         */
        parseSubtitle(datas:any) {

            // clear existing subtitles if any
            this.subtitles = []

            // Get blocks and loop through them
            let blocks: Array<any> = datas.match(BLOCK_REGEX);

            for(var i = 0; i < blocks.length; i++) {

                var startTime = null;
                var endTime = null;
                var text = "";

                // Break the block in lines
                var block = blocks[i];
                var lines = block.split(/(?:\r\n|\r|\n)/);

                // The second line is the time line.
                // We parse the start and end time.
                var time = lines[1].split(' --> ');
                var startTime = (this as any).humanDurationToSeconds(time[0].trim());
                var endTime = (this as any).humanDurationToSeconds(time[1].trim());

                // As for the rest of the lines, we loop through
                // them and append the to the text,
                for (var j = 2; j < lines.length; j++) {
                    var line = lines[j].trim();

                    if (text.length > 0) {
                        text += "<br />";
                    }

                    text += line;
                }

                // Then we push it to the subtitles
                (this as any).subtitles.push({
                    startTime: startTime,
                    endTime: endTime,
                    text: text
                });
            }
        }

        /**
         * Converts human duration time (00:00:00) to seconds
         * @param {string} human time
         * @return {float}
         */
        humanDurationToSeconds(duration:any) {
            duration = duration.split(":");

            var hours = duration[0],
                minutes = duration[1],
                seconds = duration[2].replace(",", ".");

            var result = 0.00;
            result += parseFloat(hours) * 60 * 60;
            result += parseFloat(minutes) * 60;
            result += parseFloat(seconds);

            return result;
        }

        /**
         * Initializes the subtitle on the dom
         */
        initializeElement() {
            var el = document.createElement('div');
            el.style.display = 'block';
            el.style.position = 'absolute';
            el.style.left = '50%';
            el.style.bottom = '50px';
            el.style.color = (this as any).options.color;
            el.style.backgroundColor = (this as any).options.backgroundColor;
            el.style.fontSize = (this as any).options.fontSize;
            el.style.fontWeight = (this as any).options.fontWeight;
            el.style.textShadow = (this as any).options.textShadow;
            el.style.transform = 'translateX(-50%)';
            el.style.boxSizing = 'border-box';
            el.style.padding = '7px';
            el.style.opacity = '0';
            el.style.pointerEvents = 'none';
            el.style.maxWidth = '90%';
            el.style.whiteSpace = 'normal';
            el.style.zIndex = '1';
            (this as any).element = el;
        }

        /**
         * Add button to media control
         */
        addButtonToMediaControl() {
            var bar = (this as any).core
                .mediaControl
                .$el
                .children('.media-control-layer')
                .children('.media-control-right-panel');

            // create icon
            var button = document.createElement('button');
            button.classList.add('media-control-button');
            button.classList.add('media-control-icon');
            button.classList.add('media-control-subtitle-toggler');
            button.innerHTML = (this as any).getMediaControlButtonSVG();

            // if active, glow
            if((this as any).active)
                button.style.opacity = '1';

            // append to bar
            bar.append(button);

            // add listener
            (this as any).core.$el.on('click', (this as any).onMediaControlButtonClick.bind((this as any)));
        }

        /**
         * Button SGV
         * @return {string}
         */
        getMediaControlButtonSVG() {
            return '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve" style="pointer-events: none">' +
                '<metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>' +
                '<g><path d="M893.4,599V500H401.1V599H893.4z M893.4,794.5v-98.9H695.5v98.9H893.4z M598.9,794.5v-98.9H106.6v98.9H598.9z M106.6,500V599h197.8V500H106.6z M893.4,106.7c26.1,0,48.7,10,67.9,29.9s28.8,42.9,28.8,69v588.9c0,26.1-9.6,49.1-28.8,69c-19.2,19.9-41.8,29.9-67.9,29.9H106.6c-26.1,0-48.7-10-67.9-29.9c-19.2-19.9-28.8-42.9-28.8-69V205.5c0-26.1,9.6-49.1,28.8-69s41.8-29.9,67.9-29.9H893.4z"/></g>' +
                '</svg>';
        }

        /**
         * on button click
         */
        onMediaControlButtonClick(mouseEvent:any) {
            // (this as any) is a bit of a hack
            // it's ugly, I know, but I have yet to figure out how the click events work
            // so I'm bailing if click's target does not have the class 'media-control-subtitle-toggler'
            // I used (this as any) class 'media-control-subtitle-toggler' to identify the right element
            if(!mouseEvent.target.classList.contains('media-control-subtitle-toggler'))
                return;

            // This is also a bit of a hack.
            // We are preventing double clicks by checking the time the last click happened
            // if it's less then 300 miliseconds ago, we bail
            //if (new Date() - (this as any).lastMediaControlButtonClick < 300)
            //    return;

            // update lastMediaControlButtonClick
            (this as any).lastMediaControlButtonClick = new Date();

            // toggle active on/off
            if((this as any).active) {
                (this as any).active = false;
                mouseEvent.target.style.opacity = '.5';
                (this as any).hideElement();
            } else {
                (this as any).active = true;
                mouseEvent.target.style.opacity = '1';
            }
        }


        /**
         * Hides the subtitle element
         */
        hideElement() {
            (this as any).element.style.opacity = '0';
        }

        /**
         * Shows the subtitle element with text
         * @param {string} text
         */
        showElement(text:any) {
            if(!(this as any).active)
                return;
            (this as any).element.innerHTML = text;
            (this as any).element.style.opacity = '1';
        }

        /**
         * Subtitle element moves up
         * to give space to the controls
         */
        onMediaControlShow() {
            if((this as any).element)
                (this as any).element.style.bottom = '100px';
        }

        /**
         * Subtitle element moves down
         * when controls hide
         */
        onMediaControlHide() {
            if((this as any).element)
                (this as any).element.style.bottom = '50px';
        }

        /**
         * Show subtitles as media is playing
         */
        run(time:any) {
            var subtitle = (this as any).subtitles.find(function(subtitle:any) {
                return time.current >= subtitle.startTime && time.current <= subtitle.endTime
            });

            if(subtitle) {
                (this as any).showElement(subtitle.text);
            } else {
                (this as any).hideElement();
            }
        }

    };

  //  export const ClapprSubtitle = Clappr.CorePlugin.extend(ClapprSubtitleObject);