function todo_counter(){
    let children = document.getElementById("todo_list").childElementCount;
    document.getElementById("todo__label").innerHTML="Todo List ("+ children +" remaining)";
}

function create_element(){
    const new_element = document.createElement("div");
    new_element.innerHTML = 
        document.getElementById("todo_form__input").value +
        "<button class='delete_button' onclick=delete_element(this)>delete</button>" +
        "<button>done</button>";
    new_element.classList.add("todo_element");
    return new_element
}

function add_element(){
    const new_element = create_element();
    document.getElementById("todo_list").appendChild(new_element);
    todo_counter();
}

function delete_element(elem){
    elem.parentNode.remove();
    todo_counter();
}

function clear_all(){
    document.querySelectorAll(".todo_element").forEach(elem => {
        elem.remove();
    });
    todo_counter();
}