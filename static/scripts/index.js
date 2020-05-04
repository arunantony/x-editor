
(function(){
    // function which returns true or false to recognize a development environment
    const isDev = () => process.env.NODE_ENV === 'development';

    // either use the development path OR the production prefix to file location
    const directory = isDev() ? process.cwd().concat('/') : 'resources/app/';

    const fs = require('fs');
    const path = require('path');
    const { readTitles, handleNewFile } = require(path.resolve(directory,'actions/uiActions'));
    const { ipcRenderer } = require('electron'); 
    const { NEW_DOCUMENT_NEEDED, WRITE_NEW_FILE_NEEDED, NEW_FILE_WRITTEN, SAVE_NEEDED, SAVED } = require(path.resolve(directory,'actions/types'));

    readTitles(`${directory}data`).map(({title, dir}) => {
        el = document.createElement("li");
        text = document.createTextNode(`${title.split('.md')[0]}`);
        el.appendChild(text)
        el.addEventListener('click', function(e){ // clicking on sidebar titles
            fs.readFile(dir, (err, data) => {
            if (err) throw err;
            fileDir = dir;
            document.getElementById('content').innerHTML = data;
            });
        })
        document.getElementById('titles').appendChild(el)
    }) 

    // NEW_DOCUMENT_NEEDED
    ipcRenderer.on(NEW_DOCUMENT_NEEDED, (event , data) => {
        let form = document.getElementById('form')
            form.classList.toggle('show')
        document.getElementById('title_input').focus()
        form.addEventListener('submit', function(e){
            e.preventDefault()
            // write file here ?
            let fileName = e.target[0].value

            ipcRenderer.send(WRITE_NEW_FILE_NEEDED, {
                dir: `${directory}data/${fileName}.md`
            })
            
            ipcRenderer.on(NEW_FILE_WRITTEN, function (event, message) {
                handleNewFile(e, `${directory}data/${fileName}.md`, message)
            });
        })
    })

    /**
     * a visual indication the file needs saving and for that indication 
     * to be removed after the file is saved.
     */
    document.getElementById('content').onkeyup = e => { 
        if(!document.title.endsWith("*")){ 
            document.title += ' *' 
        }; 
        ipcRenderer.send(SAVE_NEEDED, { // alerting ./component/Menu.js
            content: e.target.innerHTML,
            fileDir
        })
    }

    /**
     * once the file is written, we sent an alert to the render section, 
     * with the message File Saved
     */
    ipcRenderer.on(SAVED, (event , data) => { // when saved show notification on screen
        el = document.createElement("p");
        text = document.createTextNode(data);
        el.appendChild(text)
        el.setAttribute("id", "flash");
        document.querySelector('body').prepend(el)
        setTimeout(function() { // remove notification after 1 second
            document.querySelector('body').removeChild(el);
            document.title = document.title.slice(0,-1) // remove asterisk from title
        }, 1000);
    });

})()
