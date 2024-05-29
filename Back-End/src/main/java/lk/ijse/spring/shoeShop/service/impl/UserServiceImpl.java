package lk.ijse.spring.shoeShop.service.impl;

import lk.ijse.spring.shoeShop.dto.CustomDTO;
import lk.ijse.spring.shoeShop.dto.UserDTO;
import lk.ijse.spring.shoeShop.repository.UserRepository;
import lk.ijse.spring.shoeShop.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public UserServiceImpl(UserRepository userRepository, ModelMapper modelMapper) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public void deleteUser(String id) {

    }

    @Override
    public UserDTO getUser(String id) {
        return modelMapper.map(userRepository.findById(id).get(), UserDTO.class);
    }

    @Override
    public List<CustomDTO> searchUsersById(String idOrName, boolean activeStatus) {
        return null;
    }

    @Override
    public UserDetailsService userDetailService() {
        return username -> userRepository.findByEmail(username)
                .orElseThrow(() -> new
                        UsernameNotFoundException(
                        "user not found"));
    }


}
