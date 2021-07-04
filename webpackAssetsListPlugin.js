const path = require("path");
const fs = require("fs");

// see https://webpack.js.org/contribute/writing-a-plugin/
class WebpackAssetsListPlugin {

    constructor(options = {}) {
        this.options = { ...WebpackAssetsListPlugin.defaultOptions, ...options };
    }

    static defaultOptions = {
        outputFile: "sw.js"
    };

    static urlsListPattern  = `"__SERVICE_WORKER_URLS"`;
    static cacheNamePattern = `"__SERVICE_WORKER_CACHE_NAME"`;

    apply(compiler) {
        const pluginName = WebpackAssetsListPlugin.name;

        compiler.hooks.afterEmit.tap(pluginName, (compilation) => {

            const content =
                Object.keys(compilation.assets)
                    .filter((filename) => {
                        return (
                            !filename.endsWith(this.options.outputFile)
                            && !filename.endsWith(this.options.outputFile + ".map")
                        );
                    })
                    .map((filename) => `"/${filename}"`)
                    .join(",");

            const filePath = path.resolve(
                this.options.dir,
                this.options.outputFile
            );

            const fileContent = fs.readFileSync(filePath, "utf8");

            const changedFileContent = fileContent
                .replace(WebpackAssetsListPlugin.urlsListPattern, content)
                .replace(WebpackAssetsListPlugin.cacheNamePattern, `"${new Date().valueOf()}"`);
            fs.writeFileSync(filePath, changedFileContent);
        });
    }
}

module.exports = WebpackAssetsListPlugin;
