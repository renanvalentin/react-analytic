const fs = require('fs')
const glob = require('glob')

glob('../crave/webapp/src/**/*.js', (err, files) => {
  if(err) {
    console.error(err)
    return
  }

  console.log(files)

  files.forEach(file => fs.readFile())
})
