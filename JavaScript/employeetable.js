// this file contains the employee table filters and sorting functions

var selectedLetters = [];

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
        console.log(selectedLetters)
        filterTableByFirstLetters(selectedLetters);
    });
});




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
    }
}


document.getElementById('table-header-checkbox').addEventListener('change', function() {
    // Get all employee checkboxes
    var checkboxes = document.querySelectorAll('#employees-table tbody tr input[type="checkbox"]');

    checkboxes.forEach(checkbox => {
        checkbox.checked = this.checked;
    });
});

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




function filtersReset() {
    // Get the select elements
    var statusSelect = document.getElementById('filter-Status');
    var locationSelect = document.getElementById('filter-Location');
    var departmentSelect = document.getElementById('filter-Department');
    statusSelect.selectedIndex = 0;
    locationSelect.selectedIndex = 0;
    departmentSelect.selectedIndex = 0;
    filterEmployeesTable();
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
    }
}