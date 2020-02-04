import { createHeader } from "./Header.js"
import { createContent } from "./Content.js"
import { creatSidebar } from "./Sidebar.js"

let root = document.querySelector("body");
createHeader(root)
createContent(root)
creatSidebar(root)