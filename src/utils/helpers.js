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

// ray test touch <
import axios from 'axios';

import {
  USERSTACK_API_URL,
  USERSTACK_API_KEY,
  CORS_ANYWHERE,
  ANDROID_BENCHMARKS_URL,
  IOS_BENCHMARKS_URL,
  MAC_BENCHMARKS_URL
} from '../config';

const getDeviceClass = async () => {
  try {
    const uastring = navigator.userAgent;
    console.log('ray : uastring => ', uastring);

    const { data: { brand, name, device } } = await axios.get(`${USERSTACK_API_URL}?access_key=${USERSTACK_API_KEY}&ua=${uastring}`);
    console.log('ray : brand, name, device => ', brand, name, device);

    if (device.is_mobile_device) {
      const { data: { devices: androidBenchmarks } } = await axios.get(`${CORS_ANYWHERE}${ANDROID_BENCHMARKS_URL}`);
      const { data: { devices: iosBenchmarks } } = await axios.get(`${CORS_ANYWHERE}${IOS_BENCHMARKS_URL}`);
      const { data: { devices: macBenchmarks } } = await axios.get(`${CORS_ANYWHERE}${MAC_BENCHMARKS_URL}`);
      const allBenchmarks = [...androidBenchmarks, ...iosBenchmarks, ...macBenchmarks];
      console.log('ray : allBenchmarks => ', allBenchmarks);

      const modelName = `${brand} ${name}`;
    }

  } catch (error) {
    console.log('[getDeviceClass] error => ', error);
  }

  return 'heavy';
};

export { getDeviceClass };
// ray test touch >
