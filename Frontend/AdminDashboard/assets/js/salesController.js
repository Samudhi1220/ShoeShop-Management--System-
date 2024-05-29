getAllOrders();
function getAllOrders() {

    $.ajax({
        url: "http://localhost:8080/api/v1/orders/allOrders",
        method: "GET",
        success: function (resp) {
            console.log('wada karanwa')
            console.log("Success: ", resp);
            $('#tblSale tbody').empty()
            for (const orders of resp.data) {
                console.log(resp.data)
                const row = `<tr>
                           
                                <td>${orders.orderNo}</td>
                                <td>${orders.cashier}</td>
                                <td>${orders.purchaseDate}</td>
                                <td>${orders.total}</td>
                                <td>${orders.status}</td>
                               
                            </tr>`;
                $('#tblSale tbody').append(row);
            }
        },
        error: function (error) {
            console.log("error: ", error);
        }
    })

}