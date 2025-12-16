const listExports = require("list-exports");
const path = require("node:path");

listExports(path.resolve("./package/package.json"))
	.then(() => {
		// console.log(JSON.stringify(output, undefined, '  '))
		process.exit(0);
	})
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
