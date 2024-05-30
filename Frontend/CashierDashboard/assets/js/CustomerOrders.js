getItemDetails();
getCustomerDetails();
generateNewOrderId();
addToCart();
purchaseOrder();
removeCart();

let newId;
let itemUnitPrice;
let itemSize;
let fullQty;
let totalQty;
console.log(newId);
let itemCart = [];
$('#customerType').on('change', function () {
    $('#orderCustomerId').val('')
    $('#customerNameOrder').val('')
    $('#customerLevel').val('')

    if ($('#customerType').val() === "Loyalty") {
        $('.orderCustomerId').removeClass('d-none')
        $('.customerNameOrder').removeClass('d-none')
        $('.customerLevel').removeClass('d-none')
    } else {
        $('.orderCustomerId').addClass('d-none')
        $('.customerNameOrder').addClass('d-none')
        $('.customerLevel').addClass('d-none')
    }
})

$('#paymentMethod').on('change', function () {
    $('#amountToPay').val('')
    $('#last4digit').val('')
    $('#bankName').val('')

    if ($('#paymentMethod').val() === "Cash Payment") {
        $('.cashPay').removeClass('d-none')
        $('.cardPay').addClass('d-none')
    } else {
        $('.cashPay').addClass('d-none')
        $('.cardPay').removeClass('d-none')
    }
})


