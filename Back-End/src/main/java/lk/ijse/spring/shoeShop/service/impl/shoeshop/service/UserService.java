package lk.ijse.spring.shoeShop.service.impl.shoeshop.service;

import lk.ijse.spring.shoeshop.dto.CustomDTO;
import lk.ijse.spring.shoeshop.dto.UserDTO;

import java.util.List;

public interface UserService {
    List<CustomDTO> findAllByActiveStatus(boolean activeStatus);
    void deleteUser(String id);
    UserDTO getUser(String id);
    List<CustomDTO> searchUsersById(String idOrName, boolean activeStatus);


}
