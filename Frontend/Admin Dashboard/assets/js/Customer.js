const addCustomer = $('#addCustomer'),
    updateCustomer = $('#updateCustomers'),
    deleteCustomers = $('#deleteCustomers'),
    showCustomerDetails = $('#showCustomerDetails')
form_closeCustomer = $('.from_close'),
    cancelBtnCustomer = $('.cancelBtn'),
    home = $('.home');

saveCustomer();
getAllCustomer();
clickCustomerTblRow();
searchCustomer();
addCustomer.click(function () {
    $('#mainLabelCustomer').text('Add Customer')
    home.addClass('show')
    $('#addbtnCustomer').text("Save")
    $("#customerGender").prop('disabled', false);
    $("#customerDOB").prop('disabled', false);
    $("#customerDOJ").prop('disabled', false);

    generateNewCustomerId();

})

deleteCustomers.click(function () {
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
showCustomerDetails.click(function () {
    $('#mainLabelCustomer').text('All Customer Details')
    $('#addbtnCustomer').text("Close")
    $('#addbtnCustomer').click(function () {
        home.removeClass('show');
    })

    home.addClass('show')
    $("#customerGender").prop('disabled', false);
    $("#customerDOB").prop('disabled', false);
    $("#customerDOJ").prop('disabled', false);
    disableTxtField();


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
    $("#customerDOJ").datepicker({
        dateFormat: 'yy-mm-dd',
        maxDate: new Date()
    });
    $("#customerDOB").datepicker({
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


function generateNewCustomerId() {
    fetch("http://localhost:8080/api/v1/customer/id")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Read response as text
        })
        .then(data => {
            console.log(data);
            $('#customerCode').val(data.data); // Assuming data is a string
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
function saveCustomer() {
    $('#addbtnCustomer').click(function () {
        if ($(this).text().trim() === 'Save') {
            const postData = {
                customerId: $('#customerCode').val(),
                customerName: $('#customerName').val(),
                gender: $('#customerGender').val(),
                loyaltyDate: $('#customerDOJ').val(),
                customerDob: $('#customerDOB').val(),
                address: {
                    buildNo: $('#customerBuilding').val(),
                    lane: $('#customerLane').val(),
                    city: $('#customerCity').val(),
                    state: $('#customerState').val(),
                    postalCode: $('#customerPostalCode').val()
                },
                level: "NEW",
                totalPoints: 0,
                contactNo: $('#customerContactNo').val(),
                email: $('#customerEmail').val(),
                recentPurchase: null,
            }

            $.ajax({
                url: "http://localhost:8080/api/v1/customer",
                method: "POST",
                data: JSON.stringify(postData),
                contentType: "application/json",
                success: function (resp) {
                    if (resp.state == 200) {
                        console.log(resp);
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Customer has been saved",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        console.log("resp");
                        getAllCustomer();
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

function getAllCustomer(){
    $.ajax({
        url: "http://localhost:8080/api/v1/customer",
        method: "GET",
        success: function (resp) {
            console.log("Success: ", resp);
            $('#tblCustomer tbody').empty()
            for (const customer of resp.data) {
                const row = `<tr>
                              
                                <td>${customer.customerId}</td>
                                <td>${customer.customerName}</td>
                                <td>${customer.address.buildNo + " " + customer.address.lane + " " + customer.address.state + " " + customer.address.city + " " + customer.address.postalCode}</td>
                                <td>${customer.loyaltyDate}</td>
                                <td>${customer.totalPoints}</td>
                                <td>${customer.level}</td>
                                 <td>          <img src="assets/images/action-btn.png" id="updateCustomers" height="35" width="35"/>
                                         <img src="assets/images/action-delete-btn.png" id="deleteCustomers"  height="35" width="35"/>
                                         <img src="assets/images/action-btn (1) (1).png" id="showCustomerDetails" height="35" width="35"/>
                            </td>
                                
                            </tr>`;
                $('#tblCustomer').append(row);
            }
        },
        error: function (error) {
            console.log("error: ", error);
        }
    })
}
function setCustomerDataToTextField(response) {
    $('#customerCode').val(response.customerId);
    $('#customerName').val(response.customerName);
    $('#customerGender').val(response.gender);
    $('#customerDOB').val(response.customerDob);
    $('#customerDOJ').val(response.loyaltyDate);
    $('#customerBuilding').val(response.address.buildNo);
    $('#customerLane').val(response.address.lane);
    $('#customerCity').val(response.address.city);
    $('#customerState').val(response.address.state);
    $('#customerPostalCode').val(response.address.postalCode);
    $('#customerContactNo').val(response.contactNo);
    $('#customerEmail').val(response.email);
    $('#customerLevels').val(response.level);
    $('#customerPoint').val(response.totalPoints);
    $('#customerRecentPurchaseDate').val(response.recentPurchase);
}

function customerUpdate(response) {
    console.log("updateCustomers");
    $('#addbtnCustomer').click(function () {
        if ($(this).text().trim() === 'Update') {
            const postData = {
                customerId: $('#customerCode').val(),
                customerName: $('#customerName').val(),
                gender: $('#customerGender').val(),
                loyaltyDate: $('#customerDOJ').val(),
                customerDob: $('#customerDOB').val(),
                address: {
                    buildNo: $('#customerBuilding').val(),
                    lane: $('#customerLane').val(),
                    city: $('#customerCity').val(),
                    state: $('#customerState').val(),
                    postalCode: $('#customerPostalCode').val()
                },
                totalPoints: response.totalPoints,
                level: response.level,
                recentPurchase: response.recentPurchase,
                contactNo: $('#customerContactNo').val(),
                email: $('#customerEmail').val(),
            };

            $.ajax({
                url: "http://localhost:8080/api/v1/customer",
                method: "PATCH",
                data: JSON.stringify(postData),
                contentType: "application/json",
                success: function (resp) {
                    if (resp.state == 200) {
                        console.log(resp);
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Customer has been Updated",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        $('#tblCustomer tr').each(function () {

                                var row = $(this);
                                row.find('td:eq(0)').text($('#customerCode').val());
                                row.find('td:eq(1)').text($('#customerName').val());
                                row.find('td:eq(2)').text($('#customerBuilding').val()+" "+
                                    $('#customerLane').val()+" "+$('#customerState').val()+" "+$('#customerCity').val()
                                    +" "+$('#customerPostalCode').val());
                                row.find('td:eq(3)').text($('#customerDOJ').val());

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

function deleteCustomer(id) {
    $('#deleteCustomers').click(function () {
        $.ajax({
            url: "http://localhost:8080/api/v1/customer/" + id,
            type: "DELETE",
            success: function (response) {
                getAllCustomer();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Customer has been Deleted",
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

function searchCustomer() {
    $('#searchCustomer').keyup(function (event) {

        var idOrName = $(this).val();
        $.ajax({
            url: "http://localhost:8080/api/v1/customer?idOrName=" + idOrName,
            type: "GET",
            dataType: "json",
            success: function (response) {
                $('#tblCustomer tbody').empty()
                for (const customer of response.data) {
                    const row = `<tr>
                            
                                <td>${customer.customerId}</td>
                                <td>${customer.customerName}</td>
                                <td>${customer.address.buildNo + " " + customer.address.lane + " " + customer.address.state + " " + customer.address.city + " " + customer.address.postalCode}</td>
                                <td>${customer.loyaltyDate}</td>
                                <td>${customer.totalPoints}</td>
                                <td>${customer.level}</td>
                                
                            </tr>`;
                    $('#tblCustomer').append(row);
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

function clickCustomerTblRow() {

    $('#tblCustomer').on('click', 'tr', function (event) {


    });
    $('#tblCustomer').on('click', '#updateCustomers', function (event) {

        $('#mainLabelCustomer').text('Update Customer')
        home.addClass('show')
        $('#addbtnCustomer').text("Update")
        $("#customerGender").prop('disabled', false);
        $("#customerDOB").prop('disabled', false);
        $("#customerDOJ").prop('disabled', false);
        enableTxtField()
        var row = $(this).closest('tr');
        var id = row.find('td:eq(0)').text()
        $.ajax({
            url: "http://localhost:8080/api/v1/customer/" + id,
            type: "GET",
            dataType: "json",
            success: function (response) {

                console.log(response);
                setCustomerDataToTextField(response)
                customerUpdate(response)

            },
            error: function (xhr, status, error) {
                console.error('Failed to fetch image:', error);
            }
        });
        console.log(id)
    });
    $('#tblCustomer').on('click', '#showCustomerDetails', function (event) {

        $('#mainLabel').text('Customer Details')
        home.addClass('show')
        $('#addbtn').text("Details")

        $("#customerDOB").prop('disabled', true);
        $("#customerDOJ").prop('disabled', true);


        disableTxtField();
        var row = $(this).closest('tr');
        var id = row.find('td:eq(0)').text()
        $.ajax({
            url: "http://localhost:8080/api/v1/customer/" + id,
            type: "GET",
            dataType: "json",
            success: function (response) {

                console.log(response);
                setCustomerDataToTextField(response)
                getAllCustomer();

            },
            error: function (xhr, status, error) {
                console.error('Failed to fetch image:', error);
            }
        });
        console.log(id)
    });

    $('#tblCustomer').on('click', '#deleteCustomers', function (event) {


        var row = $(this).closest('tr');
        var id = row.find('td:eq(0)').text()
        deleteCustomer(id)
        console.log(id)
    });


}
form_closeCustomer.click(function () {
    home.addClass('show')

})


function disableTxtField() {
    $('.txt').attr('readonly', "");

}

function enableTxtField() {
    $('.txt').removeAttr('readonly');
}