function getItemDetails() {
    $('#OrderItemId').keyup(function () {
        console.log('wada')

        OrderItemId = $(this).val();
        const code = {
            itemCode: $(this).val(),
        }
        console.log($(this).val())
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: "http://localhost:8080/api/v1/orders/item",
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            data: JSON.stringify(code),
            contentType: "application/json",
            success: function (response) {
                if ($('#OrderItemId').val() === '') {

                    $('#itemFoundStatus').addClass('d-none');


                } else {
                    if (response.data !== "Item Not Found!") {
                        $('#itemFoundStatus').addClass('d-none');
                        $('#size').text(response.data.size);
                        $('#desc').text(response.data.itemDesc);
                        itemUnitPrice = response.data.salePrice;
                        itemSize = response.data.size;
                        fullQty = response.data.qty;
                        $('#viewItem').attr('src', 'data:image/jpeg;base64,' + response.data.itemPicture);
                    } else {

                        $('#itemFoundStatus').removeClass('d-none');
                        console.log("hiiiii");
                        console.log(response.data.size);
                        console.log(response.data.itemDesc);
                        $('#size').text('');
                        $('#desc').text('');

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

function getCustomerDetails() {
    console.log("Controller: PurchaseOrderController");
    $('#orderCustomerId').keyup(function () {
        var customerId = $(this).val();
        const code = {
            customerId: customerId
        }
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: "http://localhost:8080/api/v1/orders/customer",
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            data: JSON.stringify(code),
            contentType: "application/json",
            success: function (response) {
                if ($('#orderCustomerId').val() === '') {
                    $('#customerFoundStatus').addClass('d-none');
                } else {
                    if (response.data !== "Customer Not Found!") {
                        $('#customerLevel').val(response.data.level);
                        $('#customerNameOrder').val(response.data.customerName);
                        // customerName = response.data.customerName;
                        $('#customerFoundStatus').addClass('d-none');
                    } else {
                        console.log("response");
                        $('#customerFoundStatus').removeClass('d-none');
                        $('#customerFoundStatus').text("Customer Not Found!");
                        $('#customerLevel').val('');
                        $('#customerName').val('');
                    }
                }
            },
            error: function (resp) {
                // console.log(resp);
            }
        });
    })
}

function generateNewOrderId() {
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    fetch("http://localhost:8080/api/v1/orders/id",{
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Read response as text
        })
        .then(data => {
            console.log(data);
            newId = data.data// Assuming data is a string
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function addToCart() {
    $('#addToCart').click(function () {
        if ($('#OrderItemId').val() !== '') {

            if (parseInt($('#itemQtyOrder').val()) <= parseInt(fullQty)) {
                
                let newQty  = parseInt($('#itemQtyOrder').val());

                let itemExists = false;
                
                for (let i = 0; i < itemCart.length; i++) {
                    
                    if (itemCart[i].inventory.itemCode === $('#OrderItemId').val()) {
                        
                         totalQty = parseInt(itemCart[i].itmQTY) + newQty;
                        
                        console.log(fullQty);
                        console.log(totalQty);
                        
                        if (totalQty > fullQty){
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "The quantity you selected exceeds the available stock. Please adjust your order.",
                                footer: '<a href="#"></a>'
                            });
                            
                            return;
                        }
                        
                        itemCart[i].itmQTY = totalQty;
                        itemCart[i].itmTotal = itemUnitPrice * itemCart[i].itmQTY;
                        itemExists = true;
                        break;
                    }
                }

                if (!itemExists){
                const saleDetails = {
                    orderDetailPK: {
                        orderNo: newId,
                        itemCode: $('#OrderItemId').val()
                    },

                    itmQTY: $('#itemQtyOrder').val(),
                    orderNo: {
                        orderNo: newId
                    },
                    inventory: {
                        itemCode: $('#OrderItemId').val()
                    },
                    itmTotal: $('#itemQtyOrder').val() * itemUnitPrice,
                    size: itemSize,
                    unitPrice: itemUnitPrice
                }

                itemCart.push(saleDetails);

                }

                $('#tblCart tbody').empty()
                for (const itemCartElement of itemCart) {
                    const row = `<tr>
                           
                                <td>${itemCartElement.orderNo.orderNo}</td>
                                <td>${itemCartElement.inventory.itemCode}</td>
                                <td>${itemCartElement.itmQTY}</td>
                                <td>${itemCartElement.size}</td>
                                <td>${itemCartElement.itmTotal}</td>
                                    <td>    
                                    
                                      
                                         <img src="../assets/images/action-delete-btn.png" id="removeCart" height="35" width="35"/>
                            </td>
                            </tr>`;
                    $('#tblCart tbody').append(row);
                }

                let total = 0;
                itemCart.forEach(item => {
                    total += item.itmQTY * itemUnitPrice; // Calculate total price for each item
                });

                $('#total').text(total);
            }else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Please Check Qty",
                    footer: '<a href="#"></a>'
                });
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please Add item",
                footer: '<a href="#"></a>'
            });
        }
    });
}

function purchaseOrder() {
    $('#paymentMethod').change(function () {
        $('#balance').text('00.00');

        if ($(this).val() === 'Cash Payment') {
            $('#amountToPay').off('keyup');
            
            $('#amountToPay').keyup(function () {
                let amount = parseFloat($(this).val());
                let totalPrice = parseFloat($('#total').text());

                if (!isNaN(amount) && amount > 0) {
                    let balance = amount - totalPrice;
                    console.log(balance);
                    $('#balance').text(balance.toFixed(2));
                } else {
                    $('#balance').text('00.00');
                }
            });

        } else if ($(this).val() === 'Card Payment') {
            $('#amountToPay').off('keyup');
        }
    });

    

    // let cashierName;
    // performAuthenticatedRequest();
    // const accessToken = localStorage.getItem('accessToken');
    // $.ajax({
    //     url: "http://localhost:8080/api/v1/employees/byEmail/" + localStorage.getItem("email"),
    //     type: "GET",
    //     headers: {
    //         'Authorization': 'Bearer ' + accessToken
    //     },
    //     dataType: "json",
    //     success: function (response) {
    //         console.log(response);
    //         cashierName = response.data.employeeName;
    //         console.log(cashierName)
    //     },
    //     error: function (xhr, status, error) {
    //         console.error('Failed to fetch image:', error);
    //     }
    // });


    $('#purchaseOrderBtn').click(function () {
        let total = 0;
        itemCart.forEach(item => {
            total += item.itmQTY * item.unitPrice; // Calculate total price for each item
        });

        let customerId;
        if ($('#orderCustomerId').val() === '') {
            customerId = null;
        }else {
            customerId = $('#orderCustomerId').val();
        }
        console.log(total);
        const data = {
            orderNo: newId,
            // purchaseDate: date,
            total: total,
            paymentMethod: $('#paymentMethod').val(),
            cashier: null,
            customerName: $('#customerNameOrder').val(),
            customerId: {
                customerId: customerId
            },
            saleDetails: itemCart,
            // Order_Status: "ACTIVE"
        }

        console.log(data);
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: "http://localhost:8080/api/v1/orders",
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            data: JSON.stringify(data),
            // headers: {
            //     'Authorization': 'Bearer ' + accessToken
            // },
            contentType: "application/json",
            success: function (resp) {
                if (resp.state == 200) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Order has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });

                    $('#tblCart tbody').empty();
                    $('#total').text('00.00')
                    $('#balance').text('00.00')
                    console.log("resp");

                    // generateNewOrderId();
                    generateNewOrderId();
                    itemCart = [];
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

function removeCart() {
    $('#tblCart').on('click', '#removeCart', function (event) {
        console.log("aaaaaa");
        
        const row = $(this).closest('tr');
        const id = row.find('td:eq(1)').text();

        let index = itemCart.findIndex(function (cartItem) {
            return cartItem.inventory.itemCode === id;
        });

        if (index !== -1) {
            itemCart.splice(index, 1);
            // totalQuantity = 0;
        }
        row.remove();
    })
}

function change() {
    
}