
function addEmployeeFormValidation() {
    // Fields to validate
    var fields = ['empid', 'firstname', 'lastname', 'dob', 'email', 'mobile' , 'joiningdate', 'location', 'department'];

    // Loop through each field
    fields.forEach(function(fieldId) {
        var field = document.getElementById(fieldId);
        var errorSpan = document.getElementById(fieldId + '-span');

        // Add event listener to each field
        field.addEventListener('input', function() {
            if (!field.checkValidity()) {
                field.classList.add('err');
                errorSpan.innerHTML = "<img src='assets/exclamation-mark-diamond.svg' alt='error' style='height:15px' > " + "This " + fieldId + ' field is required'
                errorSpan.insertText = fieldId + ' is required';
            } else {
                field.classList.remove('err');
                errorSpan.innerText = '';
            }
        });
    });
}


function addemployeeFormSubmitValidation(){
    document.getElementById('add-employee-form').addEventListener('submit', function(event) {
        event.preventDefault(); // prevent form submission
        var fields = ['empid', 'firstname', 'lastname', 'dob', 'email', 'mobile' , 'joiningdate', 'location', 'department'];
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
                    errorSpan.innerHTML = "<img src='assets/exclamation-mark-diamond.svg' alt='error' style='height:15px' > " + "Please enter the valid data";
                } else {
                    field.classList.remove('err');
                    errorSpan.innerText = '';
                }
            });
        });
    });
}

