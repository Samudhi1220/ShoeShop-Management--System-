const dashboardBtn = $('#dashboardBtn');
const employeeBtn = $('#employeeBtn');
const supplierBtn = $('#supplierBtn');
const inventoryBtn = $('#inventoryBtn');
const userBtn = $('#userBtn');
const addEmployee = $('#addEmployee');
    updateEmployee = $('#updateEmployee'),
    deleteEmployee = $('#deleteEmployee'),
    showDetails = $('#showDetails'),
    form_close = $('.from_close'),
        cancelBtn = $('#cancelBtn'),
        home = $('.home');

dashboardBtn.click(function () {
    // $('#dashboard').css("display", "block");
    // $('#employee').css("display", "none");
    // $('#supplier').css("display", "none");
    // $('#inventory').css("display", "none");
    // $('#users').css("display", "none");
    dashboardBtn.addClass('active')
    employeeBtn.removeClass('active')
    supplierBtn.removeClass('active')
    userBtn.removeClass('active')
    inventoryBtn.removeClass('active')
})

employeeBtn.click(function () {
    // $('#employee').css("display", "block");
    // $('#dashboard').css("display", "none");
    // $('#supplier').css("display", "none");
    // $('#inventory').css("display", "none");
    // $('#users').css("display", "none");
    dashboardBtn.removeClass('active')
    employeeBtn.addClass('active')
    supplierBtn.removeClass('active')
    userBtn.removeClass('active')
    inventoryBtn.removeClass('active')
})
supplierBtn.click(function () {
    // $('#employee').css("display", "none");
    // $('#dashboard').css("display", "none");
    // $('#supplier').css("display", "block");
    // $('#inventory').css("display", "none");
    // $('#users').css("display", "none");
    dashboardBtn.removeClass('active')
    employeeBtn.removeClass('active')
    supplierBtn.addClass('active')
    userBtn.removeClass('active')
    inventoryBtn.removeClass('active')

})
inventoryBtn.click(function () {
    // $('#employee').css("display", "none");
    // $('#dashboard').css("display", "none");
    // $('#supplier').css("display", "none");
    // $('#inventory').css("display", "block");
    // $('#users').css("display", "none");
    dashboardBtn.removeClass('active')
    employeeBtn.removeClass('active')
    supplierBtn.removeClass('active')
    userBtn.removeClass('active')
    inventoryBtn.addClass('active')
})

userBtn.click(function () {
    // $('#employee').css("display", "none");
    // $('#dashboard').css("display", "none");
    // $('#supplier').css("display", "none");
    // $('#inventory').css("display", "none");
    // $('#users').css("display", "block");
    dashboardBtn.removeClass('active')
    employeeBtn.removeClass('active')
    supplierBtn.removeClass('active')
    inventoryBtn.removeClass('active')
    userBtn.addClass('active')

})
addEmployee.click(function () {
    home.addClass('show')
    console.log('helloooo')

})
form_close.click(function () {
    home.addClass('show')

})
addEmployee.click(function () {
    $('#mainLabel').text('Add Employee')
    home.addClass('show')
    $('#addbtn').text("Save")

})
updateEmployee.click(function () {
    $('#mainLabel').text('Update Employee')
    home.addClass('show')
    $('#addbtn').text("Update")

})
deleteEmployee.click(function () {
    $('#mainLabel').text('Delete Employee')
    $('#addbtn').text("Delete")

    home.addClass('show')
})
showDetails.click(function () {
    $('#mainLabel').text('All Employee Details')
    $('#addbtn').text("Close")
    $('#addbtn').click(function () {
        home.removeClass('show');
    })

    home.addClass('show')

})

form_close.click(function () {
    home.removeClass('show');
    form_container.css('max-width','800px')

})
cancelBtn.click(function () {
    home.removeClass('show');
    form_container.css('max-width','800px')

})
$(document).ready(function(){
    $("#employeeDOJ").datepicker({
        dateFormat: 'yy-mm-dd',
        maxDate: new Date()
    });
    $("#employeeDOB").datepicker({
        dateFormat: 'yy-mm-dd',
        maxDate: new Date()
    });
});

