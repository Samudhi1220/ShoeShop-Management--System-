const dashboardBtn = $('#dashboardBtn');
const customerBtn = $('#customerBtn');
const orderBtn = $('#orderBtn');
const inventoryBtn = $('#inventoryBtn');
const employeeBtn = $('#employeeBtn');
const supplierBtn = $('#supplierBtn');
const userBtn = $('#userBtn');


dashboardBtn.click(function () {

    dashboardBtn.addClass('active')
    customerBtn.removeClass('active')
    supplierBtn.removeClass('active')
    userBtn.removeClass('active')
    inventoryBtn.removeClass('active')
    employeeBtn.removeClass('active')
})

customerBtn.click(function () {

    dashboardBtn.removeClass('active')
    customerBtn.addClass('active')
    supplierBtn.removeClass('active')

    employeeBtn.removeClass('active')
    userBtn.removeClass('active')
    inventoryBtn.removeClass('active')
})
orderBtn.click(function () {

    dashboardBtn.removeClass('active')
    customerBtn.removeClass('active')
    orderBtn.addClass('active')
    inventoryBtn.removeClass('active')
    supplierBtn.removeClass('active')
    employeeBtn.removeClass('active')

});
inventoryBtn.click(function () {

    dashboardBtn.removeClass('active')
    customerBtn.removeClass('active')
    supplierBtn.removeClass('active')
    employeeBtn.removeClass('active')
    userBtn.removeClass('active')
    inventoryBtn.addClass('active')
})

employeeBtn.click(function () {

    dashboardBtn.removeClass('active')
    customerBtn.removeClass('active')
    supplierBtn.removeClass('active')
    userBtn.removeClass('active')
    inventoryBtn.removeClass('active')
    employeeBtn.addClass('active')
})

supplierBtn.click(function () {
    dashboardBtn.removeClass('active')
    customerBtn.removeClass('active')
    inventoryBtn.removeClass('active')
    userBtn.removeClass('active')
    employeeBtn.removeClass('active')
    supplierBtn.addClass('active')
})

userBtn.click(function () {

    dashboardBtn.removeClass('active')
    customerBtn.removeClass('active')
    supplierBtn.removeClass('active')
    inventoryBtn.removeClass('active')
    userBtn.addClass('active')

})








