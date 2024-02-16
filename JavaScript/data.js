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
        spanProfileName.textContent = employee.fisrtname + employee.lastname;
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
        cellMore.textContent = "...";
        row.appendChild(cellMore);

        var t = document.getElementById("employees-table");
        var r = document.createElement("tr");
        r.innerHTML = row.innerHTML;
        t.tBodies[0].appendChild(r)
    });

}

function addEmployee() {
    
    employee = {};
    
    employee["empid"] = document.getElementById('empid').value;
    employee["fisrtname"] = document.getElementById('firstname').value;
    employee["lastname"] = document.getElementById('lastname').value;
    var dob = document.getElementById('dob').value;
    // chnaging the format to dd/mm/yyyy
    employee["DOB"] = dob.split('/').reverse().join('-');
    employee["emailid"] = document.getElementById('email').value;
    employee["mobile"] = document.getElementById('mobile').value;
    employee["location"] = document.getElementById('location').value;
    employee["Department"] = document.getElementById('department').value;
    employee["jobtitle"] = document.getElementById('jobtitle').value;
    employee["profilepath"] = document.getElementById('profile-picture').value;
    var joindate = document.getElementById('joiningdate').value;
    // chnaging the format to dd/mm/yyyy
    employee["joining"] = joindate.split('/').reverse().join('-');
    employee["AssignManager"] = document.getElementById('assignmanager').value;
    employee["AssignProject"] = document.getElementById('assignproject').value;

    
    employee["status"] = "Active";
    // get local storage data and add new record to it
    let localdata = JSON.parse(localStorage.getItem("data"));
    localdata.Employees.push(employee);
    localStorage.setItem("data", JSON.stringify(localdata));
    console.log("Added employee");

    EmployeeMenu();
    console.log("aleart started");
    setTimeout(() => {
        AddEmployeeAlert('success');
    }, 1000);
    console.log("aleart completed");
};


function export_options(){
    var exportOptions = document.querySelector(".export-options");
    
    if (exportOptions.style.display === "none") {
        exportOptions.style.display = "flex";
    } else {
        exportOptions.style.display = "none";
    }
}

function download_table_as_csv(table_id, separator = ',') {
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
}



function download_table_as_xlsx(table_id) {
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
}