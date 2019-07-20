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

import axios from 'axios';

import { CORS_ANYWHERE, ANDROID_BENCHMARKS_URL, IOS_BENCHMARKS_URL, MAC_BENCHMARKS_URL } from '../config';

const getDeviceClass = () => {
  const uastring = navigator.userAgent;
  
  console.log('ray : uastring => ', uastring);

  axios.get(`${CORS_ANYWHERE}${ANDROID_BENCHMARKS_URL}`)
    .then(response => {
      console.log('ray : ***** response => ', response);
    })
    .catch(error => {
      console.log('ray : ***** error => ', error);
    });
  // const iosBenchmarks = await axios.get(IOS_BENCHMARKS_URL);
  // const macBenchmarks = await axios.get(MAC_BENCHMARKS_URL);

  // console.log('ray : androidBenchmarks => ', androidBenchmarks);

  return 'heavy';
};

export { getDeviceClass };
