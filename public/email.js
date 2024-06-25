// https://shreve.io/posts/obfuscating-your-email-on-the-web/

const bytes = (str) => str.split('').map((c) => c.charCodeAt(0));
const str = (bytes) => bytes.map((b) => String.fromCharCode(b)).join('');
const byte_xor = (b1, b2) => b1.map((b, i) => b ^ b2[i]);
const ebytes = [0, 0, 0, 0, 0, 110, 7, 10, 18, 51, 100, 46, 100, 101, 118];

let emailLink = document.getElementById('mail');
if (emailLink) {
	emailLink.addEventListener('click', (e) => {
		e.preventDefault();

		// Get the hostname and repeat as needed for length
		let host = location.hostname;
		while (host.length < ebytes.length) {
			host = host + host;
		}

		// XOR the host with ebytes
		let email = str(byte_xor(ebytes, bytes(host)));

		// And send an email to the result
		window.location = 'mailto:' + email;
	});
}
