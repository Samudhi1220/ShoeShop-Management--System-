const addSupplier = $('#addSupplier'),
    formCloseSupplier = $('.from_close'),
    btnCancelSupplier = $('.cancelBtn')


saveSupplier();
clickTblRow();
updateSuppliers()
getAllSuppliers()
searchSupplier();


formCloseSupplier.click(function () {
    $('.home').removeClass('show');
    $('.form-container').css('max-width', '800px')


})
btnCancelSupplier.click(function () {
    $('.home').removeClass('show');
    $('.form-container').css('max-width', '800px')

})

function generateNewSupplierId() {
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    fetch("http://localhost:8080/api/v1/supplier/id",{
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Read response as text
        })
        .then(data => {
            console.log(data);
            $('#supplierCode').val(data.data); // Assuming data is a string
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

addSupplier.click(function () {
    $('#supplierLabel').text('Add Supplier')
    home.addClass('show')
    $('#saveSupplierbtn').text("Save")
    enableTxtField()
    $('.txt').val("")
    $('#supplierCategory').val($('#supplierCategory option:first').val());
    $('#supplierCode').attr('readonly', "");
    console.log("supplierFunction");
    generateNewSupplierId()
    saveSupplier()

});

function getAllSuppliers() {
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/api/v1/supplier",
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (resp) {
            console.log("Success: ", resp);
            $('#tblSupplier tbody').empty()
            for (const supplier of resp.data) {
                const row = `<tr>
                           
                                <td>${supplier.supplierCode}</td>
                                <td>${supplier.supplierName}</td>
                                <td>${supplier.category}</td>
                                <td>${supplier.mobileNo}</td>
                                <td>${supplier.email}</td>
                                <td>          <img src="assets/images/action-btn.png" id="updateSupplier" height="35" width="35"/>
                                         <img src="assets/images/action-delete-btn.png" id="deleteSupplier"  height="35" width="35"/>
                                         <img src="assets/images/action-btn (1) (1).png" id="showSupplierDetails" height="35" width="35"/>
                            </td>
                            </tr>`;
                $('#tblSupplier').append(row);
            }
        },
        error: function (error) {
            console.log("error: ", error);
        }
    })
}

function setSupplierDataToTextField(response) {
    $('#supplierCode').val(response.supplierCode);
    $('#supplierName').val(response.supplierName);
    $('#supplierCategory').val(response.category);
    $('#supplierPostalCode').val(response.address.postalCode);
    $('#supplierState').val(response.address.state);
    $('#supplierCity').val(response.address.city);
    $('#supplierLane').val(response.address.lane);
    $('#supplierBuilding').val(response.address.buildNo);
    $('#supplierCountry').val(response.address.supCountry);
    $('#supplierEmail').val(response.email);
    $('#supplierContactNumber01').val(response.mobileNo);
    $('#supplierContactNumber02').val(response.landNo);
}

function clickTblRow() {

    $('#tblSupplier').on('click', 'tr', function (event) {


    });
    $('#tblSupplier').on('click', '#updateSupplier', function (event) {

        $('#supplierLabel').text('Update Supplier')
        home.addClass('show')
        $('#saveSupplierbtn').text("Update")
        enableTxtField();
        var row = $(this).closest('tr');
        var id = row.find('td:eq(0)').text()
        console.log("supplier id: " + id)
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: "http://localhost:8080/api/v1/supplier/" + id,
            type: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            dataType: "json",
            success: function (response) {
                setSupplierDataToTextField(response);
                updateSuppliers();

            },
            error: function (xhr, status, error) {
                console.error('Failed to fetch image:', error);
            }
        });
        console.log(id)
    });
    $('#tblSupplier').on('click', '#showSupplierDetails', function (event) {

        $('#supplierLabel').text('Supplier Details')
        home.addClass('show')
        $('#saveSupplierbtn').text("Details")
        var row = $(this).closest('tr');
        var id = row.find('td:eq(0)').text()
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: "http://localhost:8080/api/v1/supplier/" + id,
            type: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            dataType: "json",
            success: function (response) {

                console.log(response);
                setSupplierDataToTextField(response)
                disableTxtField()
                getAllSuppliers();

            },
            error: function (xhr, status, error) {
                console.error('Failed to fetch image:', error);
            }
        });
        console.log(id)
    });

    $('#tblSupplier').on('click', '#deleteSupplier', function (event) {


        var row = $(this).closest('tr');
        var id = row.find('td:eq(0)').text()
        deleteSuppliers(id)
        console.log(id)
    });


}


