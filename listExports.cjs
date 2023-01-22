const listExports = require('list-exports')
const path = require('path')
listExports(path.resolve('./package.json'))
  .then(output => {
    console.log(output)
    process.exit(0)
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
