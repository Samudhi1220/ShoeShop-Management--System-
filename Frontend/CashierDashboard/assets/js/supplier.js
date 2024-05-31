 const form_closeSupplier = $('.from_close'),
     cancelSupplierBtn = $('.cancelBtn');




 getAllSuppliers()
 clickTblRow();
 searchSupplier();

 function getAllSuppliers() {
     performAuthenticatedRequest();
     const accessToken = localStorage.getItem('accessToken');
     $.ajax({
         url: "http://localhost:8080/api/v1/supplier",
         method: "GET",
         headers: {
             'Authorization': 'Bearer ' + accessToken
         },
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
         disableTxtField();
         var row = $(this).closest('tr');
         var id = row.find('td:eq(0)').text()
         performAuthenticatedRequest();
         const accessToken = localStorage.getItem('accessToken');
         $.ajax({
             url: "http://localhost:8080/api/v1/supplier/" + id,
             type: "GET",
             headers: {
                 'Authorization': 'Bearer ' + accessToken
             },
             dataType: "json",
             success: function (response) {

                 console.log(response);
                 setSupplierDataToTextField(response)
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




 form_closeSupplier.click(function () {
     $('.home').removeClass('show');
     $('.form-container').css('max-width', '800px')
 })
 cancelSupplierBtn.click(function () {
     $('.home').removeClass('show');
     $('.form-container').css('max-width', '800px')

 })

 function searchSupplier() {
     $('#searchSuppliers').keyup(function (event) {

         var idOrName = $(this).val();
         performAuthenticatedRequest();
         const accessToken = localStorage.getItem('accessToken');
         $.ajax({
             url: "http://localhost:8080/api/v1/supplier?idOrName=" + idOrName,
             type: "GET",
             headers: {
                 'Authorization': 'Bearer ' + accessToken
             },
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


