function loadEmployeeData() {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            let employees = data.Employees;

            employees.forEach(employee => {
                let row = document.createElement('tr');
                row.className = "border-bottom";

                let cellCheckbox = document.createElement('td');
                let checkbox = document.createElement('input');
                checkbox.type = "checkbox";
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
        })
        .catch(error => console.error('Error:', error));
}



function AddEmployeeToData() {
    //event.preventDefault(); // Prevent the form from submitting normally

    // Capture form data
    var form = document.getElementById('add-employee-form');
    var formData = new FormData(form);
    console.log(formData);
    var employee = {};
    
    employee["empid"] = formData.get('empid');
    employee["fisrtname"] = formData.get('firstname');
    employee["lastname"] = formData.get('lastname');
    employee["DOB"] = formData.get('dob');
    employee["emailid"] = formData.get('email');
    employee["mobile"] = formData.get('mobile');
    employee["location"] = formData.get('location');
    employee["Department"] = formData.get('department');
    employee["jobtitle"] = formData.get('jobtitle');
    employee["profilepath"] = formData.get('profile-picture');
    employee["joining"] = formData.get('joiningdate');
    employee["AssignManager"] = formData.get('assignmanager');
    employee["AssignProject"] = formData.get('assignproject');

    
    employee["status"] = "Active";
    console.log(employee);
    // fetch('data.json')
    //     .then(response => response.json())
    //     .then(data => {
    //         // Append the new employee to the Employees array
    //         // data.Employees.push(employee);

    //         // // after pushing the new employee to the Employees array, update the data.json file
    //         // fetch('data.json', {
    //         //     method: 'PUT',
    //         //     headers: {
    //         //         'Content-Type': 'application/json'
    //         //     },
    //         //     body: JSON.stringify(data)
    //         // })
    //         // console.log(data);
    //     })
        // .catch(error => console.error('Error:', error));
}




function download_table_as_csv(table_id, separator = ',') {
    // Select rows from table_id
    var rows = document.querySelectorAll('table#' + table_id + ' tr');
    // Construct csv
    var csv = [];
    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll('td, th');
        for (var j = 0; j < cols.length; j++) {
            // Clean innertext to remove multiple spaces and jumpline (break csv)
            var data = cols[j].innerText.replace(/(\r\n|\n|\r)/gm, '').replace(/(\s\s)/gm, ' ')
            // Escape double-quote with double-double-quote (see https://stackoverflow.com/questions/17808511/properly-escape-a-double-quote-in-csv)
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