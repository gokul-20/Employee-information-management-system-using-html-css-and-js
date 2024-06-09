
document.getElementById('backBtn').addEventListener('click', function() {
    window.location.href = 'index.html';
})



document.getElementById("cancelBtn").addEventListener("click", function() {
    document.getElementById("employeeForm").reset();
});

document.getElementById('employeeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const jsonObject = {};
    formData.forEach((value, key) => {
        jsonObject[key] = value;
    });
    fetch('http://localhost:3000/employees', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonObject)
    })
    .then(response => response.json())
    .then(data => {
        alert('Employee information submitted successfully!');
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error submitting employee information. Please try again later.');
    });
});

