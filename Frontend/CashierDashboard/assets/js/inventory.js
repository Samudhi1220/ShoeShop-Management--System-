const form_closeInventory = $('.from_close'),
    cancelBtnInventory = $('.cancelBtn');
home=$('')


// Variable to store the base64 string of the uploaded image
var base64String;

itemImageUploader();
getAllItems();
clickItemTblRow();


form_closeInventory.click(function () {
    $('.home').removeClass('show');
    $('.form-container').css('max-width', '800px')

})
cancelBtnInventory.click(function () {
    $('.home').removeClass('show');
    $('.form-container').css('max-width', '800px')

})


function disableTxtField() {
    $('.txt').attr('readonly', "");

}

function getAllItems() {
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/api/v1/inventory",
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
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
                                    <td>     
                                     <img src="assets/images/action-btn (1) (1).png" id="showItem" height="35" width="35"/>     
                            </td>
                                
                            </tr>`;
                $('#tblItem tbody').append(row);
            }
        },
        error: function (error) {
            console.log("error: ", error);
        }
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


function clickItemTblRow() {

    $('#tblItem').on('click', 'tr', function (event) {


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
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: "http://localhost:8080/api/v1/inventory/" + id,
            type: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
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


