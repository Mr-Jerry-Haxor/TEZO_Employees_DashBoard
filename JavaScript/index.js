function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  const mainContainer = document.querySelector(".main-container");
  sidebar.classList.toggle("toggleopen");
  mainContainer.classList.toggle("sidebar-open");
}
// including sidebar html code

function NavbarLoad() {
  const sidebarcontainer = document.querySelector(".sidebar-container");
  fetch(
    "HTML/sidebar.html"
  )
    .then((res) => res.text())
    .then((data) => {
      sidebarcontainer.innerHTML = data;
    })
    .catch((error) => console.error('Error:', error));
  
  // including searchbar html code
  
  const searchbar = document.querySelector(".searchbar-container");
  fetch(
    "HTML/searchbar.html"
  )
    .then((res) => res.text())
    .then((data) => {
      searchbar.innerHTML = data;
    })
    .catch((error) => console.error('Error:', error));
}

// onclick of emeployee in the sidebar, load the employee.html filea and display it in the main content area



function EmployeeMenu() {
  const mainContainer = document.querySelector(".main-content");
  fetch(
    "HTML/employee.html"
  )
    .then((res) => res.text())
    .then((data) => {
      mainContainer.innerHTML = data;
    })
    .then(() => {
      loadEmployeeData();
      Filters();
      checkboxes();
    })
    .then(() => {
      setTimeout(() => {
        checkboxIsChecked();
        LoadFilterOptions();  
      }, 1000);
    })
    .then(() => {
      const employeeMenu = document.querySelector("#employee-menu");
      employeeMenu.classList.add("menuactive");
      // remove active class from other menu
      const rolesMenu = document.querySelector("#roles-menu");
      rolesMenu.classList.remove("menuactive");
    })
    .catch((error) => console.error('Error:', error));
}



function RolesMenu() {
  const mainContainer = document.querySelector(".main-content");
  fetch(
    "HTML/roles.html"
  )
    .then((res) => res.text())
    .then((data) => {
      mainContainer.innerHTML = data;
    })
    .then(() => {
      const rolesMenu = document.querySelector("#roles-menu");
      rolesMenu.classList.add("menuactive");
      // remove active class from other menu
      const employeeMenu = document.querySelector("#employee-menu");
      employeeMenu.classList.remove("menuactive");
    })
    .catch((error) => console.error('Error:', error));
    
}



// role details page
function RoleDetails() {
  const mainContainer = document.querySelector(".main-content");
  fetch("HTML/roledetails.html")
    .then((res) => res.text())
    .then((data) => {
      mainContainer.innerHTML = data;
    })
    .then(() => {
      const employeeMenu = document.querySelector("#employee-menu");
      employeeMenu.classList.remove("menuactive");
      // remove active class from other menu
      const rolesMenu = document.querySelector("#roles-menu");
      rolesMenu.classList.remove("menuactive");
    })
    .catch((error) => console.error('Error:', error));
}



function addemployeepage() {
  const mainContainer = document.querySelector(".main-content");
  fetch("HTML/AddEmployee.html")
    .then((res) => res.text())
    .then((data) => {
      mainContainer.innerHTML = data;
    })
    .then(() => {
      const employeeMenu = document.querySelector("#employee-menu");
      employeeMenu.classList.add("menuactive");
      const rolesMenu = document.querySelector("#roles-menu");
      rolesMenu.classList.remove("menuactive");
    })
    .catch((error) => console.error('Error:', error));
}





// default  employee page load
function defaultpage() {
  NavbarLoad();
  EmployeeMenu();
}
