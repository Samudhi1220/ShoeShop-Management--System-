const addEmployee = $('#addEmployee'),
    showDetails = $('#showDetails'),
    formCloseEmployee = $('.from_close'),
    btnCancelEmployee = $('.cancelBtn'),
    imgUploaderEmployee = $('#imgUploader'),
    home = $('.home')

var base64String;


saveEmployee();
imageUploaderEmployee();
clickTblRow();
updateEmployeeBtn()
getAllEmployeeData()
searchEmployee()

addEmployee.click(function () {
    $('#mainLabel').text('Add Employee')
    home.addClass('show')
    $('#addbtn').text("Save")
    enableTxtField();
    generateNewId();


})

function getAllEmployeeData() {
    $.ajax({
        url: "http://localhost:8080/api/v1/employees",
        method: "GET",
        success: function (resp) {
            console.log("Success: ", resp);
            $('#tblEmployee tbody').empty();
            for (const employee of resp.data) {
                const row = `<tr>
                         
                                <td>${employee.employeeId}</td>
                                <td>${employee.employeeName}</td>
                                <td>${employee.address.buildNo + ", " + employee.address.lane + ", " + employee.address.state + ", " + employee.address.city + ", " + employee.address.postalCode}</td>
                                <td>${employee.contactNo}</td>
                                <td>${employee.joinDate}</td>
                                <td>${employee.branch}</td>
                                <td>          <img src="assets/images/action-btn.png" id="updateEmployee" height="35" width="35"/>
                                         <img src="assets/images/action-delete-btn.png" id="deleteEmployee"  height="35" width="35"/>
                                         <img src="assets/images/action-btn (1) (1).png" id="showDetails" height="35" width="35"/>
                            </td>
                                
                            </tr>`;
                $('#tblEmployee').append(row);
            }
        },
        error: function (error) {
            console.log("error: ", error);
        }
    })
}


function imageUploaderEmployee() {
    const imgUploader = $('#imgUploaderEmployee');
    const imgViewer = $('#imgViewerEmployee');

    imgUploader.change(function () {

        var file = this.files[0];

        if (file) {
            var reader = new FileReader();

            reader.onload = function (e) {
                imgViewer.attr('src', e.target.result);
                base64String = reader.result.split(',')[1];
            };

            reader.readAsDataURL(file);
        } else {
            imgViewer.attr('src', '#');
        }
    })
}

function setDataToTextField(response) {

    $('#employeeCode').val(response.employeeId);
    $('#employeeName').val(response.employeeName);
    $('#employeeStatus').val(response.employeeStatus);
    $('#employeeBranch').val(response.branch);
    $('#employeeDesignation').val(response.designation);
    $('#employeeDOJ').val(response.joinDate);
    $('#employeeDOB').val(response.employeeDob);
    $('#employeeBuilding').val(response.address.buildNo);
    $('#employeeCity').val(response.address.city);
    $('#employeeLane').val(response.address.lane);
    $('#employeeState').val(response.address.state);
    $('#employeePostalCode').val(response.address.postalCode);
    $('#employeeEmail').val(response.email);
    $('#employeeGuardian').val(response.guardianName);
    $('#employeeContactNumber').val(response.contactNo);
    $('#employeeGuardianContact').val(response.emergencyContact);
    $('#employeeGender').val(response.gender);
    $('#employeeRole').val(response.role);

    console.log(response.role)

    base64String = response.proPic;
    $('#imgViewer').attr('src', 'data:image/jpeg;base64,' + response.proPic)
}

