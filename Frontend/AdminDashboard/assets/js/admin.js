const dashboardBtn = $('#dashboardBtn');
const employeeBtn = $('#employeeBtn');
const supplierBtn = $('#supplierBtn');
const inventoryBtn = $('#inventoryBtn');
const customerBtn = $('#customerBtn');
const userBtn = $('#userBtn');
const orderBtn = $('#orderBtn');
const saleBtn = $('#saleBtn');
    home = $('.home');



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
    employeeBtn.removeClass('active')
    supplierBtn.removeClass('active')
    userBtn.removeClass('active')
    inventoryBtn.removeClass('active')
    customerBtn.removeClass('active')
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

employeeBtn.click(function () {

    dashboardBtn.removeClass('active')
    employeeBtn.addClass('active')
    supplierBtn.removeClass('active')
    userBtn.removeClass('active')
    inventoryBtn.removeClass('active')
    customerBtn.removeClass('active')
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
    employeeBtn.removeClass('active')
    supplierBtn.addClass('active')
    userBtn.removeClass('active')
    customerBtn.removeClass('active')
    inventoryBtn.removeClass('active')
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
inventoryBtn.click(function () {

    dashboardBtn.removeClass('active')
    employeeBtn.removeClass('active')
    supplierBtn.removeClass('active')
    userBtn.removeClass('active')
    customerBtn.removeClass('active')
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

userBtn.click(function () {

    dashboardBtn.removeClass('active')
    employeeBtn.removeClass('active')
    supplierBtn.removeClass('active')
    inventoryBtn.removeClass('active')
    customerBtn.removeClass('active')
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
    orderBtn.addClass('active')
    customerBtn.removeClass('active')
    supplierBtn.removeClass('active')
    employeeBtn.removeClass('active')
    userBtn.removeClass('active')
    inventoryBtn.removeClass('active')
    saleBtn.removeClass('active')

    $('#dashboard').addClass('d-none')
    $('#employee').addClass('d-none')
    $('#supplier').addClass('d-none')
    $('#inventory').addClass('d-none')
    $('#customer').addClass('d-none')
    $('#customerOrder').removeClass('d-none')
    $('#users').addClass('d-none')
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











