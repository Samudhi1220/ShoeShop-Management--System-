package lk.ijse.spring.shoeShop.dto;


import lk.ijse.spring.shoeShop.embedded.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {

    private String email;
    private String password;
    private Role role;
  //  private EmployeeDTO employee;

}
