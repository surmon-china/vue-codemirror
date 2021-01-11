import _CodeMirror from 'codemirror'

const globalCodeMirror = () => {
  return process.env.EXCLUDE_GLOBAL_CODEMIRROR ? undefined : window.CodeMirror
}

const CodeMirror = globalCodeMirror() || _CodeMirror

export default CodeMirror


