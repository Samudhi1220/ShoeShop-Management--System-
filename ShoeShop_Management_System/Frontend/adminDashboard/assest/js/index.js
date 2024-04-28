const dashboardBtn = $('#dashboard-btn');
const employeeBtn = $('#employee-btn');
const supplierBtn = $('#supplier-btn');
const inventoryBtn = $('#inventory-btn');
const userBtn = $('#users-btn');


const sideLinks = document.querySelectorAll('.sidebar .side-menu li a:not(.logout)');

sideLinks.forEach(item => {
    const li = item.parentElement;
    item.addEventListener('click', () => {
        sideLinks.forEach(i => {
            i.parentElement.classList.remove('active');
        })
        li.classList.add('active');
    })
});

const menuBar = document.querySelector('.content nav .bx.bx-menu');
const sideBar = document.querySelector('.sidebar');

menuBar.addEventListener('click', () => {
    sideBar.classList.toggle('close');
});

const searchBtn = document.querySelector('.content nav form .form-input button');
const searchBtnIcon = document.querySelector('.content nav form .form-input button .bx');
const searchForm = document.querySelector('.content nav form');

searchBtn.addEventListener('click', function (e) {
    if (window.innerWidth < 576) {
        e.preventDefault;
        searchForm.classList.toggle('show');
        if (searchForm.classList.contains('show')) {
            searchBtnIcon.classList.replace('bx-search', 'bx-x');
        } else {
            searchBtnIcon.classList.replace('bx-x', 'bx-search');
        }
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
        sideBar.classList.add('close');
    } else {
        sideBar.classList.remove('close');
    }
    if (window.innerWidth > 576) {
        searchBtnIcon.classList.replace('bx-x', 'bx-search');
        searchForm.classList.remove('show');
    }
});

const toggler = document.getElementById('theme-toggle');

toggler.addEventListener('change', function () {
    if (this.checked) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
});

dashboardBtn.click(function () {
    $('#dashboard').css("display","block");
    $('#employee').css("display","none");
    $('#supplier').css("display","none");
    $('#inventory').css("display","none");
    $('#user').css("display","none");

    dashboardBtn.addClass('active')
    employeeBtn.removeClass('active')
    supplierBtn.removeClass('active')
    inventoryBtn.removeClass('active')
    userBtn.removeClass('active')
})

employeeBtn.click(function () {
    $('#employee').css("display","block");
    $('#dashboard').css("display","none");
    $('#supplier').css("display","none");
    $('#inventory').css("display","none");
    $('#user').css("display","none");

    employeeBtn.addClass('active')
    dashboardBtn.removeClass('active')
    supplierBtn.removeClass('active')
    inventoryBtn.removeClass('active')
    userBtn.removeClass('active')
})

supplierBtn.click(function () {
    $('#supplier').css("display","block");
    $('#employee').css("display","none");
    $('#dashboard').css("display","none");
    $('#inventory').css("display","none");
    $('#user').css("display","none");

    supplierBtn.addClass('active')
    dashboardBtn.removeClass('active')
    employeeBtn.removeClass('active')
    inventoryBtn.removeClass('active')
    userBtn.removeClass('active')
})

inventoryBtn.click(function () {
    $('#inventory').css("display","block");
    $('#dashboard').css("display","none");
    $('#supplier').css("display","none");
    $('#employee').css("display","none");
    $('#user').css("display","none");

    inventoryBtn.addClass('active')
    dashboardBtn.removeClass('active')
    supplierBtn.removeClass('active')
    employeeBtn.removeClass('active')
    userBtn.removeClass('active')
})

userBtn.click(function () {
    $('#user').css("display","block");
    $('#dashboard').css("display","none");
    $('#supplier').css("display","none");
    $('#inventory').css("display","none");
    $('#employee').css("display","none");

    userBtn.addClass('active')
    dashboardBtn.removeClass('active')
    supplierBtn.removeClass('active')
    inventoryBtn.removeClass('active')
    employeeBtn.removeClass('active')
})