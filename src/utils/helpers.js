/*
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import UAParser from 'ua-parser-js';

const getDeviceClass = () => {
    // Detect device model from UA
    const parser = new UAParser();
    const uastring = navigator.userAgent;
    
    // ray test touch <
    console.log('ray : uastring => ', uastring);
    // ray test touch >

    // ray test touch <
    // TODO: no need to set it, perhaps it should be handled inside the mechanism
    // parser.setUA(uastring);
    // ray test touch >

    const device = parser.getDevice();
    // ray test touch <
    console.log('ray : device => ', device);
    console.log('ray : parser.getResult => ', parser.getResult());
    // ray test touch >

    const model = device.model;
    console.log('[helpers] device model => ', model);

    // Match against devices you consider low-end
    const lowEnd = [
        'Nexus 4',
        'Nexus 5',
        'Nexus 5X',
        'Nexus 6',
        'Redmi Note 6 Pro',
        'ONE' // Alcatel 1X
    ];
    // Optional: map to device-year-class, Geekbench.
    return lowEnd.indexOf(model) > 0 ? 'light' : 'heavy'
};

export { getDeviceClass };
