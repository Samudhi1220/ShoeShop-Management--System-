 const addSupplier = $('#addSupplier'),
    updateSupplier = $('#updateSupplier'),
    deleteSupplier = $('#deleteSupplier'),
    showSupplierDetails = $('#showSupplierDetails')


 addSupplier.click(function () {
     $('#supplierLabel').text('Add Supplier')
     home.addClass('show')
     $('#saveSupplierbtn').text("Save")
     enableTxtField()

 });

 deleteSupplier.click(function () {
     Swal.fire({
         title: "Are you sure?",
         text: "You won't be able to revert this!",
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#3085d6",
         cancelButtonColor: "#d33",
         confirmButtonText: "Yes, delete it!"
     }).then((result) => {
         if (result.isConfirmed) {
             Swal.fire({
                 title: "Deleted!",
                 text: "Your file has been deleted.",
                 icon: "success"
             });
         }
     });
     // $('#supplierLabel').text('Delete Supplier')
     // $('#saveSupplierbtn').text("Delete")
     //
     // home.addClass('show')
 });
 showSupplierDetails.click(function () {
     $('#supplierLabel').text('All Supplier Details')
     $('#saveSupplierbtn').text("Close")
     $('#saveSupplierbtn').click(function () {
         home.removeClass('show');
     })

     home.addClass('show')
     disableTxtField()

 });


 function getAllSuppliers() {
     $.ajax({
         url: "http://localhost:8080/api/v1/supplier",
         method: "GET",
         success: function (resp) {
             console.log("Success: ", resp);
             $('#tblSupplier tbody').empty()
             for (const supplier of resp.data) {
                 const row = `<tr>
                           
                                <td>${supplier.supplierCode}</td>
                                <td>${supplier.supplierName}</td>
                                <td>${supplier.category}</td>
                                <td>${supplier.mobileNo}</td>
                                <td>${supplier.email}</td>
                                <td>          <img src="assets/images/action-btn.png" id="updateSupplier" height="35" width="35"/>
                                         <img src="assets/images/action-delete-btn.png" id="deleteSupplier"  height="35" width="35"/>
                                         <img src="assets/images/action-btn (1) (1).png" id="showSupplierDetails" height="35" width="35"/>
                            </td>
                            </tr>`;
                 $('#tblSupplier').append(row);
             }
         },
         error: function (error) {
             console.log("error: ", error);
         }
     })
 }




 function setSupplierDataToTextField(response) {
     $('#supplierCode').val(response.supplierCode);
     $('#supplierName').val(response.supplierName);
     $('#supplierCategory').val(response.category);
     $('#supplierPostalCode').val(response.address.postalCode);
     $('#supplierState').val(response.address.state);
     $('#supplierCity').val(response.address.city);
     $('#supplierLane').val(response.address.lane);
     $('#supplierBuilding').val(response.address.buildNo);
     $('#supplierCountry').val(response.address.supCountry);
     $('#supplierEmail').val(response.email);
     $('#supplierContactNumber01').val(response.mobileNo);
     $('#supplierContactNumber02').val(response.landNo);
 }

 function clickTblRow() {

     $('#tblEmployee').on('click', 'tr', function (event) {


     });
     $('#tblEmployee').on('click', '#updateEmployee', function (event) {

         $('#mainLabel').text('Update Employee')
         home.addClass('show')
         $('#addbtn').text("Update")
         enableTxtField();
         var row = $(this).closest('tr');
         var id = row.find('td:eq(0)').text()
         $.ajax({
             url: "http://localhost:8080/api/v1/employees/" + id,
             type: "GET",
             dataType: "json",
             success: function (response) {

                 console.log(response);
                 setDataToTextField(response)

             },
             error: function (xhr, status, error) {
                 console.error('Failed to fetch image:', error);
             }
         });
         console.log(id)
     });
     $('#tblEmployee').on('click', '#showDetails', function (event) {

         $('#mainLabel').text('Employee Details')
         home.addClass('show')
         $('#addbtn').text("Details")
         $("#employeeGender").prop('disabled', true);
         $("#employeeDOB").prop('disabled', true);
         $("#employeeDOJ").prop('disabled', true);
         $("#employeeRole").prop('disabled', true);

         disableTxtField();
         var row = $(this).closest('tr');
         var id = row.find('td:eq(0)').text()
         $.ajax({
             url: "http://localhost:8080/api/v1/employees/" + id,
             type: "GET",
             dataType: "json",
             success: function (response) {

                 console.log(response);
                 setDataToTextField(response)
                 getAllEmployeeData();

             },
             error: function (xhr, status, error) {
                 console.error('Failed to fetch image:', error);
             }
         });
         console.log(id)
     });

     $('#tblEmployee').on('click', '#deleteEmployee', function (event) {


         var row = $(this).closest('tr');
         var id = row.find('td:eq(0)').text()
         deleteEmployeeBtn(id)
         console.log(id)
     });


 }

 function updateEmployeeBtn() {
     $('#addbtn').click(function () {
         if ($(this).text().trim() === 'Update') {
             var role;
             var gender;
             if ('none' !== $('#employeeRole').val()) {
                 role = $('#employeeRole').val().toUpperCase();
             }
             if ('Select Gender' !== $('#employeeGender').val()) {
                 gender = $('#employeeGender').val().toUpperCase();
             }


             const postData = {
                 employeeId: $('#employeeCode').val(),
                 gender: gender,
                 employeeName: $('#employeeName').val(),
                 employeeStatus: $('#employeeStatus').val(),
                 branch: $('#employeeBranch').val(),
                 designation: $('#employeeDesignation').val(),
                 proPic: base64String,
                 joinDate: $('#employeeDOJ').val(),
                 employeeDob: $('#employeeDOB').val(),
                 role: role,
                 address: {
                     buildNo: $('#employeeBuilding').val(),
                     city: $('#employeeCity').val(),
                     lane: $('#employeeLane').val(),
                     state: $('#employeeState').val(),
                     postalCode: $('#employeePostalCode').val()
                 },
                 email: $('#employeeEmail').val(),
                 guardianName: $('#employeeGuardian').val(),
                 contactNo: $('#employeeContactNumber').val(),
                 emergencyContact: $('#employeeGuardianContact').val(),
             };
             console.log(base64String);

             $.ajax({
                 url: "http://localhost:8080/api/v1/employees",
                 method: "PATCH",
                 data: JSON.stringify(postData),
                 contentType: "application/json",
                 success: function (resp) {
                     if (resp.state == 200) {
                         getAllEmployeeData()
                         console.log(resp);
                         Swal.fire({
                             position: "top-end",
                             icon: "success",
                             title: "Employee has been Updated",
                             showConfirmButton: false,
                             timer: 1500
                         });


                         $('#tblEmployee tr').each(function () {


                             // Update data of checked row
                             var row = $(this);

                             // Example: Update first name to 'New First Name' and last name to 'New Last Name'
                             row.find('td:eq(0)').text($('#employeeCode').val());
                             row.find('td:eq(1)').text($('#employeeName').val());
                             row.find('td:eq(2)').text($('#employeeBuilding').val() + " " +
                                 $('#employeeLane').val() + " " + $('#employeeState').val() + " " + $('#employeeCity').val()
                                 + " " + $('#employeePostalCode').val());
                             row.find('td:eq(3)').text($('#employeeContactNumber').val());
                             row.find('td:eq(4)').text($('#employeeDOJ').val());
                             row.find('td:eq(5)').text($('#employeeBranch').val());

                         });
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

         }
     });
 }

 function deleteEmployeeBtn(id) {
     $('#deleteEmployee').click(function () {
         Swal.fire({

         }).then((result) => {
             if (result.isConfirmed) {
                 Swal.fire({
                     title: "Deleted!",
                     text: "Your file has been deleted.",
                     icon: "success"
                 });
             }
         })
         $.ajax({
             url: "http://localhost:8080/api/v1/employees/" + id,
             type: "DELETE",
             success: function (response) {

                 Swal.fire({
                     title: "Are you sure?",
                     text: "You won't be able to revert this!",
                     icon: "warning",
                     showCancelButton: true,
                     confirmButtonColor: "#3085d6",
                     cancelButtonColor: "#d33",
                     confirmButtonText: "Yes, delete it!",
                     position: "top-end",
                     icon: "success",
                     title: "Employee has been Deleted",
                     showConfirmButton: false,
                     timer: 1500
                 });
                 getAllEmployeeData();
             },
             error: function (resp) {
                 Swal.fire({
                     icon: "error",
                     title: "Oops...",
                     text: resp.responseJSON.message,
                     footer: '<a href="#"></a>'
                 });
             }
         });
     })
 }
 function disableTxtField() {
     $('.txt').attr('readonly', "");

 }

 function enableTxtField() {
     $('.txt').removeAttr('readonly');
 }


 function saveSupplier() {
     $('#supplierPopupAddBtn').click(function () {
         if ($(this).text().trim() === 'Save') {
             const postData = {
                 supplierCode: $('#supplierCode').val(),
                 supplierName: $('#supplierName').val(),
                 email: $('#supplierEmail').val(),
                 category: $('#supplierCategory').val(),
                 address: {
                     buildNo: $('#supplierBuilding').val(),
                     lane: $('#supplierLane').val(),
                     city: $('#supplierCity').val(),
                     state: $('#supplierState').val(),
                     postalCode: $('#supplierPostalCode').val(),
                     supCountry: $('#supplierCountry').val(),
                 },
                 mobileNo: $('#supplierContactNumber01').val(),
                 landNo: $('#supplierContactNumber02').val(),
             }

             $.ajax({
                 url: "http://localhost:8080/api/v1/supplier",
                 method: "POST",
                 data: JSON.stringify(postData),
                 contentType: "application/json",
                 success: function (resp) {
                     if (resp.state == 200) {
                         console.log(resp);
                         Swal.fire({
                             position: "top-end",
                             icon: "success",
                             title: "Supplier has been saved",
                             showConfirmButton: false,
                             timer: 1500
                         });
                         getAllSuppliers();                        // $('#supplierFormContainer').modal('hide');
                         console.log("resp");
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
         }

     })
 }
 form_close.click(function () {
     home.removeClass('show');
     form_container.css('max-width', '800px')

 })
 cancelBtn.click(function () {
     home.removeClass('show');
     form_container.css('max-width', '800px')

 })
 // $(document).ready(function(){
 //     $("#employeeDOJ").datepicker({
 //         dateFormat: 'yy-mm-dd',
 //         maxDate: new Date()
 //     });
 //     $("#employeeDOB").datepicker({
 //         dateFormat: 'yy-mm-dd',
 //         maxDate: new Date()
 //     });
 // });
 imgUploader.change(function () {
     var file = $(this)[0].files[0];
     if (file) {
         // $('#fileValue').text('Selected file: ' + file.name);
         console.log(file.name)
     } else {
         // $('#fileValue').text('No file selected');
     }
 });

 function generateNewSupplierId() {
     fetch("http://localhost:8080/api/v1/supplier/id")
         .then(response => {
             if (!response.ok) {
                 throw new Error('Network response was not ok');
             }
             return response.json(); // Read response as text
         })
         .then(data => {
             console.log(data);
             $('#supplierCode').val(data.data); // Assuming data is a string
         })
         .catch(error => {
             console.error('Error:', error);
         });
 }


 addEmployee.click(function () {
     $('#mainLabel').text('Add Employee')
     home.addClass('show')
     $('#addbtn').text("Save")
     enableTxtField();
     generateNewId();


 })

 showDetails.click(function () {
     $('#mainLabel').text('All Employee Details')
     $('#addbtn').text("Close")
     $('#addbtn').click(function () {
         home.removeClass('show');
     })

     home.addClass('show')
     disableTxtField()
     $("#employeeGender").prop('disabled', true);
     $("#employeeDOB").prop('disabled', true);
     $("#employeeDOJ").prop('disabled', true);
     $("#employeeRole").prop('disabled', true);

 });

