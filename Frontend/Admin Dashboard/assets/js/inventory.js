addItem = $('#addInventory'),
    updateItem = $('#updateInventory'),
    deleteItem = $('#deleteInventory'),
    showItem = $('#showInventoryDetails')
    btnCancel = $('.cancelBtn'),
    imgUploader = $('#imgUploader'),
itemCode = $('#itemCode').val(),
    itemDesc= $('#itemDesc').val(),
    category= $('#itemCategory').val(),
salePrice= $('#itemSellPrice').val(),
    buyPrice= $('#itemBuyPrice').val(),
    supplierName= $('#supplierNameItem').text()


// Base URL for the API
const apiBaseUrl = "http://localhost:8080/api/v1/inventory";

// Variable to store the base64 string of the uploaded image
var base64String;
var inputData = [];


checkItem();
checkSupplier();

itemImageUploader();


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



// Function to reset the form
function resetForm() {
    $('#itemCode').val('');
    $('#itemDesc').val('');
    $('#itemQty').val('');
    $('#itemCategory').val('');
    $('#supplierCodeItem').val('');
    $('#supplierNameItem').val('');
    $('#itemSellPrice').val('');
    $('#itemBuyPrice').val('');
    $('#supplierContactNumber01Item').val('');
    $('#supplierContactNumber02Item').val('');
    $('#supplierEmailItem').val('');
    $('#itemSize').val('');
    $('#imgUploader').val('');
    $('#imgViewer').attr('src', ''); // Reset image viewer
}


imgUploader.change(function () {
    var file = $(this)[0].files[0];
    if (file) {
        // $('#fileValue').text('Selected file: ' + file.name);
        console.log(file.name)
    } else {
        // $('#fileValue').text('No file selected');
    }
});

function disableTxtField() {
    $('.txt').attr('readonly', "");

}

function enableTxtField() {
    $('.txt').removeAttr('readonly');
}



function checkSupplier() {
    $('#supplierCodeItem').keyup(function () {
        const code = {
            supplier: {
                supplierCode: $(this).val()
            }
        }
        $.ajax({
            url: "http://localhost:8080/api/v1/inventory/supplier",
            method: "POST",
            data: JSON.stringify(code),
            contentType: "application/json",
            success: function (resp) {
                if (resp.state == 200) {
                    console.log(resp);
                    if ($('#supplierCodeItem').val() === '') {
                        $('#supplierNameItem').val('');
                    } else {
                        if (resp.data === 'Supplier Not Found') {
                            $('#supplierNameItem').css('color', 'red');
                            $('#supplierNameItem').val(resp.data);
                        } else {
                            $('#supplierNameItem').css('color', 'green');
                            $('#supplierNameItem').val(resp.data);
                        }

                    }

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
    })
}
function itemImageUploader() {
    const itemImageUploader = $('#itemImgUploader');
    const itemImageViewer = $('#itemImgViewer');

    itemImageUploader.change(function () {

        var file = this.files[0];

        if (file) {
            var reader = new FileReader();

            reader.onload = function (e) {
                itemImageViewer.attr('src', e.target.result);
                base64String = reader.result.split(',')[1];
            };

            reader.readAsDataURL(file);
        } else {
            itemImageViewer.attr('src', '#');
        }
    })
}

function checkItem() {
    $('#itemCode').keyup(function () {
        const code = {
            itemCode: $(this).val()
        }
        $.ajax({
            url: "http://localhost:8080/api/v1/inventory/status",
            method: "POST",
            data: JSON.stringify(code),
            contentType: "application/json",
            success: function (resp) {
                if (resp.state == 200) {
                    console.log(resp);
                    if ($('#itemCode').val() === '') {
                        $('#itemStatus').text('');
                    } else {
                        $('#itemStatus').text(resp.data.status);
                        if (resp.data.status !== "No Item Found") {

                            console.log(resp);


                            $('.inputBox').not(':first').remove();

                            inputData = resp.data.sizeList;
                            resp.data.sizeList.forEach(function (item, index) {
                                if (index > 0) {
                                    var newInput = $('.inputBox:first').clone();
                                    $('#inputContainer').append(newInput);
                                }
                                var inputBox = $('.inputBox');
                                inputBox.eq(index).find('input[id="itemColor"]').val(item.color);
                                inputBox.eq(index).find('input[id="itemSize"]').val(item.size);
                                inputBox.eq(index).find('input[id="itemQty"]').val(0);
                                inputBox.eq(index).find('input[id="itemQty"]').on('focus', function(){
                                    if ($(this).val() === '0') {
                                        $(this).val('');
                                    }
                                });

                                inputBox.eq(index).find('input[id="itemQty"]').on('blur', function(){
                                    if ($(this).val() === '') {
                                        $(this).val('0');
                                    }
                                });
                            });
                            $('#itemStatus').css('color', 'green');
                            $('.dis').prop('disabled', true);

                        } else {
                            $('#itemImgViewer').attr('src', '#');
                            $('#itemBuyPrice').val('');
                            $('#itemSellPrice').val('');
                            $('#itemSize').val('');
                            $('#itemDesc').val('');
                            $('#supplierCodeItem').val('');
                            $('#itemCategory').val('');
                            $('#itemStatus').css('color', 'red');
                            $('#inputContainer .inputBox:not(:first)').remove();
                            $('#itemColor, #itemSize, #itemQty').val('');
                            $('.dis').prop('disabled', false);

                        }
                    }

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
    })
}