var serverURL="http://restclass.azurewebsites.net/API2/Todos";
var todos = []
// var x=0; //to give item an id when created
function addToDo(){
    
    //get the value from input
    var text = $('#txt-task').val();
    
    var todo={
        text:text,
        user:"Briun",
        state:0 //new
    };
    //create the list item template 
    
    //display the li under the ul
    
    //set the focus to the input
    if(text==''){
        alert("please add text")
    }else{
        
        console.log(text);
        
        $('#txt-task').val('');
        var jsonString = JSON.stringify(todo);
    $.ajax({
        url:serverURL,
        type:"POST",
        contentType:"application/json",
        data:jsonString,
        success:function(response){
            console.log("it worked",response);
            displayToDo(todo);
        },
        error:function(response){
            console.log("failed", response)
        }
    })
    }
    $('#txt-task').focus();

    
}

function displayToDo(todo){

    if(todo.state==0){
        var li = `<li id="${todo.id}">${todo.text}<button onclick=markDone(${todo.id})>Done</button></li>`;
        $('#pending-list').append(li);
    }
    else{
        var li2=`
        <li>${todo.text}</li>`
        $("#doneToDos").append(li2)
    }
    
}

function markDone(id){
    console.log("item done", id)
    $('#'+id).remove();
    //in the todo array, find the one with matching ID
    for(var i=0; i<todos.length; i++){
        if(todos[i].id==id){
            todos[i].state = 1;
            displayToDo(todos[i])
        }
    }

}
// function deleteToDo(id){
//     console.log('deleting task ' + id)
//     var deleteMe = document.getElementById(id);
//     console.log(deleteMe);
//     deleteMe.remove();

// }

function loadData(){

    
        $.ajax({
            url:serverURL,
            type:"Get",
            success:function(res){
                console.log("it works",res)
                for(var i=0;i<res.length;i++){
                    if(res[i].user == "Briun" && res[i].text !=''){
                        todos.push(res[i]);
                        displayToDo(res[i]);
                    }
                    
                }
                
            },
            error:function(details){
                console.log("error getting data",details)
            }
        })
    
}

function init(){
    console.log("init the to do app");
    
    $('#txt-task').val('');
    $('#btn-add').click(addToDo);
    //sensing the user actions/events
    $("#txt-task").keypress(function(e){
        // console.log(e.key);
        if(e.key==="Enter"){
            console.log("you pressed enter");
            addToDo();
        }
    });
    loadData();
}

//when the browser finishes rendering html, execute init
window.onload=init;