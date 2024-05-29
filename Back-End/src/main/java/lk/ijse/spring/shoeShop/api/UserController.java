package lk.ijse.spring.shoeShop.api;

import lk.ijse.spring.shoeShop.auth.reponse.JwtAuthResponse;
import lk.ijse.spring.shoeShop.auth.request.SignInRequest;
import lk.ijse.spring.shoeShop.auth.request.SignUpRequest;
import lk.ijse.spring.shoeShop.service.AuthenticationService;
import lk.ijse.spring.shoeShop.service.EmployeeService;
import lk.ijse.spring.shoeShop.service.impl.AuthenticationServiceImpl;
import lk.ijse.spring.shoeShop.util.GenerateNewId;
import lk.ijse.spring.shoeShop.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/auth")
@CrossOrigin
@RequiredArgsConstructor
public class UserController {


    private final AuthenticationService authenticationService;

    private final EmployeeService employeeService;

    @PostMapping("/signin")
    public ResponseEntity<JwtAuthResponse> signIn(
            @RequestBody SignInRequest signInRequest){
        return ResponseEntity.ok(
                authenticationService.signIn(signInRequest));
    }
    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping("/id")
    public ResponseUtil getNewId() {
        return new ResponseUtil("200", "Successfully Generated New Id", GenerateNewId.nextId(employeeService.lastId(), "E00"));
    }

    @PostMapping("/signup")
    public ResponseEntity<JwtAuthResponse> signUp(
            @RequestBody SignUpRequest signUpRequest){
        System.out.println(signUpRequest);
        return ResponseEntity.ok(
                authenticationService.signUp(signUpRequest));
    }
}
