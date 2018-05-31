import babel from 'rollup-plugin-babel'

export default {
  input: 'src/Urano.js',
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ],
  output: {
    file: 'lib/urano.js',
    format: 'cjs'
  }
}