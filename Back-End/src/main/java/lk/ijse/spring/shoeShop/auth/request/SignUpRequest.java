package lk.ijse.spring.shoeShop.auth.request;


import lk.ijse.spring.shoeShop.dto.EmployeeDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SignUpRequest {
    private String email;
    private String password;
    private String role;
  //  private EmployeeDTO employeeDTO;
}
