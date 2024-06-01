package lk.ijse.spring.shoeShop.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lk.ijse.spring.shoeShop.embedded.Category;
import lk.ijse.spring.shoeShop.embedded.InAddress;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SupplierDTO {

    @NotNull(message = "Supplier ID is required")
    @Pattern(regexp = "^[A-Z]{3}\\d{4}[1-9]$", message = "ID is not Valid")
    private String supplierCode;

    @NotNull(message = "Supplier Name is required")
    @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Supplier is not Valid")
    private String supplierName;

    private Category category;
    private InAddress address;


    @NotNull(message = "Mobile Number is required")
    @Pattern(regexp = "^(?:7|0|\\+94)[0-9]{9,10}$", message = "Mobile Number is not Valid")
    private String mobileNo;

    private String landNo;

    @NotNull(message = "Email is required")
    @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Email is not Valid")
    private String email;

}
