document.addEventListener('DOMContentLoaded', function() {
    fetchEmployeeData();
});

function fetchEmployeeData() {
    fetch('http://localhost:3000/employees')
        .then(response => response.json())
        .then(data => {
            const employeeList = document.getElementById('employeeList');
            employeeList.innerHTML = ''; 

            data.forEach(employee => {
                const employeeContainer = document.createElement('div');
                employeeContainer.classList.add('employee-box');

                const employeeHeader = document.createElement('div');
                employeeHeader.classList.add('employee-header');
                employeeHeader.textContent = `${employee.FirstName} ${employee.LastName}`;

                const employeeData = document.createElement('div');
                employeeData.classList.add('employee-data');

                for (const key in employee) {
                    if (employee.hasOwnProperty(key) && key !== 'FirstName' && key !== 'LastName') {
                        const dataItem = document.createElement('div');
                        dataItem.classList.add('employee-data-item');

                        const label = document.createElement('span');
                        label.classList.add('employee-data-label');
                        label.textContent = `${key}:`;

                        const value = document.createElement('span');
                        value.classList.add('employee-data-value');
                        value.textContent = employee[key];

                        dataItem.appendChild(label);
                        dataItem.appendChild(value);

                        employeeData.appendChild(dataItem);
                    }
                }

                const buttonContainer = document.createElement('div');
                buttonContainer.classList.add('button-container');

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.classList.add('delete-button');

                deleteButton.addEventListener('click', function() {
                    const confirmationDialog = document.getElementById('confirmationDialog');
                    confirmationDialog.classList.remove('hidden');

                    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
                    confirmDeleteBtn.onclick = function() {
                        deleteEmployee(employee, employeeContainer);
                        confirmationDialog.classList.add('hidden');
                    };

                    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
                    cancelDeleteBtn.onclick = function() {
                        confirmationDialog.classList.add('hidden');
                    };
                });

                buttonContainer.appendChild(deleteButton);

                employeeContainer.appendChild(employeeHeader);
                employeeContainer.appendChild(employeeData);
                employeeContainer.appendChild(buttonContainer);

                employeeList.appendChild(employeeContainer);
            });
        })
        .catch(error => {
            console.error('Error fetching employee data:', error);
            alert('Error fetching employee data. Please try again later.');
        });
}

function deleteEmployee(employee, employeeContainer) {
    const employeeId = employee.id;
    fetch(`http://localhost:3000/employees/${employeeId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            employeeContainer.remove();
            console.log('Employee deleted successfully:', employeeId);
        } else {
            console.error('Error deleting employee:', response.statusText);
            alert('Error deleting employee. Please try again later.');
        }
    })
    .catch(error => {
        console.error('Error deleting employee:', error);
        alert('Error deleting employee. Please try again later.');
    });
}
