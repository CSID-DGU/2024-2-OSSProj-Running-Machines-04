const path = require('path')
const { webpack } = require('webpack')
const { alias } = require('yargs')

module.exports ={
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
    }
  }
}