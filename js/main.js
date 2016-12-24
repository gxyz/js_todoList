var doingTodo = [];
var finishTodo = [];


window.onload = function () {

    var input_todo = document.getElementById('input-todo');
    var show_todo  = document.getElementById("show-todo");
    var all_link = document.querySelectorAll('.nav-item a');

    input_todo.addEventListener('keydown', function(event) {
        if (event.keyCode == 13 && event.target.value.length >= 3) {
            addLi(event.target, show_todo);

        }
    })

    show_todo.addEventListener('click', function(event) {
        event.target.setAttribute("class", "finish");
        removeEle(doingTodo, event.target);
        finishTodo.push(event.target);
        if (location.hash.slice(1) === '/doing') {
            show_todo.removeChild(event.target);        
        }
    }, false)
    
    window.addEventListener('hashchange', function() {
        if (location.hash.slice(1) === '/doing') {
            removeAllChild(show_todo);
            selected('doing', all_link);
            for (var i = 0; i < doingTodo.length; i++) {
                addLi2(doingTodo[i], show_todo);
            }
        } else if (location.hash.slice(1) === '/finish') {
            removeAllChild(show_todo);
            selected('finish', all_link);
            for (var i = 0; i < finishTodo.length; i++) {
                addLi2(finishTodo[i], show_todo);
            }
        } else {
            removeAllChild(show_todo);
            selected('all', all_link);
            for (var i = 0; i < doingTodo.length; i++) {
                addLi2(doingTodo[i], show_todo);
            }
            for (var j = 0; j < finishTodo.length; j++) {
                addLi2(finishTodo[j], show_todo);
            }
        }
    })

}

// 添加 todo
function addLi(target, list) {
    var new_li = document.createElement("li");
    new_li.setAttribute("class", "todo-item");
    new_li.appendChild(document.createTextNode(target.value));
    list.appendChild(new_li);
    doingTodo.push(new_li);
    target.value = ""
}


function addLi2(text, list) {
    list.appendChild(text);
}

// 移除数组中指定的元素
function removeEle(arr, element) {
    var index = arr.indexOf(element);
    arr.splice(index, 1);
}

// 删除元素的所有子节点
function removeAllChild(list)
{
    while(list.hasChildNodes()) //当div下还存在子节点时 循环继续
    {
        list.removeChild(list.firstChild);
    }
}

function selected(text, all_link) {
    var goal = document.getElementById(text);

    for (var i = 0; i < all_link.length; i++) {
        all_link[i].removeAttribute('class');
    }
    goal.setAttribute('class', 'selected');
}