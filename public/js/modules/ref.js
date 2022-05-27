
let Get = (id) => {
    return document.getElementById(id);
}

export default {
    TextAreaBox: Get("TextAreaBox"),
    textInput: Get("textInput"),
    invList: Get("invList"),
    headEQ: Get("headEQ"),
    hand: Get("hand"),
    torso: Get("torso"),
    bracers: Get("bracers"),
    legs: Get("legs"),
    feet: Get("feet"),
    itemOnDragged: Get("itemOnDragged"),
    body: document.body
}