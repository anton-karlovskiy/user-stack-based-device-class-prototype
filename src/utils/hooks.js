
import { useState, useEffect } from 'react';
import axios from 'axios';

import {
  CORS_ANYWHERE,
  USERSTACK_API_URL,
  USERSTACK_API_KEY,
  ANDROID_BENCHMARKS_URL,
  // IOS_BENCHMARKS_URL
} from '../config';

const unsupportMessage = 'The device is not detected.';

const useDeviceClass = () => {
  const [deviceParamSet, setDeviceParamSet] = useState(null);

  useEffect(() => {
    const getDeviceClass = async () => {
      let matchedBenchmark;
      try {
        const uastring = navigator.userAgent;
  
        const { data: { brand, name, device } } = await axios.get(`${USERSTACK_API_URL}?access_key=${USERSTACK_API_KEY}&ua=${uastring}`);
    
        if (device.is_mobile_device) {
          const { data: { devices: androidBenchmarks } } = await axios.get(`${CORS_ANYWHERE}${ANDROID_BENCHMARKS_URL}`);
          // iOS devices are not supported in userstack.com for now, but you can get accurate device info in deviceatlas.com
          // const { data: { devices: iosBenchmarks } } = await axios.get(`${CORS_ANYWHERE}${IOS_BENCHMARKS_URL}`);
          const allBenchmarks = [...androidBenchmarks/*, ...iosBenchmarks*/];
    
          const modelName = `${brand} ${name}`;
          matchedBenchmark = allBenchmarks.find(benchmark => benchmark.name === modelName);
        }
      } catch (error) {
        console.log('[getDeviceClass] error => ', error);
      }
  
      if (matchedBenchmark) {
        setDeviceParamSet({...matchedBenchmark});
      } else {
        setDeviceParamSet({unsupportMessage});
      }
    };
    
    getDeviceClass();
  }, []);

  return deviceParamSet;
};

export { useDeviceClass };
