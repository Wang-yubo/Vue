export function createImg(root, src) {
    let elImg = document.createElement("img");
    elImg.src = src;
    root.appendChild(elImg);
}