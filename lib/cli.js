const fs = require('fs')
const path = require('path')
const glob = require('glob')
const Promise = require('bluebird')

Promise.promisifyAll(fs)

const configPath = path.join(process.cwd(), './.react-analytic.json')
const config = JSON.parse(fs.readFileSync(configPath, 'UTF-8'))

const buildData = require('./build_data.js')

if(!config) {
  throw new Error('Could not locate config in your package.json')
}

glob(path.join(config.root, '**/*.js'), (err, files) => {
  if(err) {
    console.error(err)
    return
  }

  var queue = []
  files.forEach(path => {
   const op =  fs.readFileAsync(path, 'utf-8').then((file) => {
      buildData.analyse(path.replace(config.root, ''), file, config.whitelist)
    })

    queue.push(op)
  })

  Promise.all(queue).then(() => {
   const results = buildData.results()

   fs.writeFile(path.join(__dirname,'../app/data.json'), JSON.stringify(results, null, 4))
  })
})
