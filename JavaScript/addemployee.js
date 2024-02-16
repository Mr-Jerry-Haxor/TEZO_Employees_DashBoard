
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
    var alertContainer = document.querySelector('.alert-messages');
    var alertDiv = document.createElement('div');
    var countdown = 5; // Set the initial countdown value

    if(status === 'success'){
        alertDiv.className = 'alert alert-success';
        alertDiv.innerText = 'Employee added successfully. \n ' + countdown + ' seconds.';
    }else{
        alertDiv.className = 'alert alert-danger';
        alertDiv.innerText = 'Employee not added. \n' + countdown + ' seconds.';
    }

    document.querySelector('.alert-messages').classList.add('show');
    alertContainer.appendChild(alertDiv);

    // Update the countdown every second
    var countdownInterval = setInterval(function() {
        countdown--;
        if (countdown >= 0) {
            alertDiv.innerText = (status === 'success' ? 'Employee added successfully' : 'Employee not added') + '.\n' + countdown + ' seconds.';
        }
    }, 1000);

    setTimeout(function() {
        clearInterval(countdownInterval); // Stop the countdown
        alertDiv.remove();
        document.querySelector('.alert-messages').classList.remove('show');
    }, 5000);
}