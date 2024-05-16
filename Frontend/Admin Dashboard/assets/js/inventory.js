addItem = $('#addInventory'),
    updateItem = $('#updateInventory'),
    deleteItem = $('#deleteInventory'),
    showItem = $('#showInventoryDetails')
    btnCancel = $('.cancelBtn'),
    imgUploader = $('#imgUploader');




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

function checkLowInventory(items) {
    const lowInventoryItems = [];

    items.forEach(item => {
        const lowerLevel = item.stock / 2; // 50% of one stock
        if (item.quantity <= lowerLevel) {
            lowInventoryItems.push(item);
        }
    });

    return lowInventoryItems;
}


function checkSupplier() {
    $('#supplierCode').keyup(function () {
        const supplierCode = $(this).val();
        $.ajax({
            url: `http://localhost:8080/api/v1/suppliers/${supplierCode}`,
            method: "GET",
            success: function (resp) {
                if (resp.state == 200) {
                    $('#supplierName').val(resp.data.supplierName);
                } else {
                    $('#supplierName').val('');
                }
            },
            error: function (resp) {
                $('#supplierName').val('');
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: resp.responseJSON.message,
                    footer: '<a href="#"></a>'
                });
            }
        });
    });
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
                    if ($('#itemCode').val() === '') {
                        $('#itemStatus').text('');
                    } else {
                        $('#itemStatus').text(resp.data.status);
                        if (resp.data.status !== "No Item Found") {
                            $('#itemImgViewer').attr('src', 'data:image/jpeg;base64,' + resp.data.itemPicture);
                            $('#itemBuyPrice').val(resp.data.buyPrice);
                            $('#itemSellPrice').val(resp.data.salePrice);
                            $('#itemDesc').val(resp.data.itemDesc);
                            $('#itemCategory').val(resp.data.category);
                            $('#supplierCode').val(resp.data.supplier.supplierCode);
                            $('#supplierName').text(resp.data.supplierName);
                            base64String = resp.data.itemPicture;
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
                                inputBox.eq(index).find('input[id="itemQty"]').val(item.qty);
                            });
                            $('#itemStatus').css('color', 'green');
                            $('.dis').prop('disabled', true);
                        } else {
                            $('#itemImgViewer').attr('src', '#');
                            $('#itemBuyPrice').val('');
                            $('#itemSellPrice').val('');
                            $('#itemSize').val('');
                            $('#itemDesc').val('');
                            $('#supplierCode').val('');
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
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: resp.responseJSON.message,
                    footer: '<a href="#"></a>'
                });
            }
        });
    });
}