## CHANGELOG

### v5.1.0 (2022-06-12)

- Upgrade codemirror dependencies to 6.x
- The package no longer exports `@codemirror/view` `@codemirror/state` `@codemirror/basic-setup`.
- Change the package [from `@codemirror/example-setup` to just `codemirror`](https://github.com/codemirror/basic-setup/blob/main/CHANGELOG.md#breaking-changes).

### v5.0.1 (2022-05-14)

- Use the correct version dependencies for the `@codemirror/*` package.

### v5.0.0-beta.1

- Upgrade to Vue@3
- Upgrade to CodeMirror@v6

### v4.0.6

- add textarea name prop with #82

### v4.0.5

Enable switching from/to DiffView based on 'merge' prop status(merge pr 65).

### v4.0.4

optimize events and refresh function.

### v4.0.3

add props placeholder

### v4.0.2

- add `scroll` event

### v4.0.1

- the components `options` attr is not required

### v4.0.0

- fix import es module bug
- add test script
- assign options to ssr.js
- add global default events
- update the options assign logic
- add global default options
- update `editor` to `codemirror`

#### project

- add brower support
- add test scripts
- update babel and webpack configs
