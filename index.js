const fs = require('fs')
const glob = require('glob')
const Promise = require('bluebird')

Promise.promisifyAll(fs)

const buildData = require('./src/build_data.js')

glob('../crave/webapp/src/**/*.js', (err, files) => {
  if(err) {
    console.error(err)
    return
  }

  let queue = []
  files.forEach(path => {
   const op =  fs.readFileAsync(path, 'utf-8').then((file) => {
      buildData.analyse(path.replace('../crave/webapp/src/', ''), file)
    })

    queue.push(op)
  })

  Promise.all(queue).then(() => {
   const results = buildData.results()
   fs.writeFile('./references.json', JSON.stringify(results, null, 4))
  })
})
