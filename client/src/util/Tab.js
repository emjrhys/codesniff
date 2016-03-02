/* Tab Strategy */
const TAB_REGEX = /\t/g; // Not the best regular expression I've ever came up with...

function tabStrategy(contentBlock, callback) {
    findWithRegex(TAB_REGEX, contentBlock, callback);
}

function findWithRegex(regex, contentBlock, callback) {
    const text = contentBlock.getText();
    let matchArr, start;
    while ((matchArr = regex.exec(text)) !== null) {
        start = matchArr.index;
        callback(start, start + matchArr[0].length);
    }
}

export default tabStrategy
