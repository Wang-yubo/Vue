export function createContent(root) {
    let elContent = document.createElement("div")
    elContent.innerText = ("网页的主要内容");
    root.appendChild(elContent);
}