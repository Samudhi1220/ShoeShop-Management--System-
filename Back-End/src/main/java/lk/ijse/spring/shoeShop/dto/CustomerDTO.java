package lk.ijse.spring.shoeShop.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lk.ijse.spring.shoeShop.embedded.Address;
import lk.ijse.spring.shoeShop.embedded.Gender;
import lk.ijse.spring.shoeShop.embedded.LoyaltyLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerDTO {
  @NotNull(message = "Customer ID is required")
    @Pattern(regexp = "^C\\d{2}-\\d{2}[1-9]$", message = "ID is not Valid")
    private String customerId;

    @NotNull(message = "Customer Name is required")
    @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Customer is not Valid")
    private String customerName;

    @NotNull(message = "Customer Gender is required")
    private Gender gender;

    @NotNull(message = "loyal Date is required")
    private Date loyaltyDate;
    private LoyaltyLevel level;
    private Integer totalPoints;
    @NotNull(message = "DOB is required")
    private Date customerDob;
    private Address address;

    @NotNull(message = "Mobile Number is required")
    @Pattern(regexp = "^(?:7|0|\\+94)[0-9]{9,10}$", message = "Mobile Number is not Valid")
    private String contactNo;


    @NotNull(message = "Email is required")
    @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Email is not Valid")
    private String email;
    private Timestamp recentPurchase;
}
