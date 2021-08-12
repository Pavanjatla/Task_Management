const taskContainer=document.querySelector(".task_container")
let globalTaskData=[];


const generateHtml = (taskData) => 

` <div id=${taskData.id}  class="col-md-6 col-lg-4 my-5">

    <div class="card">
      <div class="card-header gap-2 d-flex justify-content-end">
        <button class="btn btn-outline-info">
          <i class="fas fa-pencil-alt"></i>
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
        <button class="btn btn-outline-primary">Open Task</button> 
      </div>
    </div>

  </div>`;


const insertDom = (content) => taskContainer.insertAdjacentHTML("beforeend",content);

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