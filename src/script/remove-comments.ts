/*
	This script removes all the comments in the original
	HTML code.
	It should be placed before any other script tag with
	a defer attribute.
*/

// Removes all comments from the HTML file.
document.body.innerHTML = document.body.innerHTML.replace(/<!--[\s\S]*?-->/g, "");

// Removes the tag that calls this script.
const removeCommentsSrc = document.querySelector('#remove-comments-src');
removeCommentsSrc.parentNode.removeChild(removeCommentsSrc);

