const addItem = $('#addInventory'),
    btnCancelInventory = $('.cancelBtn'),
    formCloseBtnInventory = $('.from_close'),
    itemCode = $('#itemCode'),
    itemDesc = $('#itemDesc'),
    category = $('#itemCategory'),
    salePrice = $('#itemSellPrice'),
    buyPrice = $('#itemBuyPrice'),
    supplierName = $('#supplierNameItem')


// Variable to store the base64 string of the uploaded image
var base64String;
var inputData = [];


checkItem();
checkSupplier();
itemImageUploader();
saveItem();
getAllItems();
clickItemTblRow();


formCloseBtnInventory.click(function () {
    home.removeClass('show');
    form_container.css('max-width', '800px')

})
btnCancelInventory.click(function () {
    home.removeClass('show');
    form_container.css('max-width', '800px')

})

addItem.click(function () {
    $('#inventoryLabel').text('Add Item')
    home.addClass('show')
    $('#saveItembtn').text("Save")

    $('.hidden').addClass('d-none')


});


function disableTxtField() {
    $('.txt').attr('readonly', "");

}

function enableTxtField() {
    $('.txt').removeAttr('readonly');
}

function getAllItems() {
    $.ajax({
        url: "http://localhost:8080/api/v1/inventory",
        method: "GET",
        success: function (resp) {
            console.log("Success: ", resp);
            $('#tblItem tbody').empty()
            for (const item of resp.data) {
                const row = `<tr>
                              
                                <td>${item.itemCode}</td>
                                <td>${item.supplier.supplierCode}</td>
                                <td>${item.supplierName}</td>
                                <td>${item.itemDesc}</td>
                                <td>${item.category}</td>
                                <td>${item.qty}</td>
                                <td>${item.size}</td>
                          
                                 <td>          <img src="assets/images/action-btn.png" id="updateItem" height="35" width="35"/>
                                         <img src="assets/images/action-btn (1) (1).png" id="showItem" height="35" width="35"/>
                            </td>
                                
                            </tr>`;
                $('#tblItem').append(row);
            }
        },
        error: function (error) {
            console.log("error: ", error);
        }
    })

}

function saveItem() {
    $('#saveItembtn').click(function () {
        if ($('#saveItembtn').text() === 'Save') {
            const data = {
                itemCode: $('#itemCode').val(),
                itemDesc: $('#itemDesc').val(),
                qty: $('#itemQty').val(),

                supplier: {
                    supplierCode: $('#supplierCodeItem').val()
                },
                category: $('#itemCategory').val(),
                itemPicture: base64String,
                supplierName: $('#supplierNameItem').text(),
                salePrice: $('#itemSellPrice').val(),
                buyPrice: $('#itemBuyPrice').val(),
                size: $('#itemSize').val()
            }
            console.log(data);
            $.ajax({
                url: "http://localhost:8080/api/v1/inventory",
                method: "POST",
                data: JSON.stringify(data),
                contentType: "application/json",
                success: function (resp) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Item has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    getAllItems();
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

function updateItem() {
    $('#saveItembtn').click(function () {
        if ($('#saveItembtn').text() === 'Update') {
            const data = {
                itemCode: $('#itemCode').val(),
                itemDesc: $('#itemDesc').val(),
                qty: $('#itemQty').val(),
                supplier: {
                    supplierCode: $('#supplierCodeItem').val()
                },
                category: $('#itemCategory').val(),
                itemPicture: base64String,
                supplierName: $('#supplierNameItem').text(),
                salePrice: $('#itemSellPrice').val(),
                buyPrice: $('#itemBuyPrice').val(),
                size: $('#itemSize').val()
            }
            console.log(data);
            $.ajax({
                url: "http://localhost:8080/api/v1/inventory",
                method: "PATCH",
                data: JSON.stringify(data),
                contentType: "application/json",
                success: function (resp) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Item has been updated",
                        showConfirmButton: false,
                        timer: 1500
                    });

                    getAllItems();
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
                        $('#supplierNameItem').text('');
                    } else {
                        if (resp.data === 'Supplier Not Found') {
                            $('#supplierNameItem').css('color', 'red');
                            $('#supplierNameItem').text(resp.data);
                        } else {
                            $('#supplierNameItem').css('color', 'green');
                            $('#supplierNameItem').text(resp.data);
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
    const itemImageUploader = $('#imgUploader');
    const itemImageViewer = $('#imgViewer');

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
                                inputBox.eq(index).find('input[id="itemQty"]').on('focus', function () {
                                    if ($(this).val() === '0') {
                                        $(this).val('');
                                    }
                                });

                                inputBox.eq(index).find('input[id="itemQty"]').on('blur', function () {
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


function clickItemTblRow() {

    $('#tblItem').on('click', 'tr', function (event) {


    });
    $('#tblItem').on('click', '#updateItem', function (event) {
        $('#inventoryLabel').text('Update Item')
        home.addClass('show')
        $('#saveItembtn').text("Update")

        $('.hidden').addClass('d-none')
        enableTxtField()
        var row = $(this).closest('tr');
        var id = row.find('td:eq(0)').text()
        $.ajax({
            url: "http://localhost:8080/api/v1/inventory/" + id,
            type: "GET",
            dataType: "json",
            success: function (response) {

                console.log(response);
                setItemDataToTextField(response)
                updateItem(response)

            },
            error: function (xhr, status, error) {
                console.error('Failed to fetch image:', error);
            }
        });
        console.log(id)
    });
    $('#tblItem').on('click', '#showItem', function (event) {

        $('#inventoryLabel').text('All Item Details')
        $('#saveItembtn').text("Close")
        $('#saveItembtn').click(function () {
            home.removeClass('show');

        })
        $('.hidden').removeClass('d-none')

        home.addClass('show')
        disableTxtField()

        var row = $(this).closest('tr');
        var id = row.find('td:eq(0)').text()
        $.ajax({
            url: "http://localhost:8080/api/v1/inventory/" + id,
            type: "GET",
            dataType: "json",
            success: function (response) {

                console.log(response);
                setItemDataToTextField(response)
                getAllItems();

            },
            error: function (xhr, status, error) {
                console.error('Failed to fetch image:', error);
            }
        });
        console.log(id)
    });


}

function setItemDataToTextField(resp) {

    $('#itemCode').val(resp.itemCode);
    $('#itemDesc').val(resp.itemDesc);
    $('#itemCategory').val(resp.category);
    $('#itemQty').val(resp.qty);
    $('#itemSellPrice').val(resp.salePrice);
    $('#itemBuyPrice').val(resp.buyPrice);
    $('#supplierNameItem').val(resp.supplier.supplierName);
    $('#itemSize').val(resp.size);
    $('#supplierCodeItem').val(resp.supplier.supplierCode);
    $('#itemStatus').text(resp.status);
    base64String = resp.itemPicture;


}


