const taskContainer=document.querySelector(".task_container")
const modalContainer=document.querySelector(".modal-container")
//const searchBar = document.getElementById("searchBar");
let globalTaskData=[];


const generateHtml = (taskData) => 

` <div id=${taskData.id}  class="col-md-6 col-lg-4 my-5">

    <div class="card">
      <div class="card-header gap-2 d-flex justify-content-end">
        <button class="btn btn-outline-info"  name=${taskData.id} onClick="editCard.apply(this, arguments)">
          <i class="fas fa-pencil-alt"  name=${taskData.id}></i>
        </button>
        <button class="btn btn-outline-danger" name=${taskData.id} onClick="deleteCard.apply(this, arguments)">
          <i class="fas fa-trash-alt" name=${taskData.id}></i>
        </button>
        
      </div>
      <div class="card-body">
        <img src=${taskData.Image} alt="image"
        class="card-img">
        <h5 class="card-title">${taskData.title}</h5>
        <p class="card-text">${taskData.Description}</p>
         <span class="badge bg-primary">${taskData.Type}</span>
      </div>
      <div class="card-footer">
        <button class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#openTask" name=${taskData.id} onClick="openTask.apply(this, arguments)">Open Task</button> 
      </div>
    </div>

  </div>`;

  const taskDetails= (taskData) =>
  {
    const date = new Date(parseInt(taskData.id));
    return `<div class="modal fade" id="openTask" tabindex="-1" aria-labelledby="newTaskLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="newTaskLabel">Task Details</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        <img src=${taskData.Image} alt="image"
        class="card-img">
        <p>Created on ${date.toDateString()}</p>
        <h5 class="card-title">${taskData.title}</h5>
        <p class="card-text">${taskData.Description}</p>
         <span class="badge bg-primary">${taskData.Type}</span>
    
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>`;
};

const insertDom = (content) => taskContainer.insertAdjacentHTML("beforeend",content);
const insertModal = (content) => modalContainer.insertAdjacentHTML("beforeend",content);

const saveToLocalStorage = () =>  localStorage.setItem("taskyCA",JSON.stringify({ card : globalTaskData }));


const addNewCard = () =>{
    const taskData={
        id: `${Date.now()}`,
        title: document.getElementById("taskTitle").value,
        Image: document.getElementById("imageUrl").value,
        Type: document.getElementById("taskType").value,
        Description : document.getElementById("taskDesc").value,
    };

    globalTaskData.push(taskData);

    saveToLocalStorage();

    const newCard = generateHtml(taskData);
    insertDom(newCard);

   document.getElementById("taskTitle").value="";
   document.getElementById("imageUrl").value="";
   document.getElementById("taskType").value="";
   document.getElementById("taskDesc").value="";


};

const loadCards=() => {

  // check local storage

  const getData=localStorage.getItem("taskyCA");

  //parse data if exist

  if(!getData) return;

  const taskCards = JSON.parse(getData);
    
  globalTaskData =taskCards.card;

  globalTaskData.map((taskData) =>{

    const newCard = generateHtml(taskData);

    insertDom(newCard);


  });
  return;


};

const deleteCard = (event) => {
  const targetID =event.target.getAttribute("name");
  const elementType = event.target.tagName;

  const removeTask = globalTaskData.filter((task) => task.id!==targetID);
  globalTaskData=removeTask;


  saveToLocalStorage();

  if(elementType=== "BUTTON")
  {
    return taskContainer.removeChild(
      event.target.parentNode.parentNode.parentNode
    );
  } else {
    return taskContainer.removeChild(
      event.target.parentNode.parentNode.parentNode.parentNode
    );
  }

};

const editCard =(event) =>{

  const elementType = event.target.tagName;

  let taskTitle;
  let taskType;
  let taskDesc;
  let parentElement;
  let submitButton;

  if (elementType === "BUTTON")
  {
    parentElement=event.target.parentNode.parentNode;
  } else {
    parentElement = event.target.parentNode.parentNode.parentNode;
  }

  taskTitle=parentElement.childNodes[3].childNodes[3];
  taskType=parentElement.childNodes[3].childNodes[7];
  taskDesc=parentElement.childNodes[3].childNodes[5];
  submitButton=parentElement.childNodes[5].childNodes[1];
  console.log(submitButton);

  taskTitle.setAttribute("contenteditable","true");
  taskType.setAttribute("contenteditable","true");
  taskDesc.setAttribute("contenteditable","true");
  submitButton.setAttribute("onClick","saveEdit.apply(this, arguments)");
  submitButton.innerHTML="Save Changes";


};


const saveEdit=(event) => {
  const targetID =event.target.getAttribute("name");
  const elementType = event.target.tagName;

  let parentElement;

  if (elementType === "BUTTON")
  {
    parentElement=event.target.parentNode.parentNode;
  } else {
    parentElement = event.target.parentNode.parentNode.parentNode;
  }

 const taskTitle=parentElement.childNodes[3].childNodes[3];
 const taskType=parentElement.childNodes[3].childNodes[7];
 const taskDesc=parentElement.childNodes[3].childNodes[5];
 const submitButton=parentElement.childNodes[5].childNodes[1];

 const updatedData={
   title:taskTitle.innerHTML,
   Description:taskDesc.innerHTML,
   Type:taskType.innerHTML,
 };

 const updateGlobalTask=globalTaskData.map((task) =>{

  if(task.id === targetID){
    return {...task , ...updatedData };
  }
  return task;
 });

 globalTaskData=updateGlobalTask;

 saveToLocalStorage();

  taskTitle.setAttribute("contenteditable","false");
  taskType.setAttribute("contenteditable","false");
  taskDesc.setAttribute("contenteditable","false");
  submitButton.innerHTML="Open Task";
};


const openTask=(event) =>{
  const targetID =event.target.getAttribute("name");
  const getTask = globalTaskData.filter((task) => task.id === targetID);
  modalContainer.innerHTML = taskDetails(getTask[0]);
};

const searchTask = (e) => {
  if (!e) e = window.event;
  while (taskContainer.firstChild) {
    taskContainer.removeChild(taskContainer.firstChild);
  }

  const resultData =globalTaskData.filter(({ title }) =>
    title.includes(e.target.value)
  );

  resultData.map((cardData) => {
    //taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardData));
    const filteredData = generateHtml(cardData);
    insertDom(filteredData);
  });
};



