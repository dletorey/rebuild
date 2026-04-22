import markdownit from 'markdown-it'
const md = markdownit()
// parse a single line not as paragraphs
const mdLine = (str) => {
  return md.renderInline(str);
};
// parse a block as paragraphs
const mdBlock = (str) => {
  return md.render(str);
};
export { mdLine, mdBlock };