var emp_filter_sort_data = [];

function loadEmployeeData() {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            
            if (localStorage.getItem("data") === null) {
                localStorage.setItem("data", JSON.stringify(data));
            }
            
            localdata = JSON.parse(localStorage.getItem("data"));
            let employees = localdata.Employees;
            emp_filter_sort_data = employees;

            LoadEmployeeDataByArray(employees); 
        })
        .catch(error => console.error('Error:', error));
}


function LoadEmployeeDataByArray(employeeArray){

    // get table by id and clear table body
    let table = document.getElementById("employees-table");
    // only delete if table has rows
    if (table.rows.length > 0) {
        // only delete the tbody
        while (table.rows.length > 1) {
            table.deleteRow(-1);
        }
    }  

    let employees = employeeArray;
    employees.forEach(employee => {
        let row = document.createElement('tr');
        row.className = "border-bottom";

        let cellCheckbox = document.createElement('td');
        let checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.id = employee.empid;
        cellCheckbox.appendChild(checkbox);
        row.appendChild(cellCheckbox);

        let cellProfile = document.createElement('td');
        let divProfileContainer = document.createElement('div');
        divProfileContainer.className = "profile-container";
        let imgProfile = document.createElement('img');
        imgProfile.src = employee.profilepath;
        imgProfile.alt = "Profile Image";
        imgProfile.className = "profile-image";
        divProfileContainer.appendChild(imgProfile);
        let divProfileInfo = document.createElement('div');
        divProfileInfo.className = "profile-info";
        let spanProfileName = document.createElement('span');
        spanProfileName.className = "profile-name";
        spanProfileName.textContent = employee.firstname + employee.lastname;
        divProfileInfo.appendChild(spanProfileName);
        let spanProfileEmail = document.createElement('span');
        spanProfileEmail.className = "profile-email";
        spanProfileEmail.textContent = employee.emailid;
        divProfileInfo.appendChild(spanProfileEmail);
        divProfileContainer.appendChild(divProfileInfo);
        cellProfile.appendChild(divProfileContainer);
        row.appendChild(cellProfile);

        let cellCity = document.createElement('td');
        cellCity.textContent = employee.location;
        row.appendChild(cellCity);

        let cellDepartment = document.createElement('td');
        cellDepartment.textContent = employee.Department;
        row.appendChild(cellDepartment);

        let cellRole = document.createElement('td');
        cellRole.textContent = employee.jobtitle;
        row.appendChild(cellRole);

        let cellId = document.createElement('td');
        cellId.textContent = employee.empid;
        row.appendChild(cellId);

        let cellStatus = document.createElement('td');
        let spanStatus = document.createElement('span');
        spanStatus.className = employee.status === 'Active' ? 'table-status-active' : 'table-status-inactive';
        spanStatus.textContent = employee.status;
        cellStatus.appendChild(spanStatus);
        row.appendChild(cellStatus);

        let cellDate = document.createElement('td');
        cellDate.textContent = employee.joining;
        row.appendChild(cellDate);

        let cellMore = document.createElement('td');
        let buttonmore = document.createElement('button');
        buttonmore.className = "button-more";
        buttonmore.textContent = "...";
        let empid = employee.empid+ "_more";
        buttonmore.setAttribute("onclick", "viewmore('"+empid+"')");
        cellMore.appendChild(buttonmore);
        let divMore = document.createElement('div');
        divMore.className = "emp-table-more";
        divMore.id = employee.empid+"_more";
        let aViewDetails = document.createElement('button');
        aViewDetails.className = "button-view-details";
        aViewDetails.textContent = "View Details";
        let aEdit = document.createElement('button');
        aEdit.className = "button-edit";
        aEdit.setAttribute("onclick", "EditEmployeeDetails('"+employee.empid+"')");
        aEdit.textContent = "Edit";
        let aDelete = document.createElement('button');
        aDelete.className = "button-delete";
        aDelete.setAttribute("onclick", "deleteEmployee('"+employee.empid+"')");
        aDelete.textContent = "Delete";
        divMore.appendChild(aViewDetails);
        divMore.appendChild(aEdit);
        divMore.appendChild(aDelete);
        // hide this divmore initially and when user click on cellmore.textcontent, show and toggle the cellmore
        divMore.style.display = "none";
        cellMore.appendChild(divMore);
        row.appendChild(cellMore);

        var t = document.getElementById("employees-table");
        var r = document.createElement("tr");
        r.innerHTML = row.innerHTML;
        t.tBodies[0].appendChild(r)
    });

}

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


