checkCanBeReturnedOrder();

$('#orderType').on('change', function () {
    $('#itemId').val('')
    $('#itemQtyOrders').val('')

    if ($('#orderType').val() === "One Item") {
        $('.itemId').removeClass('d-none')
        $('.itemQtyOrders').removeClass('d-none')

    } else {
        $('.itemId').addClass('d-none')
        $('.itemQtyOrders').addClass('d-none')

    }
})

function returnFullOrder(id) {
    if ($('#orderType').val() === 'Full Order') {
        $.ajax({
            url: "http://localhost:8080/api/v1/orders/" + id,
            type: "POST",
            contentType: "application/json",
            success: function (response) {
                getAllOrders();
                console.log(response.data);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Order has been Returned",
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

}

function checkCanBeReturnedOrder() {
    $('#returnFormBtn').click(function () {

        let id = $('#orderId').val()
        if ($('#orderId').val() !== '') {

            $.ajax({
                url: "http://localhost:8080/api/v1/orders/" + id,
                type: "GET",

                dataType: "json",
                success: function (response) {
                    if (response.data) {
                        returnFullOrder(id);
                        alert(response.data);
                    } else {
                        alert(response.data);
                    }
                },
                error: function (xhr, status, error) {
                    console.error('Failed to fetch:', error);
                }
            });
        }
    })
}