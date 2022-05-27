
let Get = (id) => {
    return document.getElementById(id);
}

export default {
    TextAreaBox: Get("TextAreaBox"),
    textInput: Get("textInput"),
    invList: Get("invList")
}