function export_options(){
    var exportOptions = document.querySelector(".export-options");
    
    if (exportOptions.style.display === "none") {
        exportOptions.style.display = "flex";
    } else {
        exportOptions.style.display = "none";
    }
}

function download_table_as_csv(table_id, separator = ',') {
    try {
        // Select rows from table_id
        var rows = document.querySelectorAll('table#' + table_id + ' tr');
        // Construct csv
        var csv = [];
        for (var i = 0; i < rows.length; i++) {
            // Skip if the row's display is none
            if (rows[i].style.display === 'none') {
                continue;
            }
    
            var row = [], cols = rows[i].querySelectorAll('td, th');
            for (var j = 0; j < cols.length; j++) {
                // Clean innertext to remove multiple spaces and jumpline (break csv)
                var data = cols[j].innerText.replace(/(\r\n|\n|\r)/gm, '').replace(/(\s\s)/gm, ' ')
                // Escape double-quote with double-double-quote
                data = data.replace(/"/g, '""');
                // Push escaped string
                row.push('"' + data + '"');
            }
            csv.push(row.join(separator));
        }
        var csv_string = csv.join('\n');
        // Download it
        var filename = 'export_' + table_id + '_' + new Date().toLocaleDateString() + '.csv';
        var link = document.createElement('a');
        link.style.display = 'none';
        link.setAttribute('target', '_blank');
        link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv_string));
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        CustomAlert('success', filename +'\n has begin downloading');
    } catch (error) {
        CustomAlert('error', error.message);
    }
}



function download_table_as_xlsx(table_id) {
    try {
        // Select rows from table_id
        var rows = document.querySelectorAll('table#' + table_id + ' tr');
        // Construct data
        var data = [];
        for (var i = 0; i < rows.length; i++) {
            // Skip if the row's display is none
            if (rows[i].style.display === 'none') {
                continue;
            }

            var row = [], cols = rows[i].querySelectorAll('td, th');
            for (var j = 0; j < cols.length; j++) {
                // Clean innertext to remove multiple spaces and jumpline
                var cellData = cols[j].innerText.replace(/(\r\n|\n|\r)/gm, '').replace(/(\s\s)/gm, ' ')
                row.push(cellData);
            }
            data.push(row);
        }

        // Create a new instance of a Workbook class
        var wb = XLSX.utils.book_new();
        // Use XLSX.utils.aoa_to_sheet to convert our data to a worksheet object
        var ws = XLSX.utils.aoa_to_sheet(data);
        // Append the worksheet to the workbook
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

        // Generate XLSX file and send to client
        var wbout = XLSX.write(wb, {bookType:'xlsx', type: 'binary'});
        var buf = new ArrayBuffer(wbout.length);
        var view = new Uint8Array(buf);
        for (var i=0; i<wbout.length; i++) view[i] = wbout.charCodeAt(i) & 0xFF;
        var blob = new Blob([buf], {type:'application/octet-stream'});

        // Download it
        var filename = 'export_' + table_id + '_' + new Date().toLocaleDateString() + '.xlsx';
        var link = document.createElement('a');
        link.style.display = 'none';
        link.setAttribute('target', '_blank');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        CustomAlert('success', filename +'\nhas begin downloading');
    } catch (error) {
        CustomAlert('error', error.message);
    }
}














