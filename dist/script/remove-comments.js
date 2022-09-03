// Removes all comments from the HTML file.
document.body.innerHTML = document.body.innerHTML.replace(/<!--[\s\S]*?-->/g, "");
// Removes the tag that calls this script.
var removeCommentsSrc = document.querySelector('#remove-comments-src');
removeCommentsSrc.parentNode.removeChild(removeCommentsSrc);