function updateSuppliers() {
    $('#saveSupplierbtn').click(function () {
        if ($(this).text().trim() === 'Update') {
            const postData = {
                supplierCode: $('#supplierCode').val(),
                supplierName: $('#supplierName').val(),
                email: $('#supplierEmail').val(),
                category: $('#supplierCategory').val(),
                address: {
                    buildNo: $('#supplierBuilding').val(),
                    lane: $('#supplierLane').val(),
                    city: $('#supplierCity').val(),
                    state: $('#supplierState').val(),
                    postalCode: $('#supplierPostalCode').val(),
                    supCountry: $('#supplierCountry').val(),
                },
                mobileNo: $('#supplierContactNumber01').val(),
                landNo: $('#supplierContactNumber02').val(),
            };
            performAuthenticatedRequest();
            const accessToken = localStorage.getItem('accessToken');
            $.ajax({
                url: "http://localhost:8080/api/v1/supplier",
                method: "PATCH",
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                data: JSON.stringify(postData),
                contentType: "application/json",
                success: function (resp) {
                    if (resp.state == 200) {
                        console.log(resp);
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Supplier has been Updated",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        $('#tblSupplier tr').each(function () {

                            var row = $(this);
                            row.find('td:eq(0)').text($('#supplierCode').val());
                            row.find('td:eq(1)').text($('#supplierName').val());
                            row.find('td:eq(2)').text($('#supplierCategory').val());
                            row.find('td:eq(3)').text($('#supplierContactNumber01').val());
                            row.find('td:eq(4)').text($('#supplierEmail').val());

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

function deleteSuppliers(id) {

        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: "http://localhost:8080/api/v1/supplier/" + id,
            type: "DELETE",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function (response) {
                getAllSuppliers();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Supplier has been Deleted",
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

}

function disableTxtField() {
    $('.txt').attr('readonly', "");

}
function enableTxtField() {
    $('.txt').removeAttr('readonly');
}
function saveSupplier() {
    $('#saveSupplierbtn').click(function () {
        if ($(this).text().trim() === 'Save') {
            const postData = {
                supplierCode: $('#supplierCode').val(),
                supplierName: $('#supplierName').val(),
                email: $('#supplierEmail').val(),
                category: $('#supplierCategory').val(),
                address: {
                    buildNo: $('#supplierBuilding').val(),
                    lane: $('#supplierLane').val(),
                    city: $('#supplierCity').val(),
                    state: $('#supplierState').val(),
                    postalCode: $('#supplierPostalCode').val(),
                    supCountry: $('#supplierCountry').val(),
                },
                mobileNo: $('#supplierContactNumber01').val(),
                landNo: $('#supplierContactNumber02').val(),
            }
            performAuthenticatedRequest();
            const accessToken = localStorage.getItem('accessToken');
            $.ajax({
                url: "http://localhost:8080/api/v1/supplier",
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                data: JSON.stringify(postData),
                contentType: "application/json",
                success: function (resp) {
                    if (resp.state == 200) {
                        console.log(resp);
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Supplier has been saved",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        $('.cancelBtn').click(
                            home.removeClass('show')
                        );

                    }
                    // $('#supplierFormContainer').modal('hide');
                    console.log("resp");
                    getAllSuppliers();
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

function searchSupplier() {
    $('#searchSuppliers').keyup(function (event) {
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        var idOrName = $(this).val();
        $.ajax({
            url: "http://localhost:8080/api/v1/supplier?idOrName=" + idOrName,
            type: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            dataType: "json",
            success: function (response) {
                $('#tblSupplier tbody').empty()
                for (const supplier of response.data) {
                    const row = `<tr>
                       
                                <td>${supplier.supplierCode}</td>
                                <td>${supplier.supplierName}</td>
                                <td>${supplier.category}</td>
                                <td>${supplier.mobileNo}</td>
                                <td>${supplier.email}</td>
                                
                            </tr>`;
                    $('#tblSupplier').append(row);
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


