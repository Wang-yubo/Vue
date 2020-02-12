import { createHeader } from "./Header.js"
import { createContent } from "./Content.js"
import { createSidebar } from "./Sidebar.js"
import { createImg } from "./elimg.js";
import img1 from "../images/1.jpg";
import "../css/index.css";
import { createBtn } from "./create.js";
import { add } from "./math.js";

function getComponent() {
    return import ( /*webpackChunkName:"lodash"*/ "lodash").then(({ default: _ }) => {
        let ele = document.createElement("div");
        ele.innerText = _.join(["a", "b", "c"], "----");
        return ele
    })
}

getComponent().then((ele) => {
    document.body.appendChild(ele);
});



let root = document.querySelector("body");
createHeader(root)
createContent(root)
createSidebar(root)
createImg(root, img1)
createBtn(root)
add(10, 20)
if (module.hot) {
    module.hot.accept("./Content.js", () => {
        createContent(root)
    })
}