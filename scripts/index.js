const state = {
  task_list: [],
};

// DOM - documents objects

const task_contents = document.querySelector(".task__contents");
const task_model = document.querySelector(".task__modal__body");

//function for add html

const html_task = ({ id, title, description, type, url }) => `
    <div class='col-md-6 col-lg-4 mt-3' id=${id} key=${id}>
        <div class='card shadow-sm task__card'>
            <div class='card-header d-flex gap-2 justify-content-end task__card__header'>
                <button type='button' class='btn btn-outline-info mr-2' name=${id} onclick='editTask.apply(this,arguments)'>
                     <i class='fas fa-pencil-alt' name=${id}></i>
                </button>
                <button type='button' class='btn btn-outline-danger mr-2' name=${id} onclick='deleteTask.apply(this,arguments)'>
                     <i class='fas fa-trash-alt' name=${id}></i>
                </button>
            </div>
            <div class='card-body'>
                ${
                  url
                    ? `<img width='100%' height='150px' src=${url} alt='card image cap' class='card-image-top md-3 rounded-lg' />`
                    : `
                  <img width='100%' height='150px' src=data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXwBFRcXHhoeOyEhO3xTRlN8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fP/AABEIAIIArgMBIgACEQEDEQH/xAAYAAEBAQEBAAAAAAAAAAAAAAAAAwIBBv/EACcQAQACAQMDAwQDAAAAAAAAAAABAhEDEjETIVIzQVFDYWKhIjJC/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APXAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATOOQBmdSse7PWj2iQUE9954qY1Z98AoJTpzzNstaM/wBsAAAAAAAAAAAAABy8ZpMOgJ6VazXMxGXOpicRV3R/1H3cpON8gdb8XetPi5TqXjO7DM6l4nGQa634s0vsz25Opf5I1LZjuCldTdbGMNpR68qgAAAAAAAAAAAAAAnXtrTHyzX6jVu2rE/LlIzvgGK3tWO3DPM/deulEf27yV04rbPIGnp7YzPLN6YtExxlUBKPXlVKPXlUAAAAAAAAAAAAAAGb03474wnWL1mcQsAnu1PE3anj+lAE92p4ub9TxVASpFupmYwqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOgAOAAAAAAAAAAAAAAAAAAAD//2Q== alt='card image cap' class='img-fluid place__holder__image mb-3' />
                  `
                }
                <h4 class='task__card__title'>${title}</h4>
                <p class='description trim-3-lines text-muted' data-gram_editor='false'>
                    ${description}
                </p>
                <div class='tags text-white d-flex flex-wrap'>
                    <span class='badge bg-primary m-1'>${type}
                    </span>
                </div>
            </din>
            
            </div>
            <div class='card-footer'> 
                <button type='button' class='btn btn-outline-light float-end' data-bs-toggle='modal' data-bs-target='#showTask' id=${id} onclick='open_task.apply(this, arguments)' >Open Task
                </button>
            </div>
    </div>
    `;

const htmlModalContent = ({ id, title, description, url }) => {
  const date = new Date(parseInt(id));
  return `
        <div id=${id}>

            ${
              url
                ? `
                <img width='100%' height='150px'src=${url} alt='card image cap' class='img-fluid place__holder__image mb-3' />`
                : `
                <img width='100%' height='150px' src=data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXwBFRcXHhoeOyEhO3xTRlN8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fP/AABEIAIIArgMBIgACEQEDEQH/xAAYAAEBAQEBAAAAAAAAAAAAAAAAAwIBBv/EACcQAQACAQMDAwQDAAAAAAAAAAABAhEDEjETIVIzQVFDYWKhIjJC/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APXAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATOOQBmdSse7PWj2iQUE9954qY1Z98AoJTpzzNstaM/wBsAAAAAAAAAAAAABy8ZpMOgJ6VazXMxGXOpicRV3R/1H3cpON8gdb8XetPi5TqXjO7DM6l4nGQa634s0vsz25Opf5I1LZjuCldTdbGMNpR68qgAAAAAAAAAAAAAAnXtrTHyzX6jVu2rE/LlIzvgGK3tWO3DPM/deulEf27yV04rbPIGnp7YzPLN6YtExxlUBKPXlVKPXlUAAAAAAAAAAAAAAGb03474wnWL1mcQsAnu1PE3anj+lAE92p4ub9TxVASpFupmYwqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOgAOAAAAAAAAAAAAAAAAAAAD//2Q== alt='card image cap' class='img-fluid place__holder__image mb-3' />
                `
            }
            <strong class='text-sm text-muted'>Created on:${date.toDateString()}</strong>
            <h2 class='my-3'>${title}</h2>
            <p class='lead'>${description}</p>
        </div>
        `;
};

