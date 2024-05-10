package lk.ijse.spring.shoeShop.dto;

import lk.ijse.spring.shoeShop.embedded.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomDTO {
    private Role role;
    private String email;
    private String employeeName;
    private String contactNo;
    private String employeeId;
}
