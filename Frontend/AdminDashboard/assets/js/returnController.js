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