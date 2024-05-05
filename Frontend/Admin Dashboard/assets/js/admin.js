const dashboardBtn = $('#dashboardBtn');
const employeeBtn = $('#employeeBtn');
const supplierBtn = $('#supplierBtn');
const inventoryBtn = $('#inventoryBtn');
const userBtn = $('#userBtn');
const addEmployee = $('#addEmployee');
updateEmployee = $('#updateEmployee'),
    deleteEmployee = $('#deleteEmployee'),
    showDetails = $('#showDetails'),
    employeeDeleteBox = $('#employeeDeleteBox'),
    employeeMainInputDiv = $('#employeeMainInputDiv'),
    addSupplier = $('#addSupplier'),
    updateSupplier = $('#updateSupplier'),
    deleteSupplier = $('#deleteSupplier'),
    showSupplierDetails = $('#showSupplierDetails'),
    addItem = $('#addInventory'),
    updateItem = $('#updateInventory'),
    deleteItem = $('#deleteInventory'),
    showItem = $('#showInventoryDetails')
    form_close = $('.from_close'),
    cancelBtn = $('.cancelBtn'),
    deleteUser = $('#deleteUser')
    imgUploader = $('#imgUploader');
    home = $('.home');


var base64String;


saveEmployee();
imageUploaderEmployee();
getAllEmployeeData()
clickTblRow();
updateEmployeeBtn()
deleteEmployeeBtn();


dashboardBtn.click(function () {
    // $('#dashboard').css("display", "block");
    // $('#employee').css("display", "none");
    // $('#supplier').css("display", "none");
    // $('#inventory').css("display", "none");
    // $('#users').css("display", "none");
    dashboardBtn.addClass('active')
    employeeBtn.removeClass('active')
    supplierBtn.removeClass('active')
    userBtn.removeClass('active')
    inventoryBtn.removeClass('active')
})

employeeBtn.click(function () {
    // $('#employee').css("display", "block");
    // $('#dashboard').css("display", "none");
    // $('#supplier').css("display", "none");
    // $('#inventory').css("display", "none");
    // $('#users').css("display", "none");
    dashboardBtn.removeClass('active')
    employeeBtn.addClass('active')
    supplierBtn.removeClass('active')
    userBtn.removeClass('active')
    inventoryBtn.removeClass('active')
})
supplierBtn.click(function () {
    // $('#employee').css("display", "none");
    // $('#dashboard').css("display", "none");
    // $('#supplier').css("display", "block");
    // $('#inventory').css("display", "none");
    // $('#users').css("display", "none");
    dashboardBtn.removeClass('active')
    employeeBtn.removeClass('active')
    supplierBtn.addClass('active')
    userBtn.removeClass('active')
    inventoryBtn.removeClass('active')

})
inventoryBtn.click(function () {
    // $('#employee').css("display", "none");
    // $('#dashboard').css("display", "none");
    // $('#supplier').css("display", "none");
    // $('#inventory').css("display", "block");
    // $('#users').css("display", "none");
    dashboardBtn.removeClass('active')
    employeeBtn.removeClass('active')
    supplierBtn.removeClass('active')
    userBtn.removeClass('active')
    inventoryBtn.addClass('active')
})

userBtn.click(function () {
    // $('#employee').css("display", "none");
    // $('#dashboard').css("display", "none");
    // $('#supplier').css("display", "none");
    // $('#inventory').css("display", "none");
    // $('#users').css("display", "block");
    dashboardBtn.removeClass('active')
    employeeBtn.removeClass('active')
    supplierBtn.removeClass('active')
    inventoryBtn.removeClass('active')
    userBtn.addClass('active')

})

form_close.click(function () {
    home.addClass('show')

})
addEmployee.click(function () {
    $('#mainLabel').text('Add Employee')
    home.addClass('show')
    $('#addbtn').text("Save")
    enableTxtField();
    generateNewId();


})

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

updateEmployee.click(function () {
    $('#mainLabel').text('Update Employee')
    home.addClass('show')
    $('#addbtn').text("Update")
    enableTxtField();

})


showDetails.click(function () {
    $('#mainLabel').text('All Employee Details')
    $('#addbtn').text("Close")
    $('#addbtn').click(function () {
        home.removeClass('show');
    })

    home.addClass('show')
    disableTxtField()
    $("#employeeGender").prop('disabled', true);
    $("#employeeDOB").prop('disabled', true);
    $("#employeeDOJ").prop('disabled', true);
    $("#employeeRole").prop('disabled', true);

});
addSupplier.click(function () {
    $('#supplierLabel').text('Add Supplier')
    home.addClass('show')
    $('#saveSupplierbtn').text("Save")
    enableTxtField()

});

deleteSupplier.click(function () {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        }
    });
    // $('#supplierLabel').text('Delete Supplier')
    // $('#saveSupplierbtn').text("Delete")
    //
    // home.addClass('show')
});
showSupplierDetails.click(function () {
    $('#supplierLabel').text('All Supplier Details')
    $('#saveSupplierbtn').text("Close")
    $('#saveSupplierbtn').click(function () {
        home.removeClass('show');
    })

    home.addClass('show')
    disableTxtField()

});

addItem.click(function () {
    $('#inventoryLabel').text('Add Item')
    home.addClass('show')
    $('#saveItembtn').text("Save")

});
updateItem.click(function () {
    $('#inventoryLabel').text('Update Item')
    home.addClass('show')
    $('#saveItembtn').text("Update")

})
deleteItem.click(function () {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        }
    });
    // $('#inventoryLabel').text('Delete Item')
    // $('#saveItembtn').text("Delete")
    // home.addClass('show')
});
showItem.click(function () {
    $('#inventoryLabel').text('All Item Details')
    $('#saveItembtn').text("Close")
    $('#saveItembtn').click(function () {
        home.removeClass('show');
    })

    home.addClass('show')
    disableTxtField()

});
form_close.click(function () {
    home.removeClass('show');
    form_container.css('max-width', '800px')

})
cancelBtn.click(function () {
    home.removeClass('show');
    form_container.css('max-width', '800px')

})
// $(document).ready(function(){
//     $("#employeeDOJ").datepicker({
//         dateFormat: 'yy-mm-dd',
//         maxDate: new Date()
//     });
//     $("#employeeDOB").datepicker({
//         dateFormat: 'yy-mm-dd',
//         maxDate: new Date()
//     });
// });
imgUploader.change(function () {
    var file = $(this)[0].files[0];
    if (file) {
        // $('#fileValue').text('Selected file: ' + file.name);
        console.log(file.name)
    } else {
        // $('#fileValue').text('No file selected');
    }
});
deleteUser.click(function () {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        }
    })
});

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


updateSupplier.click(function () {
    $('#supplierLabel').text('Update Supplier')
    home.addClass('show')
    $('#saveSupplierbtn').text("Update")
    enableTxtField()

});

function getAllEmployeeData() {
    $.ajax({
        url: "http://localhost:8080/api/v1/employees",
        method: "GET",
        success: function (resp) {
            console.log("Success: ", resp);
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
        $.ajax({
            url: "http://localhost:8080/api/v1/employees/" + id,
            type: "DELETE",
            success: function (response) {
                getAllEmployeeData();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Employee has been Deleted",
                    showConfirmButton: false,
                    timer: 1500
                });
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








