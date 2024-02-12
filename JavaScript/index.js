function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  const mainContainer = document.querySelector(".main-container");
  sidebar.classList.toggle("toggleopen");
  mainContainer.classList.toggle("sidebar-open");
}
// including sidebar html code

const sidebarcontainer = document.querySelector(".sidebar-container");
fetch(
  "https://raw.githubusercontent.com/Mr-Jerry-Haxor/TEZO_Employees_DashBoard/main/sidebar.html"
)
  .then((res) => res.text())
  .then((data) => {
    sidebarcontainer.innerHTML = data;
  });

// including searchbar html code

const searchbar = document.querySelector(".searchbar-container");
fetch(
  "https://raw.githubusercontent.com/Mr-Jerry-Haxor/TEZO_Employees_DashBoard/main/searchbar.html"
)
  .then((res) => res.text())
  .then((data) => {
    searchbar.innerHTML = data;
  });

// onclick of emeployee in the sidebar, load the employee.html filea and display it in the main content area



function EmployeeMenu() {
  const mainContainer = document.querySelector(".main-content");
  fetch(
    "https://raw.githubusercontent.com/Mr-Jerry-Haxor/TEZO_Employees_DashBoard/main/employee.html"
  )
    .then((res) => res.text())
    .then((data) => {
      mainContainer.innerHTML = data;
    });
  loadEmployeeData();
  const employeeMenu = document.querySelector("#employee-menu");
  employeeMenu.classList.add("menuactive");
  // remove active class from other menu
  const rolesMenu = document.querySelector("#roles-menu");
  rolesMenu.classList.remove("menuactive");
}



function RolesMenu() {
  const mainContainer = document.querySelector(".main-content");
  fetch(
    "https://raw.githubusercontent.com/Mr-Jerry-Haxor/TEZO_Employees_DashBoard/main/roles.html"
  )
    .then((res) => res.text())
    .then((data) => {
      mainContainer.innerHTML = data;
    });
  const rolesMenu = document.querySelector("#roles-menu");
  rolesMenu.classList.add("menuactive");
  // remove active class from other menu
  const employeeMenu = document.querySelector("#employee-menu");
  employeeMenu.classList.remove("menuactive");
}



// role details page
function RoleDetails() {
  const mainContainer = document.querySelector(".main-content");
  fetch("https://raw.githubusercontent.com/Mr-Jerry-Haxor/TEZO_Employees_DashBoard/main/roledetails.html")
    .then((res) => res.text())
    .then((data) => {
      mainContainer.innerHTML = data;
    });
  const employeeMenu = document.querySelector("#employee-menu");
  employeeMenu.classList.remove("menuactive");
  // remove active class from other menu
  const rolesMenu = document.querySelector("#roles-menu");
  rolesMenu.classList.remove("menuactive");
}




// default  employee page load
function defaultpage() {
  const mainContainer = document.querySelector(".main-content");
  fetch("https://raw.githubusercontent.com/Mr-Jerry-Haxor/TEZO_Employees_DashBoard/main/employee.html")
    .then((res) => res.text())
    .then((data) => {
      mainContainer.innerHTML = data;
      loadEmployeeData();
      const employeeMenu = document.querySelector("#employee-menu");
      employeeMenu.classList.add("menuactive");
    });
}

defaultpage();




function addemployeepage() {
  const mainContainer = document.querySelector(".main-content");
  fetch("https://raw.githubusercontent.com/Mr-Jerry-Haxor/TEZO_Employees_DashBoard/main/AddEmployee.html")
    .then((res) => res.text())
    .then((data) => {
      mainContainer.innerHTML = data;
    });
    const employeeMenu = document.querySelector("#employee-menu");
    employeeMenu.classList.add("menuactive");
    const rolesMenu = document.querySelector("#roles-menu");
    rolesMenu.classList.remove("menuactive");
}