

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
        addSupplier= $('#addSupplier'),
        updateSupplier=$('#updateSupplier'),
        deleteSupplier=$('#deleteSupplier'),
        showSupplierDetails=$('#showSupplierDetails'),
        addItem=$('#addInventory'),
        updateItem= $('#updateInventory'),
        deleteItem=$('#deleteInventory'),
        showItem=$('#showInventoryDetails')
    form_close = $('.from_close'),
        cancelBtn = $('.cancelBtn'),
        deleteUser=$('#deleteUser')
        imgUploader = $('#imgUploader');
        home = $('.home');


var base64String;


    saveEmployee();
imageUploaderEmployee();
    getAllEmployeeData();
    clickTblRow();



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

    deleteEmployee.click(function () {
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
    // $('#mainLabel').text('Delete Employee')
    // $('#addbtn').text("Delete")
    //
    // home.addClass('show')
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
    form_container.css('max-width','800px')

})
cancelBtn.click(function () {
    home.removeClass('show');
    form_container.css('max-width','800px')

})
$(document).ready(function(){
    $("#employeeDOJ").datepicker({
        dateFormat: 'yy-mm-dd',
        maxDate: new Date()
    });
    $("#employeeDOB").datepicker({
        dateFormat: 'yy-mm-dd',
        maxDate: new Date()
    });
});
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
        if ($('#addbtn').text().trim()==='Save'){


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
                                
                            </tr>`;
                $('#tblEmployee').append(row);
            }
        },
        error: function (error) {
            console.log("error: ", error);
        }
    })
}

function clickTblRow() {

    $('#tblEmployee').on('click', 'tr', function(event) {
        console.log('click');



    });

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






