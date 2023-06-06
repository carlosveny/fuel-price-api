const axios = require('axios')

const ARGS = process.argv.slice(2)
const URL = `URL_TO_YOUR_DEPLOY_SERVER?repo=${ARGS[0]}`

console.log(`Updating repo "${ARGS[0]}"`)
axios.get(URL)
  .then((response) => console.log('\x1b[32m%s\x1b[0m', response.data))
  .catch((error) => console.error('\x1b[31m%s\x1b[0m', `${error.response.data}\n`))
