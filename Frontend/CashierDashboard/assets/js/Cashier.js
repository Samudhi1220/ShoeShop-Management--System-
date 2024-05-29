const dashboardBtn = $('#dashboardBtn');
const customerBtn = $('#customerBtn');
const orderBtn = $('#orderBtn');
const inventoryBtn = $('#inventoryBtn');
const employeeBtn = $('#employeeBtn');
const supplierBtn = $('#supplierBtn');
const userBtn = $('#userBtn');
const saleBtn = $('#saleBtn');



$('#dashboard').removeClass('d-none')
$('#employee').addClass('d-none')
$('#supplier').addClass('d-none')
$('#inventory').addClass('d-none')
$('#customer').addClass('d-none')
$('#customerOrder').addClass('d-none')
$('#users').addClass('d-none')
$('#sales').addClass('d-none')


dashboardBtn.click(function () {

    dashboardBtn.addClass('active')
    customerBtn.removeClass('active')
    supplierBtn.removeClass('active')
    userBtn.removeClass('active')
    inventoryBtn.removeClass('active')
    employeeBtn.removeClass('active')
    orderBtn.removeClass('active')
    saleBtn.removeClass('active')

    $('#dashboard').removeClass('d-none')
    $('#employee').addClass('d-none')
    $('#supplier').addClass('d-none')
    $('#inventory').addClass('d-none')
    $('#customer').addClass('d-none')
    $('#customerOrder').addClass('d-none')
    $('#users').addClass('d-none')
    $('#sales').addClass('d-none')



})

customerBtn.click(function () {

    dashboardBtn.removeClass('active')
    customerBtn.addClass('active')
    supplierBtn.removeClass('active')

    employeeBtn.removeClass('active')
    userBtn.removeClass('active')
    inventoryBtn.removeClass('active')
    orderBtn.removeClass('active')
    saleBtn.removeClass('active')

    $('#dashboard').addClass('d-none')
    $('#employee').addClass('d-none')
    $('#supplier').addClass('d-none')
    $('#inventory').addClass('d-none')
    $('#customer').removeClass('d-none')
    $('#customerOrder').addClass('d-none')
    $('#users').addClass('d-none')
    $('#sales').addClass('d-none')



})
orderBtn.click(function () {

    dashboardBtn.removeClass('active')
    customerBtn.removeClass('active')
    orderBtn.addClass('active')
    inventoryBtn.removeClass('active')
    supplierBtn.removeClass('active')
    employeeBtn.removeClass('active')
    userBtn.removeClass('active')
    saleBtn.removeClass('active')

    $('#dashboard').addClass('d-none')
    $('#employee').addClass('d-none')
    $('#supplier').addClass('d-none')
    $('#inventory').addClass('d-none')
    $('#customer').addClass('d-none')
    $('#customerOrder').removeClass('d-none')
    $('#users').addClass('d-none')
    $('#sales').addClass('d-none')

});
inventoryBtn.click(function () {

    dashboardBtn.removeClass('active')
    customerBtn.removeClass('active')
    supplierBtn.removeClass('active')
    employeeBtn.removeClass('active')
    userBtn.removeClass('active')
    inventoryBtn.addClass('active')
    orderBtn.removeClass('active')
    saleBtn.removeClass('active')

    $('#dashboard').addClass('d-none')
    $('#employee').addClass('d-none')
    $('#supplier').addClass('d-none')
    $('#inventory').removeClass('d-none')
    $('#customer').addClass('d-none')
    $('#customerOrder').addClass('d-none')
    $('#users').addClass('d-none')
    $('#sales').addClass('d-none')
})

employeeBtn.click(function () {

    dashboardBtn.removeClass('active')
    customerBtn.removeClass('active')
    supplierBtn.removeClass('active')
    userBtn.removeClass('active')
    inventoryBtn.removeClass('active')
    employeeBtn.addClass('active')
    orderBtn.removeClass('active')
    saleBtn.removeClass('active')

    $('#dashboard').addClass('d-none')
    $('#employee').removeClass('d-none')
    $('#supplier').addClass('d-none')
    $('#inventory').addClass('d-none')
    $('#customer').addClass('d-none')
    $('#customerOrder').addClass('d-none')
    $('#users').addClass('d-none')
    $('#sales').addClass('d-none')

})

supplierBtn.click(function () {
    dashboardBtn.removeClass('active')
    customerBtn.removeClass('active')
    inventoryBtn.removeClass('active')
    userBtn.removeClass('active')
    employeeBtn.removeClass('active')
    supplierBtn.addClass('active')
    orderBtn.removeClass('active')
    saleBtn.removeClass('active')

    $('#dashboard').addClass('d-none')
    $('#employee').addClass('d-none')
    $('#supplier').removeClass('d-none')
    $('#inventory').addClass('d-none')
    $('#customer').addClass('d-none')
    $('#customerOrder').addClass('d-none')
    $('#users').addClass('d-none')
    $('#sales').addClass('d-none')
})

userBtn.click(function () {

    dashboardBtn.removeClass('active')
    customerBtn.removeClass('active')
    supplierBtn.removeClass('active')
    inventoryBtn.removeClass('active')
    userBtn.addClass('active')
    orderBtn.removeClass('active')
    saleBtn.removeClass('active')

    $('#dashboard').addClass('d-none')
    $('#employee').addClass('d-none')
    $('#supplier').addClass('d-none')
    $('#inventory').addClass('d-none')
    $('#customer').addClass('d-none')
    $('#customerOrder').addClass('d-none')
    $('#users').removeClass('d-none')
    $('#sales').addClass('d-none')

})

saleBtn.click(function () {

    dashboardBtn.removeClass('active')
    customerBtn.removeClass('active')
    supplierBtn.removeClass('active')
    inventoryBtn.removeClass('active')
    userBtn.removeClass('active')
    orderBtn.removeClass('active')
    saleBtn.addClass('active')

    $('#dashboard').addClass('d-none')
    $('#employee').addClass('d-none')
    $('#supplier').addClass('d-none')
    $('#inventory').addClass('d-none')
    $('#customer').addClass('d-none')
    $('#customerOrder').addClass('d-none')
    $('#users').addClass('d-none')
    $('#sales').removeClass('d-none')

})
function isTokenExpired(token) {
    const jwtPayload = JSON.parse(atob(token.split('.')[1]));
    const expiryTime = jwtPayload.exp * 1000;
    return Date.now() >= expiryTime;
}

function performAuthenticatedRequest() {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken || isTokenExpired(accessToken)) {
        $.ajax({
            url: "http://localhost:8080/api/v1/auth/signin",
            method: "POST",
            data: JSON.stringify({
                email: localStorage.getItem('email'),
                password: localStorage.getItem('password'),
            }),
            contentType: "application/json",
            success: function (res, textStatus, jsXH) {
                localStorage.setItem('accessToken', res.token);
                console.log("sign in Successfully " + res.token);
            },
            error: function (ob, textStatus, error) {
                console.log("token renew sign in error " + accessToken);
            }
        });
    } else {

    }
}






