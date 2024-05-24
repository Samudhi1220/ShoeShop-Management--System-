
btnCancel = $('.cancelBtn'),
    itemCode = $('#itemCode'),
    itemDesc = $('#itemDesc'),
    category = $('#itemCategory'),
    salePrice = $('#itemSellPrice'),
    buyPrice = $('#itemBuyPrice'),
    supplierName = $('#supplierNameItem')


// Variable to store the base64 string of the uploaded image
var base64String;
var inputData = [];




itemImageUploader();

getAllItems();
clickItemTblRow();





// deleteItem.click(function () {
//     Swal.fire({
//         title: "Are you sure?",
//         text: "You won't be able to revert this!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, delete it!"
//     }).then((result) => {
//         if (result.isConfirmed) {
//             Swal.fire({
//                 title: "Deleted!",
//                 text: "Your file has been deleted.",
//                 icon: "success"
//             });
//         }
//     });
//     // $('#inventoryLabel').text('Delete Item')
//     // $('#saveItembtn').text("Delete")
//     // home.addClass('show')
// });
// showItem.click(function () {
//     $('#inventoryLabel').text('All Item Details')
//     $('#saveItembtn').text("Close")
//     $('#saveItembtn').click(function () {
//         home.removeClass('show');
//
//     })
//     $('.hidden').removeClass('d-none')
//
//     home.addClass('show')
//     disableTxtField()
//
// });


// Function to reset the form





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
                          
                                 <img src="assets/images/action-btn (1) (1).png" id="showItem" height="35" width="35"/>
                            </tr>`;
                $('#tblItem').append(row);
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


