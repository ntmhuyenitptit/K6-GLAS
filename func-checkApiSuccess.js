import http from 'k6/http';
import {sleep} from 'k6';
import crypto from 'k6/crypto'; 

export default function checkApiSuccess(apiResponse, apiName){
	//let apiResponse = res.json();
	if (apiResponse.code === 0){
		return true;
	}
	else return false;
}