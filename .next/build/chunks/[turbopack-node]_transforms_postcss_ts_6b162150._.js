module.exports = [
"[turbopack-node]/transforms/postcss.ts { CONFIG => \"[project]/nrg-website-dev/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "build/chunks/7de76_4eb7cdb4._.js",
  "build/chunks/[root-of-the-server]__5205e22c._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[turbopack-node]/transforms/postcss.ts { CONFIG => \"[project]/nrg-website-dev/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript)");
    });
});
}),
];