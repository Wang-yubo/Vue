import { createHeader } from "./Header.js"
import { createContent } from "./Content.js"
import { createSidebar } from "./Sidebar.js"
import { createImg } from "./elimg.js";
import img1 from "../images/1.jpg";
import "../css/index.css";
import { createBtn } from "./create.js";
import { add, p } from "./math.js";

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