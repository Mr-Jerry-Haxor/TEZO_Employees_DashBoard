// this file contains the employee table filters and sorting functions
var selectedLetters = [];
function Filters() {
    document.querySelectorAll('.table-filters-list button').forEach(button => {
        button.addEventListener('click', function(event) {
            // event.preventDefault();
            var letter = this.textContent;
            // make that button active
            this.classList.add('filteractive');
            console.log(letter);
    
            // If the letter is already selected, remove it from the array, otherwise add it
            var index = selectedLetters.indexOf(letter);
            if (index !== -1) {
                selectedLetters.splice(index, 1);
                this.classList.remove('filteractive');
            } else {
                selectedLetters.push(letter);
                this.classList.add('filteractive');
            }
            filterTableByFirstLetters(selectedLetters);
        });
    });
}

function filterTableByFirstLettersReset(){
    selectedLetters = [];
    filterTableByFirstLetters(selectedLetters);
    // remove filteractive from all the letters
    var buttons = document.querySelectorAll('.table-filters-list button');
    buttons.forEach(button => {
        button.classList.remove('filteractive');
    });
}

function filterTableByFirstLetters(letters) {
    // Get all the rows in the table
    var rows = document.querySelectorAll('#employees-table tbody tr');


    if (letters.length === 0) {
        rows.forEach(row => {
            row.style.display = '';
        });
    } else {

        // Loop through each row
        rows.forEach(row => {
            // if (row.style.display === 'none') {
            //     return;
            // }
            // Get the first cell in the row
            var firstCell = row.querySelector('td:nth-child(2) .profile-name');

            // If the first letter of the cell's text is in the letters array, show the row, otherwise hide it
            if (letters.includes(firstCell.textContent.trim().charAt(0).toUpperCase())) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
        var statusSelect = document.getElementById('filter-Status');
        var locationSelect = document.getElementById('filter-Location');
        var departmentSelect = document.getElementById('filter-Department');
        statusSelect.selectedIndex = 0;
        locationSelect.selectedIndex = 0;
        departmentSelect.selectedIndex = 0;
    }
}

function filterTableByFirstLettersAndFilters(letters) {
    var rows = document.querySelectorAll('#employees-table tbody tr');


    if (letters.length === 0) {
        rows.forEach(row => {
            row.style.display = '';
        });
    } else {

        // Loop through each row
        rows.forEach(row => {
            if (row.style.display === 'none') {
                return;
            }
            // Get the first cell in the row
            var firstCell = row.querySelector('td:nth-child(2) .profile-name');

            // If the first letter of the cell's text is in the letters array, show the row, otherwise hide it
            if (letters.includes(firstCell.textContent.trim().charAt(0).toUpperCase())) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }
}


function checkboxes() {
    document.getElementById('table-header-checkbox').addEventListener('change', function() {
        // Get all employee checkboxes
        var checkboxes = document.querySelectorAll('#employees-table tbody tr input[type="checkbox"]');
    
        checkboxes.forEach(checkbox => {
            checkbox.checked = this.checked;
        });
    });
}

function checkboxIsChecked(){
    // Get all employee checkboxes
    var checkboxes = document.querySelectorAll('#employees-table tbody tr input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // Get the parent checkbox
            var parentCheckbox = document.getElementById('table-header-checkbox');
    
            // Check if all child checkboxes are checked
            var allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);
    
            // Set the checked state of the parent checkbox
            parentCheckbox.checked = allChecked;
        });
    });
}




function filtersReset() {
    // Get the select elements
    var statusSelect = document.getElementById('filter-Status');
    var locationSelect = document.getElementById('filter-Location');
    var departmentSelect = document.getElementById('filter-Department');
    statusSelect.selectedIndex = 0;
    locationSelect.selectedIndex = 0;
    departmentSelect.selectedIndex = 0;
    filterEmployeesTable();
    filterTableByFirstLetters(selectedLetters);
}


function filterEmployeesTable() {
    // Get the select elements
    var statusSelect = document.getElementById('filter-Status').value;
    var locationSelect = document.getElementById('filter-Location').value;
    var departmentSelect = document.getElementById('filter-Department').value;
    

    // if statusSelect or locationSelect or departmentSelect is empty , then displya all employees table rows
    if (statusSelect === "" && locationSelect === "" && departmentSelect === "") {
        var rows = document.querySelectorAll('#employees-table tbody tr');
        rows.forEach(row => {
            row.style.display = '';
        });
    } else {
        // Get all the rows in the table
        var rows = document.querySelectorAll('#employees-table tbody tr');
        // Loop through each row
        rows.forEach(row => {
            // if (row.style.display === 'none') {
            //     return;
            // }
            // Get the cells in the row
            var statusCell = row.querySelector('td:nth-child(7)');
            var locationCell = row.querySelector('td:nth-child(3)');
            var departmentCell = row.querySelector('td:nth-child(4)');

            // If the statusCell or locationCell or departmentCell is not equal to the selected value, hide the row, otherwise show it
            if ((statusSelect !== "" && statusCell.textContent !== statusSelect)) {
                row.style.display = 'none';
            } 
            else if ((locationSelect !== "" && locationCell.textContent !== locationSelect)) {
                row.style.display = 'none';
            } 
            else if ((departmentSelect !== "" && departmentCell.textContent !== departmentSelect)) {
                row.style.display = 'none';
            } else {
                row.style.display = '';
            }
        });
        filterTableByFirstLettersAndFilters(selectedLetters)

    }
}



function LoadFilterOptions() {
    // Get all the location cells and append if doesn't exist
    var locationCells = document.querySelectorAll('#employees-table tbody tr td:nth-child(3)');
    var locationOptions = document.getElementById('filter-Location');
    var locationValues = [];
    locationCells.forEach(cell => {
        locationValues.push(cell.textContent);
    });
    locationValues = locationValues.filter((value, index, self) => self.indexOf(value) === index);
    locationValues.forEach(value => {
        var option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        locationOptions.appendChild(option);
    });

    // Get all the department cells
    var departmentCells = document.querySelectorAll('#employees-table tbody tr td:nth-child(4)');
    var departmentOptions = document.getElementById('filter-Department');
    var departmentValues = [];
    departmentCells.forEach(cell => {
        departmentValues.push(cell.textContent);
    });
    departmentValues = departmentValues.filter((value, index, self) => self.indexOf(value) === index);
    departmentValues.forEach(value => {
        var option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        departmentOptions.appendChild(option);
    });

    var statusCells = document.querySelectorAll('#employees-table tbody tr td:nth-child(7)');
    var statusOptions = document.getElementById('filter-Status');
    var statusValues = [];
    statusCells.forEach(cell => {
        statusValues.push(cell.textContent);
    });
    statusValues = statusValues.filter((value, index, self) => self.indexOf(value) === index);
    statusValues.forEach(value => {
        var option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        statusOptions.appendChild(option);
    });
}