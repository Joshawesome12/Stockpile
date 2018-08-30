const marked = require('marked');
const { remote, ipcRenderer } = require('electron');
const mainProcess = remote.require('./main');
const currentWindow = remote.getCurrentWindow();

const markdownView = document.querySelector('#markdown');
const htmlView = document.querySelector('#html');
const newFileButton = document.querySelector('#new-file');
const openFileButton = document.querySelector('#open-file');
const saveMarkdownButton = document.querySelector('#save-markdown');
const revertButton = document.querySelector('#revert');
const saveHtmlButton = document.querySelector('#save-html');

let filePath = null;
let originalContent = '';

const renderMarkdownToHtml = (markdown) => {
	htmlView.innerHTML = marked(markdown, {sanitize: true});
}

markdownView.addEventListener('keyup', (event) => {
	const currentContent = event.target.value;
	renderMarkdownToHtml(event.target.value);
	currentWindow.setDocumentEdited(currentContent !== originalContent);
});

newFileButton.addEventListener('click', () => {
	mainProcess.createWindow();
});

openFileButton.addEventListener('click',() => {
	mainProcess.openFile(currentWindow);
})

ipcRenderer.on('file-opened', (event, file, content) => {
	filePath = file;
	originalContent = content;

	markdownView.value = content;
	renderMarkdownToHtml(content);
});
