package lk.ijse.spring.shoeShop.service.impl;



import lk.ijse.spring.shoeShop.auth.reponse.JwtAuthResponse;
import lk.ijse.spring.shoeShop.auth.request.SignInRequest;
import lk.ijse.spring.shoeShop.auth.request.SignUpRequest;
import lk.ijse.spring.shoeShop.dto.UserDTO;
import lk.ijse.spring.shoeShop.embedded.Role;
import lk.ijse.spring.shoeShop.entity.Employee;
import lk.ijse.spring.shoeShop.entity.User;
import lk.ijse.spring.shoeShop.repository.EmployeeRepository;
import lk.ijse.spring.shoeShop.repository.UserRepository;
import lk.ijse.spring.shoeShop.service.AuthenticationService;
import lk.ijse.spring.shoeShop.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;


@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepo;
    private final ModelMapper mapper;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    private  final EmployeeRepository employeeRepository;


    @Override
    public JwtAuthResponse signIn(SignInRequest signInRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signInRequest.getEmail(), signInRequest.getPassword()));
        User user = userRepo.findByEmail(signInRequest.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("user not found"));
        String generatedToken = jwtService.generateToken(user);
        return JwtAuthResponse.builder().token(generatedToken).build();
    }

    @Override
    public JwtAuthResponse signUp(SignUpRequest signUpRequest) {
        UserDTO userDTO = UserDTO.builder()
                .email(signUpRequest.getEmail())
                .password(passwordEncoder.encode(signUpRequest.getPassword()))
                .role(Role.valueOf(signUpRequest.getRole()))
                .build();
        User savedUser = userRepo.save(mapper.map(userDTO, User.class));
        employeeRepository.save(mapper.map(signUpRequest.getEmployeeDTO(), Employee.class));
        String generatedToken = jwtService.generateToken(savedUser);
        return JwtAuthResponse.builder().token(generatedToken).build();
    }
}
