 const addSupplier = $('#addSupplier');
 form_closeSupplier = $('.from_close'),
     cancelSupplierBtn = $('.cancelBtn'),




 getAllSuppliers()
 clickTblRow();
 searchSupplier();
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
 addSupplier.click(function () {
     $('#supplierLabel').text('Add Supplier')
     home.addClass('show')
     $('#saveSupplierbtn').text("Save")
     enableTxtField()
    generateNewSupplierId();
     saveSupplier()




 });

 $('#showSupplierDetails').click(function () {
     disableTxtField()
 })


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
                                    <td>      
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

     $('#tblSupplier').on('click', 'tr', function (event) {


     });

     $('#tblSupplier').on('click', '#showSupplierDetails', function (event) {

         $('#supplierLabel').text('Supplier Details')
         home.addClass('show')
         $('#saveSupplierbtn').text("Details")
         var row = $(this).closest('tr');
         var id = row.find('td:eq(0)').text()

         $.ajax({
             url: "http://localhost:8080/api/v1/supplier/" + id,
             type: "GET",
             dataType: "json",
             success: function (response) {

                 console.log(response);
                 setSupplierDataToTextField(response)
                 disableTxtField()
                 getAllSuppliers();

             },
             error: function (xhr, status, error) {
                 console.error('Failed to fetch image:', error);
             }
         });
         console.log(id)
     });




 }












 function disableTxtField() {
     $('.txt').attr('readonly', "");

 }

 function enableTxtField() {
     $('.txt').removeAttr('readonly');
 }


 form_closeSupplier.click(function () {
     home.removeClass('show');
     form_container.css('max-width', '800px')

 })
 cancelSupplierBtn.click(function () {
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






 function searchSupplier() {
     $('#searchSuppliers').keyup(function (event) {

         var idOrName = $(this).val();
         $.ajax({
             url: "http://localhost:8080/api/v1/supplier?idOrName=" + idOrName,
             type: "GET",
             dataType: "json",
             success: function (response) {
                 $('#tblSupplier tbody').empty()
                 for (const supplier of response.data) {
                     const row = `<tr>
                       
                                <td>${supplier.supplierCode}</td>
                                <td>${supplier.supplierName}</td>
                                <td>${supplier.category}</td>
                                <td>${supplier.mobileNo}</td>
                                <td>${supplier.email}</td>
                                
                            </tr>`;
                     $('#tblSupplier').append(row);
                 }
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


