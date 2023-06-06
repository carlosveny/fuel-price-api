const axios = require('axios')

const args = process.argv.slice(2)
const url = `URL_TO_YOUR_DEPLOY_SERVER?repo=${args[0]}`

console.log(`Updating repo "${args[0]}"`)
axios.get(url)
  .then((response) => console.log('\x1b[32m%s\x1b[0m', response.data))
  .catch((error) => console.error('\x1b[31m%s\x1b[0m', `${error.response.data}\n`))
