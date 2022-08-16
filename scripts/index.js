const state = {
    task_list: [

    ],
};

// DOM - documents objects

const task_contents = document.querySelector(".task__contents");
const task_model = document.querySelector(".task__modal__body");


//function for add html 

const html_task = ({
    id,
    title,
    description,
    type,
    url
}) => `
    <div class='col-md-6 col-lg-4 mt-3' id=${id} key=${id}>
        <div class='card shadow-sm task__card'>
            <div class='card-header gap-2 d-flex justify-content-end task__card__header'>
                <button type='button' class='btn btn-outline-info mr-2' name=${id}>
                     <i class='fas fa-pencil-alt' name=${id}></i>
                </button>
                <button type='button' class='btn btn-outline-danger mr-2' name=${id}>
                     <i class='fas fa-trash-alt' name=${id}></i>
                </button>
            </div>
        <div class='card-body'>
            ${url && `<img width='100%' src=${url} alt='card image cap' class='card-image-top md-3 rounded-lg' />`}
            <h4 class='task__card__title'>${title}</h4>
            <p class='description trim-3-lines text-muted' data-gram_editor='false'>
            ${description}
            </p>
            <div class='tags text-white d-flex flex-wrap'>
                <span class='badge bg-primary m-1'>${type}
                </span>
            </div>
        </din>
        <div class='card-footer'> 
            <button type='button' class='btn-outline-primary float-right' data-bs-toggle='modal' data-bs-target='#showTask' id=${id}>Open Task
            </button>
        </div>
    
        </div>
    </div>
    `;


const htmlModalContent = ({ id, title, description, url }) => {
    const date = new Date(parseInt(id));
    return `
        <div id=${id}>
            ${url && `
                <img width='100%' src=${url} alt='card image cap' class='img-fluid place__holder__image mb-3' />`}
            <strong class='text-sm text-muted'>Created on:${date.toDateString()}</strong>
            <h2 class='my-3'>${title}</h2>
            <p class='lead'>${description}</p>
        </div>
        `;

};

const updateLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify({
        tasks: state.task_list
    }));
};


const loadInitialData = () => {
    const localStoragecopy = JSON.parse(localStorage.tasks)
    if (localStoragecopy) state.task_list = localStoragecopy.tasks;

    state.task_list.map((cardDate) => {
        task_contents.insertAdjacentHTML('beforeend', htmlModalContent(cardDate))
    });
};

const handlesubmit = (event) => {
    const id = `${Date.now()}`;
    const input = {
        url: document.getElementById('image_url').value,
        title: document.getElementById('Task_title').value,
        description: document.getElementById('task_des').value,
        type: document.getElementById('tags').value
    };

    if (input.title === "" || input.description === "" || input.type === "") {
        return alert("please fill all the fields");
    }

    task_contents.insertAdjacentHTML(
        "beforeend", html_task({
            ...input, id,
        })
    );
    state.task_list.push({ ...input, id });
    updateLocalStorage();
};