const taskContainer=document.querySelector(".task_container")

const addNewCard = () =>{
    const taskData={
        id: `${Date.now()}`,
        title: document.getElementById("taskTitle").value,
        Image: document.getElementById("imageUrl").value,
        Type: document.getElementById("taskType").value,
        Description : document.getElementById("taskDesc").value,
    };


    const newCard = ` <div id=${taskData.id}  class="col-md-6 col-lg-4 my-5">

    <div class="card">
      <div class="card-header gap-2 d-flex justify-content-end">
        <button class="btn btn-outline-info">
          <i class="fas fa-pencil-alt"></i>
        </button>
        <button class="btn btn-outline-danger">
          <i class="fas fa-trash-alt"></i>
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

  taskContainer.insertAdjacentHTML("beforeend",newCard);

   document.getElementById("taskTitle").value="";
   document.getElementById("imageUrl").value="";
   document.getElementById("taskType").value="";
   document.getElementById("taskDesc").value="";


};