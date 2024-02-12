// this file contains the employee table filters and sorting functions





var selectedLetters = [];

document.querySelectorAll('.table-filters-list button').forEach(button => {
    button.addEventListener('click', function(event) {
        // event.preventDefault();
        var letter = this.textContent;
        console.log(letter);

        // If the letter is already selected, remove it from the array, otherwise add it
        var index = selectedLetters.indexOf(letter);
        if (index !== -1) {
            selectedLetters.splice(index, 1);
        } else {
            selectedLetters.push(letter);
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




