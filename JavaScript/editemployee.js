//function 

function EditEmployeeDetails(empid){
    var data = JSON.parse(localStorage.getItem("data"));
    if (!data ||!data.Employees) {
        CustomAlert("error", "No employee data found in local storage.");
        return;
    }
    var employees = data.Employees;
    var employee = employees.find(function(emp) {
        return emp.empid === empid;
    });
    console.log("employee: ", employee);

    //load the addemployee.html file and fill the fileds with data.
    var mainContainer = document.querySelector(".main-content");
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
        .then(() => {
            addEmployeeFormValidation();
            addemployeeFormSubmitValidation();
            })
        .then(() => {
            // get element by ID and set the value
            document.getElementById("add-employee-title").innerText = "Edit Employee";
            document.getElementById('form-submit').innerText = "Update Employee";
            document.getElementById('add-or-edit-employee-flag').value = "edit";
            document.getElementById('empid').value = employee.empid;
            document.getElementById('empid').setAttribute('readonly', 'readonly');
            document.getElementById('firstname').value = employee.firstname;
            document.getElementById('lastname').value = employee.lastname;
            var dob = employee.DOB;
            dob = dob.split('/').reverse().join('-');
            document.getElementById('dob').value = dob;
            document.getElementById('email').value = employee.emailid;
            document.getElementById('mobile').value = employee.mobile;
            var joindate = employee.joining;
            joindate = joindate.split('/').reverse().join('-');
            document.getElementById('joiningdate').value = joindate;
            document.getElementById('location').value = employee.location;
            document.getElementById('assignmanager').value = employee.AssignManager;
            document.getElementById('assignproject').value = employee.AssignProject;
            document.getElementById('department').value = employee.Department;
            document.getElementById('jobtitle').value = employee.jobtitle;
            // document.getElementById('profile-picture').value = employee.profilepath;
            document.getElementById('uploaded-img-preview').src = employee.profilepath;
            
        })
        .catch((error) => console.error('Error:', error));
}