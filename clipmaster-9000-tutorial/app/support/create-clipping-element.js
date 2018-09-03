const $ = require('jquery');

module.exports = (text) => {
  return $(`
    <div class="clippings-list-item">
      <div class="clipping-text" disable="true">${text}</div>
        <div class="clipping-controls">
          <button class="copy-clipping">&rarr; Clipboard</button>
          <button class="publish-clipping">Publish</button>
          <button class="remove-clipping">Remove</button>
      </div>
    </div>
  `);
};
