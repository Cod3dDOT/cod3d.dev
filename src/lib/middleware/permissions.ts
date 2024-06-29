import { middlewareFunctionReturn } from '.';

const PERMISSIONS_BASE = {
	fullscreen: '(self)',
	'picture-in-picture': '(self)',
	'clipboard-write': '(self)',
	'attribution-reporting': '(self)',
	'compute-pressure': '(self)',
	accelerometer: '()',
	autoplay: '()',
	bluetooth: '()',
	'browsing-topics': '()',
	camera: '()',
	'display-capture': '()',
	gamepad: '()',
	geolocation: '()',
	gyroscope: '()',
	hid: '()',
	magnetometer: '()',
	microphone: '()',
	midi: '()',
	'otp-credentials': '()',
	payment: '()',
	serial: '()',
	usb: '()',
	'xr-spatial-tracking': '()'
};

export function PERMISSIONS(
	requestHeaders: Headers,
	responseHeaders: Headers
): middlewareFunctionReturn {
	responseHeaders.set(
		'Permissions-Policy',
		Object.entries(PERMISSIONS_BASE)
			.map(([key, value]) => `${key}=${value}`)
			.join(',')
	);
	return {
		requestHeaders,
		responseHeaders
	};
}
