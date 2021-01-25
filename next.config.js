// next.config.js
const path = require('path')

// Code used from react-three-next starter 
// https://github.com/pmndrs/react-three-next/blob/main/next.config.js

// custom transpile module
const debug = false
let start = null
let i = 0

const match = (path) => {
    if (!path.includes('three/examples/jsm')) return false
    if (debug) {
        // should be around 3/4 seconds the first time and then 200ms after using Webpack 5 built-in loader cache
        let end = start ? new Date() - start : 0
        console.log(
            `\x1b[37m`,
            `🚄 ${end}ms - The transpilation ${path} in process`
        )
        if (i === 1) {
            start = new Date()
        }
        i++
    }
    return true
}

const nextConfig = {
    webpack(config) {
        config.module.rules.push(
            { test: /react-spring/, sideEffects: true }, // prevent vercel to crash when deploy
            {
                test: /\.(glsl|vs|fs|vert|frag)$/,
                exclude: /node_modules/,
                use: ['raw-loader', 'glslify-loader'],
            }
        )
        return config
    },
}


const withPlugins = require('next-compose-plugins');

const withSass = require("@zeit/next-sass");

const withImages = require('next-images')
const { default: next } = require('next')

const withTM = require('next-transpile-modules')(
    ['three'], // '@react-three/postprocessing'
    { debug: debug, unstable_webpack5: false, match } // symlink-caused loops which cause memory to get bloated exponentially.
)
module.exports = withPlugins([
    withImages,
    withSass,
    withTM], nextConfig), {
    webpack: (config) => {

    }
}

