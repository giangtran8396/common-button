
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss'


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
    ],
    },
    {
        input: "dist/esm/types/index.d.ts",
        output: [{ file: "dist/index.d.ts", format: "esm" }],
        plugins: [dts()],
        external: [/\.css$/]
    },
]