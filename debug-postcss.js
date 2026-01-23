const { cosmiconfig } = require('cosmiconfig')
;(async () => {
  try {
    const explorer = cosmiconfig('postcss')
    const result = await explorer.search(process.cwd())
    console.log('found:', result && result.filepath)
    if (result) console.log('config:', result.config)
  } catch (err) {
    console.error('error', err)
  }
})()
