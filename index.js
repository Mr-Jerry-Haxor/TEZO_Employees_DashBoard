
// including sidebar html code

const sidebar = document.querySelector('.sidebar-container');
fetch('/sidebar.html')
.then(res=>res.text())
.then(data=>{
    sidebar.innerHTML = data;
});


// including searchbar html code

const searchbar = document.querySelector('.searchbar-container');
fetch('/searchbar.html')
.then(res=>res.text())
.then(data=>{
    searchbar.innerHTML = data;
});





// onclick of emeployee in the sidebar, load the employee.html filea and display it in the main content area

function EmployeeMenu() {
    const mainContainer = document.querySelector('.main-content');
    fetch('/employee.html')
    .then(res=>res.text())
    .then(data=>{
        mainContainer.innerHTML = data;
    });
    const employeeMenu = document.querySelector('#employee-menu');
    employeeMenu.classList.add('menuactive');
    // remove active class from other menu
    const rolesMenu = document.querySelector('#roles-menu');
    rolesMenu.classList.remove('menuactive');
}

function RolesMenu() {
    const mainContainer = document.querySelector('.main-content');
    fetch('/roles.html')
    .then(res=>res.text())
    .then(data=>{
        mainContainer.innerHTML = data;
    });
    const rolesMenu = document.querySelector('#roles-menu');
    rolesMenu.classList.add('menuactive');
    // remove active class from other menu
    const employeeMenu = document.querySelector('#employee-menu');
    employeeMenu.classList.remove('menuactive');
}

// default  employee page load
function defaultpage() {
    const mainContainer = document.querySelector('.main-content');
    fetch('/employee.html')
    .then(res=>res.text())
    .then(data=>{
        mainContainer.innerHTML = data;
    });
    const employeeMenu = document.querySelector('#employee-menu');
    employeeMenu.classList.toggle('menuactive');
}


