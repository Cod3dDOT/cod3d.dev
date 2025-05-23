const main = () => {
	document.title = "HELLO FROM NIBBLET";
	return {
		success: true,
		message: "hello from nibblet"
	};
};

document.addEventListener(
	"run",
	(event) => {
		console.log(event);
		document.dispatchEvent(
			new CustomEvent("run", {
				detail: { namespace: "nibblet-test", main: main() }
			})
		);
	},
	false
);
