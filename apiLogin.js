import http from 'k6/http';
import { sleep } from 'k6';
import crypto from 'k6/crypto';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

import getTimeNow from './func-getTimeNow.js'
import checkApiSuccess from './func-checkApiSuccess.js'


let tokenList = [];

const csvData = papaparse.parse(open('./User List-20251308211915502.csv'), { header: true }).data;
export const options = {
  iterations: csvData.length,
};

  export default function () {
  const user = csvData[__ITER]; // mỗi iteration lấy 1 dòng trong CSV
  const url = 'http://dev.app.tsubaki-app.com:9119/';
  const hashedPassword = crypto.sha1(user.password, 'hex');
  console.log(user.email);
  console.log(user.password);
  console.log(hashedPassword);
  const payload = JSON.stringify({
    "api": "login_version_3",
    "email": user.email,
    "pwd": hashedPassword,
    "os_version": "",
    "device_type": 5,
    "application_version": "100.0",
    "application": "tsubaki",
    "login_time": getTimeNow(),
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
  let responseLogin = JSON.parse(res.body);
  console.log(responseLogin);
  console.log(responseLogin.data.token);
  console.log('api co success khong?', checkApiSuccess(res.body,"login_version_3"));
  // Lấy token từ response
  let token = responseLogin.data.token;
  // Thêm token mới vào mảng
  tokenList.push(token);
  // Log ra để kiểm tra
  console.log("Updated token list:", tokenList);
}