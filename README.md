# electron-inferno-typescript-starter
Pre-configured Electron v6 + Inferno + TypeScript + Webpack v4 starter project

## Getting started
```bash
// execute
git clone https://github.com/ayonsaha2011/electron-inferno-typescript-starter.git
```


Then install all the `node_modules` needed by executing the following command:
```bash
cd folder-containing-the-cloned-starter
npm run install
```

Finally execute the following command to start you application.
```bash
npm start
```

## Building the installer for your Electron app
The starter is currently configured to package & build the installer of 
your app for macOS & Windows using `electron-builder`. 

For macOS, execute:
```bash
npm run build:mac
```

For Windows, execute:
```bash
npm run build:win
```

## Author

[Ayon Saha](https://github.com/ayonsaha2011) [@ayonsaha2011](https://github.com/ayonsaha2011)

## License
Electron Inferno TypeScript Webpack starter is open source software 
[licensed as MIT](LICENSE).