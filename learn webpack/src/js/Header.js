export function createHeader(root) {
    let elHeader = document.createElement("p");
    elHeader.innerHTML = "<i class='iconfont icon-dahongdenglong' style='font-size:24px;color:red'></i>网页中的主要段落";
    root.appendChild(elHeader);
}