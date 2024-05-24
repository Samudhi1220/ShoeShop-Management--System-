const dashboardBtn = $('#dashboardBtn');
const employeeBtn = $('#employeeBtn');
const supplierBtn = $('#supplierBtn');
const inventoryBtn = $('#inventoryBtn');
const customerBtn = $('#customerBtn');
const userBtn = $('#userBtn'),

home = $('.home');


dashboardBtn.click(function () {

    dashboardBtn.addClass('active')
    employeeBtn.removeClass('active')
    supplierBtn.removeClass('active')
    userBtn.removeClass('active')
    inventoryBtn.removeClass('active')
    customerBtn.removeClass('active')
})

employeeBtn.click(function () {

    dashboardBtn.removeClass('active')
    employeeBtn.addClass('active')
    supplierBtn.removeClass('active')
    userBtn.removeClass('active')
    inventoryBtn.removeClass('active')
    customerBtn.removeClass('active')
})
supplierBtn.click(function () {

    dashboardBtn.removeClass('active')
    employeeBtn.removeClass('active')
    supplierBtn.addClass('active')
    userBtn.removeClass('active')
    customerBtn.removeClass('active')
    inventoryBtn.removeClass('active')

})
inventoryBtn.click(function () {

    dashboardBtn.removeClass('active')
    employeeBtn.removeClass('active')
    supplierBtn.removeClass('active')
    userBtn.removeClass('active')
    customerBtn.removeClass('active')
    inventoryBtn.addClass('active')
})

userBtn.click(function () {

    dashboardBtn.removeClass('active')
    employeeBtn.removeClass('active')
    supplierBtn.removeClass('active')
    inventoryBtn.removeClass('active')
    customerBtn.removeClass('active')
    userBtn.addClass('active')

})


customerBtn.click(function () {

    dashboardBtn.removeClass('active')
    customerBtn.addClass('active')
    supplierBtn.removeClass('active')
    employeeBtn.removeClass('active')
    userBtn.removeClass('active')
    inventoryBtn.removeClass('active')
})











