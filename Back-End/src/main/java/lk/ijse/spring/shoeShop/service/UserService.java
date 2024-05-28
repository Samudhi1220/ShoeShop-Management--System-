package lk.ijse.spring.shoeShop.service;


import lk.ijse.spring.shoeShop.dto.CustomDTO;
import lk.ijse.spring.shoeShop.dto.UserDTO;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService {

    void deleteUser(String id);
    UserDTO getUser(String id);
    List<CustomDTO> searchUsersById(String idOrName, boolean activeStatus);

    UserDetailsService userDetailService();

}