function clickTblRow() {

    $('#tblEmployee').on('click', 'tr', function (event) {


    });
    $('#tblEmployee').on('click', '#updateEmployee', function (event) {

        $('#mainLabel').text('Update Employee')
        home.addClass('show')
        $('#addbtn').text("Update")
        enableTxtField();
        var row = $(this).closest('tr');
        var id = row.find('td:eq(0)').text()
        $.ajax({
            url: "http://localhost:8080/api/v1/employees/" + id,
            type: "GET",
            dataType: "json",
            success: function (response) {

                console.log(response);
                setDataToTextField(response)

            },
            error: function (xhr, status, error) {
                console.error('Failed to fetch image:', error);
            }
        });
        console.log(id)
    });
    $('#tblEmployee').on('click', '#showDetails', function (event) {

        $('#mainLabel').text('Employee Details')
        home.addClass('show')
        $('#addbtn').text("Details")
        $("#employeeGender").prop('disabled', true);
        $("#employeeDOB").prop('disabled', true);
        $("#employeeDOJ").prop('disabled', true);
        $("#employeeRole").prop('disabled', true);

        disableTxtField();
        var row = $(this).closest('tr');
        var id = row.find('td:eq(0)').text()
        $.ajax({
            url: "http://localhost:8080/api/v1/employees/" + id,
            type: "GET",
            dataType: "json",
            success: function (response) {

                console.log(response);
                setDataToTextField(response)
                getAllEmployeeData();

            },
            error: function (xhr, status, error) {
                console.error('Failed to fetch image:', error);
            }
        });
        console.log(id)
    });

    $('#tblEmployee').on('click', '#deleteEmployee', function (event) {


        var row = $(this).closest('tr');
        var id = row.find('td:eq(0)').text()
        deleteEmployeeBtn(id)
        console.log(id)
    });


}

function updateEmployeeBtn() {
    $('#addbtn').click(function () {
        if ($(this).text().trim() === 'Update') {
            var role;
            var gender;
            if ('none' !== $('#employeeRole').val()) {
                role = $('#employeeRole').val().toUpperCase();
            }
            if ('Select Gender' !== $('#employeeGender').val()) {
                gender = $('#employeeGender').val().toUpperCase();
            }


            const postData = {
                employeeId: $('#employeeCode').val(),
                gender: gender,
                employeeName: $('#employeeName').val(),
                employeeStatus: $('#employeeStatus').val(),
                branch: $('#employeeBranch').val(),
                designation: $('#employeeDesignation').val(),
                proPic: base64String,
                joinDate: $('#employeeDOJ').val(),
                employeeDob: $('#employeeDOB').val(),
                role: role,
                address: {
                    buildNo: $('#employeeBuilding').val(),
                    city: $('#employeeCity').val(),
                    lane: $('#employeeLane').val(),
                    state: $('#employeeState').val(),
                    postalCode: $('#employeePostalCode').val()
                },
                email: $('#employeeEmail').val(),
                guardianName: $('#employeeGuardian').val(),
                contactNo: $('#employeeContactNumber').val(),
                emergencyContact: $('#employeeGuardianContact').val(),
            };
            console.log(base64String);

            $.ajax({
                url: "http://localhost:8080/api/v1/employees",
                method: "PATCH",
                data: JSON.stringify(postData),
                contentType: "application/json",
                success: function (resp) {
                    if (resp.state == 200) {
                        getAllEmployeeData()
                        console.log(resp);
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Employee has been Updated",
                            showConfirmButton: false,
                            timer: 1500
                        });


                        $('#tblEmployee tr').each(function () {


                            // Update data of checked row
                            var row = $(this);

                            // Example: Update first name to 'New First Name' and last name to 'New Last Name'
                            row.find('td:eq(0)').text($('#employeeCode').val());
                            row.find('td:eq(1)').text($('#employeeName').val());
                            row.find('td:eq(2)').text($('#employeeBuilding').val() + " " +
                                $('#employeeLane').val() + " " + $('#employeeState').val() + " " + $('#employeeCity').val()
                                + " " + $('#employeePostalCode').val());
                            row.find('td:eq(3)').text($('#employeeContactNumber').val());
                            row.find('td:eq(4)').text($('#employeeDOJ').val());
                            row.find('td:eq(5)').text($('#employeeBranch').val());

                        });
                    }
                },
                error: function (resp) {
                    console.log(resp)
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: resp.responseJSON.message,
                        footer: '<a href="#"></a>'
                    });
                }
            })

        }
    });
}

function deleteEmployeeBtn(id) {
    $('#deleteEmployee').click(function () {
        Swal.fire({}).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        })
        $.ajax({
            url: "http://localhost:8080/api/v1/employees/" + id,
            type: "DELETE",
            success: function (response) {

                Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!",
                    position: "top-end",
                    icon: "success",
                    title: "Employee has been Deleted",
                    showConfirmButton: false,
                    timer: 1500
                });
                getAllEmployeeData();
            },
            error: function (resp) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: resp.responseJSON.message,
                    footer: '<a href="#"></a>'
                });
            }
        });
    })
}

