getAllOrders();

getAllSaleDetails();
function getAllSaleDetails() {
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/api/v1/orders/allDetails",
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (resp) {
            console.log('wada karanwa')
            console.log("Success: ", resp);
            $('#tblSaleDetails tbody').empty()
            for (const saleDetails of resp.data) {
                console.log(resp.data)
                const row = `<tr>
                           
                                <td>${saleDetails.orderNo.orderNo}</td>
                                <td>${saleDetails.inventory.itemCode}</td>
                                <td>${saleDetails.itmQTY}</td>
                                <td>${saleDetails.size}</td>
                                <td>${saleDetails.itmTotal}</td>
                                <td>${saleDetails.status}</td>
                                <td>${saleDetails.return_qty}</td>
                      
                               
                            </tr>`;
                $('#tblSaleDetails tbody').append(row);
            }
        },
        error: function (error) {
            console.log("error: ", error);
        }
    })
}

function getAllOrders() {
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/api/v1/orders/allOrders",
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
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