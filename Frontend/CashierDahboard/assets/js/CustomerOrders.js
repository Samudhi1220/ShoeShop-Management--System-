getItemDetails();

if ($('#customerTyper').val() === "Loyalty") {
    $('#orderCustomerId').addClass('d-none')
    $('#customerNameOrder').addClass('d-none')
    $('#customerLevel').addClass('d-none')
}



function getItemDetails() {

    $('#OrderItemId').keyup(function () {
        console.log('wada')

        OrderItemId = $(this).val();
        const code = {
            itemCode: $(this).val(),
        }
        console.log($(this).val())
        $.ajax({
            url: "http://localhost:8080/api/v1/orders/item",
            method: "POST",
            data: JSON.stringify(code),
            contentType: "application/json",
            success: function (response) {
                if ($('#OrderItemId').val() === '') {

                    $('#itemFoundStatus').addClass('d-none');


                } else {
                    if (response.data !== "Item Not Found!") {
                        $('#itemFoundStatus').addClass('d-none');
                    }else {

                        $('#itemFoundStatus').removeClass('d-none');
                        console.log("hiiiii");
                        $('#size').text(response.data.size);

                        $('#desc').text(response.data.itemDesc);

                    }

                }
                console.log(response)
                console.log($('#size').text());
                console.log(response.data.itemDesc);
            },
            error: function (resp) {
                // console.log(resp);
            }

        });

    })
}




