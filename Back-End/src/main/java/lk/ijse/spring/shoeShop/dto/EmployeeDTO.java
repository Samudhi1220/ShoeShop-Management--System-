package lk.ijse.spring.shoeShop.dto;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lk.ijse.spring.shoeShop.embedded.Address;
import lk.ijse.spring.shoeShop.embedded.Gender;
import lk.ijse.spring.shoeShop.util.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDTO {
    @NotNull(message = "Employee ID is required")
    @Pattern(regexp = "^E\\d{2}-\\d{2}[1-9]$", message = "ID is not Valid")
    private String employeeId;

    @NotNull(message = "Employee Name is required")
    @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Employee is not Valid")
    private String employeeName;

    private String proPic;

    @NotNull(message = "Employee Gender is required")
    private Gender gender;

    @NotNull(message = "status is required")
    @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "status is not Valid")
    private String employeeStatus;

    @NotNull(message = "Branch is required")
    @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Branch is not Valid")
    private String branch;

    @NotNull(message = "Designation is required")
    @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Designation is not Valid")
    private String designation;
    private Role role;

    @NotNull(message = "DOB is required")
    private Date employeeDob;

    @NotNull(message = "join Date is required")
    private Date joinDate;
    private Address address;

    @NotNull(message = "Mobile Number is required")
    @Pattern(regexp = "^(?:7|0|\\+94)[0-9]{9,10}$", message = "Mobile Number is not Valid")
    private String contactNo;

    @NotNull(message = "Email is required")
    @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Email is not Valid")
    private String email;

    @NotNull(message = "Name is required")
    @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Name is not Valid")
    private String guardianName;

    @NotNull(message = "Mobile Number is required")
    @Pattern(regexp = "^(?:7|0|\\+94)[0-9]{9,10}$", message = "Mobile Number is not Valid")
    private String emergencyContact;
}
