
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import generatePackageJSON from 'rollup-plugin-generate-package-json';

import packageJson from './package.json' assert { type: "json" };
import tailwindConfig from './tailwind.config.js';


export default [
    {
    input: "src/index.ts",
    output: [
        {
            file: packageJson.module,
            format: "esm",
            sourcemap: true,
        },
    ],
    plugins: [
        resolve(),
        commonjs(),
        typescript({ tsconfig: "./tsconfig.json" }),
        postcss({
            extensions: ['.css', '.module.css'],
            plugins: [autoprefixer(), tailwindcss(tailwindConfig)],
        }),
        generatePackageJSON({
            //create new json file
            outputFolder: "shared-component",
            baseContents: (pkg) => ({
              name: pkg.name,
              version: packageJson.version,
              author: packageJson.author,
              license: packageJson.license,
              main: "dist/index.js",
              peerDependencies: {
                react: packageJson.devDependencies.react,
              },
              type: packageJson.type,
              //should start from dist
              module: "dist/index.js",
              files: packageJson.files,
              //should start from dist
              types: "dist/index.d.ts",
              publishConfig: packageJson.publishConfig
            }),
        }),
    ],
    },
    {
        input: "shared-component/dist/types/index.d.ts",
        output: [{ file: "shared-component/dist/index.d.ts", format: "esm" }],
        plugins: [dts()],
    },
]