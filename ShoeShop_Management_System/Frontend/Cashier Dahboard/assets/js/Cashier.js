

const dashboardBtn = $('#dashboardBtn');
const customerBtn = $('#customerBtn');
const supplierBtn = $('#supplierBtn');
const inventoryBtn = $('#inventoryBtn');
const userBtn = $('#userBtn');
const addCustomer = $('#addCustomer');
    updateCustomer = $('#updateCustomer'),
    deleteCustomer = $('#deleteCustomer'),
    showCustomerDetails = $('#showCustomerDetails'),

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

dashboardBtn.click(function () {
    // $('#dashboard').css("display", "block");
    // $('#employee').css("display", "none");
    // $('#supplier').css("display", "none");
    // $('#inventory').css("display", "none");
    // $('#users').css("display", "none");
    dashboardBtn.addClass('active')
    customerBtn.removeClass('active')
    supplierBtn.removeClass('active')
    userBtn.removeClass('active')
    inventoryBtn.removeClass('active')
})

customerBtn.click(function () {
    // $('#employee').css("display", "block");
    // $('#dashboard').css("display", "none");
    // $('#supplier').css("display", "none");
    // $('#inventory').css("display", "none");
    // $('#users').css("display", "none");
    dashboardBtn.removeClass('active')
    customerBtn.addClass('active')
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
    customerBtn.removeClass('active')
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
    customerBtn.removeClass('active')
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
    customerBtn.removeClass('active')
    supplierBtn.removeClass('active')
    inventoryBtn.removeClass('active')
    userBtn.addClass('active')

})

form_close.click(function () {
    home.addClass('show')

})
addCustomer.click(function () {
        $('#mainLabel').text('Add Customer')
    home.addClass('show')
    $('#addbtn').text("Save")
    enableTxtField();

})
updateCustomer.click(function () {
    $('#mainLabel').text('Update Customer')
    home.addClass('show')
    $('#addbtn').text("Update")
    enableTxtField();

})

    deleteCustomer.click(function () {
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
    $('#mainLabel').text('All Customer Details')
    $('#addbtn').text("Close")
    $('#addbtn').click(function () {
        home.removeClass('show');
    })

    home.addClass('show')


});
addSupplier.click(function () {
    $('#supplierLabel').text('Add Supplier')
    home.addClass('show')
    $('#saveSupplierbtn').text("Save")
    enableTxtField()

});
updateSupplier.click(function () {
    $('#supplierLabel').text('Update Supplier')
    home.addClass('show')
    $('#saveSupplierbtn').text("Update")
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






