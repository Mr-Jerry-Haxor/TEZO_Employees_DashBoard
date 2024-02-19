function searchEmployees(query) {
    localdata = JSON.parse(localStorage.getItem("data"));
    let employees = localdata.Employees;
    var results = employees.filter(function(employee) {
        if (employee.firstname) {
            var emp = employee.firstname.toLowerCase() + employee.lastname.toLowerCase();
            return emp.includes(query.toLowerCase());
        }
        return false;
    });

    var resultsDiv = document.getElementById('employee-results');
    resultsDiv.innerHTML = '';
    resultsDiv.style.display = results.length ? 'block' : 'none';

    results.forEach(function(employee) {
        var employeeDiv = document.createElement('div');
        employeeDiv.className = 'employee';

        var checkbox = document.createElement('input');
        //add classname 
        // checkbox.className = 'employee-checkbox';
        checkbox.type = 'checkbox';
        checkbox.value = employee.empid;
        checkbox.onchange = function() {
            updateSelectedEmployees();
        };

        var img = document.createElement('img');
        img.src = employee.profilepath;

        var name = document.createTextNode(employee.firstname + " " + employee.lastname);

        employeeDiv.appendChild(checkbox);
        employeeDiv.appendChild(img);
        employeeDiv.appendChild(name);

        resultsDiv.appendChild(employeeDiv);
    });
}

function updateSelectedEmployees() {
    var checkboxes = document.querySelectorAll('#employee-results input[type="checkbox"]');
    var selectedEmployees = [];
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            selectedEmployees.push(checkbox.value);
        }
    });

    document.getElementById('selected-employees').value = selectedEmployees.join(',');
}