const updateLocalStorage = () => {
  localStorage.setItem(
    "tasks",
    JSON.stringify({
      tasks: state.task_list,
    })
  );
};

const loadInitialData = () => {
  const localStoragecopy = JSON.parse(localStorage.tasks);
  if (localStoragecopy) state.task_list = localStoragecopy.tasks;

  state.task_list.map((cardDate) => {
    task_contents.insertAdjacentHTML("beforeend", html_task(cardDate));
  });
};

const handlesubmit = (event) => {
  const id = `${Date.now()}`;
  const input = {
    url: document.getElementById("image_url").value,
    title: document.getElementById("Task_title").value,
    description: document.getElementById("task_des").value,
    type: document.getElementById("tags").value,
  };

  if (input.title === "" || input.description === "" || input.type === "") {
    return alert("please fill all the fields");
  }

  task_contents.insertAdjacentHTML(
    "beforebegin",
    html_task({
      ...input,
      id,
    })
  );
  state.task_list.push({ ...input, id });
  updateLocalStorage();
};
const open_task = (e) => {
  if (!e) e = window.event;

  const get_task = state.task_list.find(({ id }) => id === e.target.id);
  task_model.innerHTML = htmlModalContent(get_task);
};
const deleteTask = (e) => {
  if (!e) e = window.event;
  const targetID = e.target.getAttribute("name");
  const type = e.target.tagName;

  const removeTask = state.task_list.filter(({ id }) => id !== targetID);
  state.task_list = removeTask;
  updateLocalStorage();
  if (type === "BUTTON") {
    return e.target.parentNode.parentNode.parentNode.parentNode.removeChild(
      e.target.parentNode.parentNode.parentNode
    );
  }
  return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
    e.target.parentNode.parentNode.parentNode.parentNode
  );
};

const editTask = (e) => {
  if (!e) e = window.event;

  const targetID = e.target.id;
  const type = e.target.tagName;

  let parentNode;
  let task_t;
  let task_des;
  let task_ty;

  let submitButton;

  if (type === "BUTTON") {
    parentNode = e.target.parentNode.parentNode;
  } else {
    parentNode = e.target.parentNode.parentNode.parentNode;
  }

  task_t = parentNode.childNodes[3].childNodes[3];
  task_des = parentNode.childNodes[3].childNodes[5];
  task_ty = parentNode.childNodes[3].childNodes[7].childNodes[1];

  submitButton = parentNode.childNodes[5].childNodes[1];

  task_t.setAttribute("contenteditable", "true");
  task_des.setAttribute("contenteditable", "true");
  task_ty.setAttribute("contenteditable", "true");
  submitButton.setAttribute("onclick", "save_edit.apply(this,arguments)");
  submitButton.removeAttribute("data-bs-toggle");
  submitButton.removeAttribute("data-bs-target");
  submitButton.innerText = "Save Changes";
};
const save_edit = (e) => {
  if (!e) e = window.event;

  const targetID = e.target.id;
  const parentNode = e.target.parentNode.parentNode;
  // console.log(parentNode.childNodes);
  const task_t = parentNode.childNodes[3].childNodes[3];
  const task_des = parentNode.childNodes[3].childNodes[5];
  const task_ty = parentNode.childNodes[3].childNodes[7].childNodes[1];
  const submitButton = parentNode.childNodes[5].childNodes[1];

  const updateData = {
    task_t: task_t.innerHTML,
    task_des: task_des.innerHTML,
    task_ty: task_ty.innerHTML,
  };

  let statecopy = state.task_list;
  statecopy = statecopy.map((task) =>
    task.id === targetID
      ? {
          id: task.id,
          title: updateData.task_t,
          description: updateData.task_des,
          type: updateData.task_ty,
          url: task.url,
        }
      : task
  );

  state.task_list = statecopy;
  updateLocalStorage();

  task_t.setAttribute("contenteditable", "false");
  task_des.setAttribute("contenteditable", "false");
  task_ty.setAttribute("contenteditable", "false");

  submitButton.setAttribute("onclick", "open_task.apply(this,arguments)");

  submitButton.setAttribute("data-bs-toggle", "model");
  submitButton.setAttribute("data-bs-target", "#showTask");

  submitButton.innerText = "open Task";
};
const search = (e) => {
  if (!e) e = window.event;

  while (task_contents.firstChild) {
    task_contents.removeChild(task_contents.firstChild);
  }

  const resultdata = state.task_list.filter(({ title }) => {
    return title.toLowerCase().includes(e.target.value.toLowerCase());
  });

  resultdata.map((cardData) => {
    task_contents.insertAdjacentHTML("beforeend", html_task(cardData));
  });
};
