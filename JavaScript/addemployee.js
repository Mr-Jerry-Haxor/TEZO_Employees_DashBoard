

function addEmployee() {
    let employee = {};
    let isValid = true;

    var fields = ['empid', 'firstname', 'lastname', 'dob', 'email', 'mobile' , 'joiningdate', 'location', 'department'];
    fields.forEach(function(fieldId) {
        var field = document.getElementById(fieldId);
        var errorSpan = document.getElementById(fieldId + '-span');

        if (field.value.trim() === '') {
            field.classList.add('err');
            errorSpan.innerHTML = "<img src='assets/exclamation-mark-diamond.svg' alt='error' style='height:15px' > " + "This " + fieldId + ' field is required';
            isValid = false;
        } else if (!field.checkValidity()) {
            field.classList.add('err');
            errorSpan.innerHTML = "<img src='assets/exclamation-mark-diamond.svg' alt='error' style='height:15px' > " + "Please enter the valid data";
            isValid = false;
        } else {
            field.classList.remove('err');
            errorSpan.innerText = '';
        }
    });



    var data = JSON.parse(localStorage.getItem("data"));
    var employees = data ? data.Employees : null;

    if (data && employees) {
        var exists = false;
        var empid = document.getElementById('empid').value;
        var AddOrEditFlag = document.getElementById('add-or-edit-employee-flag').value;
        employees.forEach(employee => {
            if (employee.empid === empid && AddOrEditFlag === "add") {
                CustomAlert('error', 'Employee ID already exists');
                exists = true;
                return false;
            }
        }); 
        if (AddOrEditFlag === "add") {
            if (isValid && !exists) {
                employee["empid"] = document.getElementById('empid').value;
                employee["firstname"] = document.getElementById('firstname').value;
                employee["lastname"] = document.getElementById('lastname').value;
                var dob = document.getElementById('dob').value;
                employee["DOB"] = dob.split('-').reverse().join('/');
                employee["emailid"] = document.getElementById('email').value;
                employee["mobile"] = document.getElementById('mobile').value;
                employee["location"] = document.getElementById('location').value;
                employee["Department"] = document.getElementById('department').value;
                employee["jobtitle"] = document.getElementById('jobtitle').value;
                employee["profilepath"] = document.getElementById('uploaded-img-preview').src;
                var joindate = document.getElementById('joiningdate').value;
                employee["joining"] = joindate.split('-').reverse().join('/');
                employee["AssignManager"] = document.getElementById('assignmanager').value;
                employee["AssignProject"] = document.getElementById('assignproject').value;
                employee["status"] = "Active";

                let localdata = JSON.parse(localStorage.getItem("data"));
                localdata.Employees.push(employee);
                localStorage.setItem("data", JSON.stringify(localdata));

                EmployeeMenu();
                CustomAlert('success', 'Employee added successfully');
                
            }
        } else if (AddOrEditFlag === "edit") {
            if (isValid) {
                let employee = employees.find(function(emp) {
                    return emp.empid === empid;
                });
                employee["empid"] = document.getElementById('empid').value;
                employee["firstname"] = document.getElementById('firstname').value;
                employee["lastname"] = document.getElementById('lastname').value;
                var dob = document.getElementById('dob').value;
                employee["DOB"] = dob.split('-').reverse().join('/');
                employee["emailid"] = document.getElementById('email').value;
                employee["mobile"] = document.getElementById('mobile').value;
                employee["location"] = document.getElementById('location').value;
                employee["Department"] = document.getElementById('department').value;
                employee["jobtitle"] = document.getElementById('jobtitle').value;
                employee["profilepath"] = document.getElementById('uploaded-img-preview').src;
                var joindate = document.getElementById('joiningdate').value;
                employee["joining"] = joindate.split('-').reverse().join('/');
                employee["AssignManager"] = document.getElementById('assignmanager').value;
                employee["AssignProject"] = document.getElementById('assignproject').value;
                employee["status"] = "Active";


                localStorage.setItem("data", JSON.stringify(data));

                EmployeeMenu();
                CustomAlert('success', 'Employee updated successfully');
            }
        }
    } else {
        console.error('Data or Employees is null');
    }
}



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


function addEmployeeEventListeners() {
    var fields = ['empid', 'firstname', 'lastname', 'dob', 'email', 'mobile' , 'joiningdate', 'location', 'department'];
    var fieldsinfo = {
        'empid': 'Invalid Format, Only TZ123456 allowed',
        'firstname': 'Invalid Format, Only alphabets allowed',
        'lastname': 'Invalid Format, Only alphabets allowed',
        'dob': 'Invalid Format, Only DD/MM/YYYY allowed',
        'email': 'Invalid Format, Only name123@mail.com allowed',
        'mobile': 'Invalid Format, Only digits allowed',
        'joiningdate': 'Invalid Format, Only DD/MM/YYYY allowed',
        'location': 'Invalid Format, Only alphabets allowed',
        'department': 'Invalid Format, Only alphabets allowed'
    }
    // Loop through each field
    fields.forEach(function(fieldId) {
        var field = document.getElementById(fieldId);
        var errorSpan = document.getElementById(fieldId + '-span');

        // Add event listener to each field
        field.addEventListener('input', function() {
            if (field.value.trim() === '') { // Check if the value is empty
                field.classList.add('err');
                errorSpan.innerHTML = "<img src='assets/exclamation-mark-diamond.svg' alt='error' style='height:15px' > " + "This " + fieldId + ' field is required';
            } else if (!field.checkValidity()) {
                field.classList.add('err');
                errorSpan.innerHTML = "<img src='assets/exclamation-mark-diamond.svg' alt='error' style='height:15px' > " + fieldsinfo[fieldId];
            } else {
                field.classList.remove('err');
                errorSpan.innerText = '';
            }
        });
    });

    //add data of birth validation eventlistner
    document.getElementById('dob').addEventListener('input', function() {
        // check if the  date is valid and has 18+ years for the present date
        var dob = document.getElementById('dob').value;
        var today = new Date();
        var dob = new Date(dob);
        var age = today.getFullYear() - dob.getFullYear();
        var m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        if (age < 18) {
            document.getElementById('dob').classList.add('err');
            document.getElementById('dob-span').innerHTML = "<img src='assets/exclamation-mark-diamond.svg' alt='error' style='height:15px' > " + "You must be 18 years or older to register";
        } else {
            document.getElementById('dob').classList.remove('err');
            document.getElementById('dob-span').innerText = '';
        }
    });
}

function addemployeeFormSubmitValidation(){
    document.getElementById('add-employee-form').addEventListener('submit', function(event) {
        event.preventDefault(); // prevent form submission
        addEmployeeEventListeners();
    });
    // document.getElementById('add-employee-form') , prevent default on pressing enter in keyboard only
    document.getElementById('add-employee-form').addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
          event.preventDefault();
        }
    });
}