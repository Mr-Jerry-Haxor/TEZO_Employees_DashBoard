
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
                errorSpan.innerText = fieldId + ' is required';
            } else {
                field.classList.remove('err');
                errorSpan.innerText = '';
            }
        });
    });
}




function AddEmployeeAlert(status){
    if(status === 'success'){
        // get element by class name "alert-messages" and add a new div with the message , show the message for 3 seconds and then remove it div again.
        var alertContainer = document.querySelector('.alert-messages');
        var alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-success';
        alertDiv.innerText = 'Employee added successfully';
        alertContainer.appendChild(alertDiv);
        setTimeout(function() {
            alertDiv.remove();
        }, 5000);
    }else{
        // get element by class name "alert-messages" and add a new div with the message, show the message for 3 seconds and then remove it div again.
        var alertContainer = document.querySelector('.alert-messages');
        var alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-danger';
        alertDiv.innerText = 'Employee not added';
        alertContainer.appendChild(alertDiv);
        setTimeout(function() {
            alertDiv.remove();
        }, 5000);
    }
}