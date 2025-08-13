import http from 'k6/http';
import { sleep } from 'k6';
import crypto from 'k6/crypto';
import apiTime from 'func-getTimeNow.js'
import checkApiSuccess from 'func-checkApiSuccess.js'
import { csvData } from './csvData';

const csvData = papaparse.parse(open('User List-20251308211915502.csv'), { header: true }).data;
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
    "login_time": apiTime(),
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
  console.log('api co success khong?', checkApiSuccess(loginRespons,"login_version_3"));
}