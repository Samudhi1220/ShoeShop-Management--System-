package lk.ijse.spring.shoeShop.service.impl.shoeshop.dto;

import lk.ijse.spring.shoeshop.embedded.Role;
import lk.ijse.spring.shoeshop.entity.Employee;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    private String email;
    private String password;
    private Role role;
    private Employee employee;
    private boolean activeStatus;
}
