export function createBtn(root) {
    let btn = document.createElement("button")
    btn.innerText = ("点击创建新元素");
    root.appendChild(btn);
    btn.onclick = function() {
        let ele = document.createElement("p");
        ele.classList.add("newcon")
        ele.innerText = "新元素的内容";
        root.appendChild(ele)
    }
}