import fs from 'fs'
import { favicons } from 'favicons'
import execPhp from 'exec-php'
import { dirname } from 'path'

/**
 * Get config from php file !
 * @returns object
 */
const getconfig = () => {
  return new Promise((resolve, reject) => {
    execPhp('./inc/index.php', (err, php, out) => {
      if (err) {
        reject(err)
      }
      php.getconfig((err, result, output, printed) => {
        resolve(result)
      })
    })
  })
}

// find theme dir name
export function getThemDir() {
  const _path = process.cwd().split('/')
  return _path[_path.length - 1]
}

const config = await getconfig()
console.log(config)
// logo source
const source = config.source
// directory for build
const target = './icons/dist/'
// php file to include to head
const phpHead = './inc/pwa_head.php'
// tag filter to remove
const removeList = [
  'mobile-web-app-capable',
  'apple-mobile-web-app-capable',
  // 'manifest',
]

const configuration = {
  path: `/wp-content/themes/${getThemDir()}/icons/dist`,
  appName: config.appName,
  appShortName: config.appShortName,
  appDescription: config.appDescription,
  background: config.background,
  theme_color: config.theme_color,
  lang: config.lang,
  appleStatusBarStyle: 'default', // Style for Apple status bar: "black-translucent", "default", "black". `string`
  display: 'standalone', // Preferred display mode: "fullscreen", "standalone", "minimal-ui". `string`
  orientation: 'any', // Default orientation: "any", "natural", "portrait" or "landscape". `string`
  // scope: '/',
  start_url: '/',
  preferRelatedApplications: false,
  pixel_art: false,
  loadManifestWithCredentials: false,
  manifestMaskable: false,
  icons: {
    coast: false,
    yandex: false,
    windows: false,
  },
  shortcuts: [],
  output: {
    images: true,
    files: true,
    html: true,
  },
}

try {
  // delete dist
  fs.rmSync(target, { recursive: true, force: true })
  console.log(`${target} is deleted!`)

  // create dist directory
  fs.mkdirSync(target)
  console.log(`${target} is created.`)

  const response = await favicons(source, configuration)

  // create manifest file
  if (response.files.length > 0) {
    const manifest = response.files[0].contents
    fs.writeFileSync(`${target}manifest.webmanifest`, manifest)
  }

  // create images
  response.images.map((image) => {
    fs.writeFileSync(`${target}${image.name}`, image.contents)
  })

  // head generated
  const head = response.html

  // remove element from removeList
  removeList.forEach((l) => {
    const index = head.findIndex((e) => e.includes(l))
    if (index) {
      head.splice(index, 1)
    }
  })

  // create head for include in page
  fs.writeFileSync(
    phpHead,
    `<?php
    add_action('wp_head', function () {
    echo '${head.join('')}';
    });
  `,
  )
} catch (error) {
  console.log(error.message)
}
