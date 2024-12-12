import fs from 'fs'
import packageJson from '../package.json' with { type: "json" }
import dayjs from 'dayjs'


const version = packageJson.version + `.${dayjs().format('YYYYMMDDHHmmss')}`
fs.writeFileSync('./ota/package.json', JSON.stringify({
  name: "webtv-ota",
  version,
  files: ["update.json", "index.android.bundle.zip"]
}
))

fs.writeFileSync('./ota/update.json', JSON.stringify({
  version,
  downloadAndroidUrl: "index.android.bundle.zip",
  downloadIosUrl: "main.jsbundle.zip"
}
))


