# X-Editor

X-editor is a sample application using Electron Js which uses the electron-packager that bundles Electron-based application source code with a renamed Electron executable and supporting files into folders ready for distribution.

The X-editor is having the following limitted features only:

  - Read predefined static "md" files from the file sustem and display the contents.
  - Edit and update the "md" files.
  - Create new file
  - Supports basic text editor operations like edit, cut, copy, paste etc.

### Tech

X-editor uses the following open source projects to work properly:

* [electron] - The Electron framework lets you write cross-platform desktop applications using JavaScript, HTML and CSS. It is based on Node.js and Chromium and is used by the Atom editor and many other apps.
* [electron-packager] - a command line tool and Node.js library that bundles Electron-based application source code
* [cross-env] - Run scripts that set and use environment variables across platforms

### Running the App

Install the dependencies and devDependencies and start the application.

```sh
$ cd x-editor
$ npm install -d
$ npm start
```

### Bundle App using electron-packager

For current OS, which is developing the App...

```sh
$ npm run package-current
```

For all supported OS

```sh
$ npm run package-all
```
After completing the build, there will be a folder named "release-builds" having the curresponding builds taken.


### Todos

 - Currently nothing in scope
 
### References
 - https://dev.to/aurelkurtula/creating-a-text-editor-in-electron-reading-files-13b8

   [electron]: <https://www.npmjs.com/package/electron>
   [electron-packager]: <https://www.npmjs.com/package/electron-packager>
   [cross-env]: <https://www.npmjs.com/package/cross-env>
   
