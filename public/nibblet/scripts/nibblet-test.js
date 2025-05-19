const main = () => {
	document.title = "HELLO FROM NIBBLET";
	return {
		success: true,
		message: "hello from nibblet"
	};
};

document.addEventListener(
	"script-utils-event[RUN]",
	document.dispatchEvent(
		new CustomEvent("script-utils-event[RUN]", { detail: main() })
	),
	false
);
