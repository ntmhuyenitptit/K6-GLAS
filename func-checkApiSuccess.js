import http from 'k6/http';
import {sleep} from 'k6';
import crypto from 'k6/crypto'; 

export default function checkApiSuccess(apiResponse, apiName){
	let apiResponseBody = JSON.parse(apiResponse);
	if (apiResponseBody.code == 0){
		return true;
	}
	else return false;
}