function disableTxtField() {
    $('.txt').attr('readonly', "");

}

function enableTxtField() {
    $('.txt').removeAttr('readonly');
}


function saveEmployee() {
    $('#addbtn').click(function () {
        if ($('#addbtn').text().trim() === 'Save') {


            if ($('#employeeRole').val() === "Admin" || $('#employeeRole').val() === "User") {
                var role = $('#employeeRole').val().toUpperCase();
            }
            if ($('#employeeGender').val() === "Male" || $('#employeeGender').val() === "Female") {
                var gender = $('#employeeGender').val().toUpperCase();
            }

            const postData = {
                employeeId: $('#employeeCode').val(),
                gender: gender,
                employeeName: $('#employeeName').val(),
                employeeStatus: $('#employeeStatus').val(),
                branch: $('#employeeBranch').val(),
                designation: $('#employeeDesignation').val(),
                proPic: base64String,
                joinDate: $('#employeeDOJ').val(),
                employeeDob: $('#employeeDOB').val(),
                role: role,
                address: {
                    buildNo: $('#employeeBuilding').val(),
                    city: $('#employeeCity').val(),
                    lane: $('#employeeLane').val(),
                    state: $('#employeeState').val(),
                    postalCode: $('#employeePostalCode').val()
                },
                email: $('#employeeEmail').val(),
                guardianName: $('#employeeGuardian').val(),
                contactNo: $('#employeeContactNumber').val(),
                emergencyContact: $('#employeeGuardianContact').val(),
            };
            console.log(base64String);

            $.ajax({
                url: "http://localhost:8080/api/v1/employees",
                method: "POST",
                data: JSON.stringify(postData),
                contentType: "application/json",
                success: function (resp) {

                    if (resp.state == 200) {
                        console.log(resp);
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Employee has been saved",
                            showConfirmButton: false,
                            timer: 1500

                        });
                        getAllEmployeeData();
                    }
                },
                error: function (resp) {
                    console.log(resp)
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: resp.responseJSON.message,
                        footer: '<a href="#"></a>'
                    });
                }
            })

        }


    })

}

formCloseEmployee.click(function () {
    home.removeClass('show');
    form_container.css('max-width', '800px')

})
btnCancelEmployee.click(function () {
    home.removeClass('show');
    form_container.css('max-width', '800px')

})
imgUploaderEmployee.change(function () {
    var file = $(this)[0].files[0];
    if (file) {
        // $('#fileValue').text('Selected file: ' + file.name);
        console.log(file.name)
    } else {
        // $('#fileValue').text('No file selected');
    }
});

function generateNewId() {
    fetch("http://localhost:8080/api/v1/employees/id")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Read response as text
        })
        .then(data => {
            console.log(data);
            $('#employeeCode').val(data.data); // Assuming data is a string
        })
        .catch(error => {
            console.error('Error:', error);
        });


}



function searchEmployee() {
    $('#search_employee').keyup(function (event) {
        var idOrName = $(this).val();

        $.ajax({
            url: "http://localhost:8080/api/v1/employees?idOrName=" + idOrName + "&activeStatus=" + true,
            type: "GET",
            dataType: "json",
            success: function (response) {
                $('#tblEmployee tbody').empty()
                for (const employee of response.data) {
                    const row = `<tr>
                             
                                <td>${employee.employeeId}</td>
                                <td>${employee.employeeName}</td>
                                <td>${employee.address.buildNo + " " + employee.address.lane + " " + employee.address.state + " " + employee.address.city + " " + employee.address.postalCode}</td>
                                <td>${employee.contactNo}</td>
                                <td>${employee.joinDate}</td>
                                <td>${employee.branch}</td>
                                
                            </tr>`;
                    $('#tblEmployee').append(row);
                }
            },
            error: function (resp) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: resp.responseJSON.message,
                    footer: '<a href="#"></a>'
                });
            }
        });


    })
}

