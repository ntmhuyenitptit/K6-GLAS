import http from 'k6/http';
import { sleep } from 'k6';
import {check} from 'k6';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import crypto from 'k6/crypto';

const csvData = papaparse.parse(open('C:\\Users\\huyen.nguyen13\\Desktop\\perfomance\\UserList.csv'), { header: true }).data;
export const options = {
  iterations: csvData.length,
};

  export default function () {
  const user = csvData[__ITER]; // mỗi iteration lấy 1 dòng trong CSV
  const url = 'http://dev.app.tsubaki-app.com:9119/';
  const hashedPassword = crypto.sha1('Hello world', 'hex');
  console.log(user.email);
  console.log(hashedPassword);
  const payload = JSON.stringify({
    "api": "login_version_3",
    "email": user.email,
    "pwd": hashedPassword,
    "os_version": "",
    "device_type": 5,
    "application_version": "100.0",
    "application": "tsubaki",
    "login_time": "20250426184802",
    "device_name": "Web",
    "applicaton_type": 5,
    "notify_token": "",
    "allow_send_real_gift": true,
    "device_id": "",
    "idfa": "",
    "voip_notify_token": ""
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);
  console.log(res.body);
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
}