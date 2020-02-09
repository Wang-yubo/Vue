import "@babel/polyfill"

function add(a, b) {
    console.log(a + b);
}
let p = new Promise(() => {
    console.log("hello world");
})
export { add, p }