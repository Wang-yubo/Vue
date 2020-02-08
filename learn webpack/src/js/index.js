import { createHeader } from "./Header.js"
import { createContent } from "./Content.js"
import { createSidebar } from "./Sidebar.js"
import { createImg } from "./elimg.js";
import img1 from "../images/1.jpg";
import "../css/index.css";

let root = document.querySelector("body");
createHeader(root)
createContent(root)
createSidebar(root)
createImg(root, img1)