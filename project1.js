//if user add a note, add it to the localstorage
showNotes(); //show all notes after refreshing page also

let addBtn=document.getElementById('addBtn');

//function to add notes
addBtn.addEventListener("click", function(e){
    let addTxt=document.getElementById('addTxt');
    let addTitle=document.getElementById('addTitle');
    let notes=localStorage.getItem("notes");
    if(notes==null){
        notesObj=[]; //all notes can save in array
    }
    else
    {
        notesObj=JSON.parse(notes);
    }
    let myObj={
        title:addTitle.value,
        text:addTxt.value
    }
    notesObj.push(myObj); //add note on array
    localStorage.setItem("notes", JSON.stringify(notesObj)); //notes are convert into string format
    addTxt.value=""; //then textbox is empty after adding note automatically
    addTitle.value="";
    // console.log(notesObj);  
    showNotes(); //show all notes
});

//function to show element from localStorage
function showNotes(){
    let notes=localStorage.getItem("notes"); //take all notes
    if(notes==null){
        notesObj=[];
    }
    else
    {
        notesObj=JSON.parse(notes);
    }
    let html="";  //card can added here below
    notesObj.forEach(function(element,index){
        html+=`
                <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text">${element.text}</p>
                        <button id="${index}" onClick="UpdateNote(this.id)" class="btn btn-primary">Update Note</button>
                        <br>
                        <br>
                        <button id="${index}" onClick="deleteNote(this.id)" class="btn btn-danger">Delete Note</button>
                    </div>
                </div> `;
    });
    let notesElem=document.getElementById("notes");
    if(notesObj.length!=0){
        notesElem.innerHTML=html;
    }
    else{
        notesElem.innerHTML=`Nothing to show...! Use "Add a Note" section above to add notes....`;
    }
}

//function to delete note
function deleteNote(index){
    // console.log("delete the note successfully..",index);
    let notes=localStorage.getItem("notes");
    if(notes==null){
        notesObj=[];
    }
    else
    {
        notesObj=JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObj)); //localStorage update automatically after delete a note
    showNotes();
}

//function to Update note
function UpdateNote(index){
    let notes=localStorage.getItem("notes");
    if(notes==null){
        notesObj=[];
    }
    else
    {
        notesObj=JSON.parse(notes);
    }
    notesObj.find((element, index)=>{
        addTitle.value=element.title,
        addTxt.value=element.text
    })
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
}

//function to Searching notes
let search=document.getElementById("searchTxt");
search.addEventListener("input", function(){ 

    let inputVal=search.value.toLowerCase();
    // console.log("input event fired..",inputVal);
    let noteCards=document.getElementsByClassName("noteCard");
    //function for matching user searched data to card data
    Array.from(noteCards).forEach(function(element){ 
        let cardTxt=element.getElementsByTagName("p")[0].innerText;
        // console.log(cardTxt);
       if(cardTxt.includes(inputVal)){
            element.style.display="block";
       } 
       else{
        element.style.display="none";
       }
    });
})
