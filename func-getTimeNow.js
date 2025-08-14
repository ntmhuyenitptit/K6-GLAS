import http from 'k6/http';
import {sleep} from 'k6';
import crypto from 'k6/crypto';

export default function getTimeNow(){
	let now = new Date();
	let yyyy = now.getFullYear();
	let mm = String(now.getMonth() + 1).padStart(2, '0');
	let dd = String(now.getDate()).padStart(2, '0');
	let hh = String(now.getHours()).padStart(2, '0');
	let minute = String(now.getMinutes()).padStart(2, '0');
	let ss = String(now.getSeconds()).padStart(2, '0');
	return yyyy+mm+dd+hh+minute+ss;
}
console.log("gio hien tai la", getTimeNow());