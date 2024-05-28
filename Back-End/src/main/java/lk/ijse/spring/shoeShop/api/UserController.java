package lk.ijse.spring.shoeShop.api;

import lk.ijse.spring.shoeShop.auth.reponse.JwtAuthResponse;
import lk.ijse.spring.shoeShop.auth.request.SignInRequest;
import lk.ijse.spring.shoeShop.auth.request.SignUpRequest;
import lk.ijse.spring.shoeShop.service.AuthenticationService;
import lk.ijse.spring.shoeShop.service.impl.AuthenticationServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/auth")
@CrossOrigin
@RequiredArgsConstructor
public class UserController {
    private AuthenticationService authenticationService;
    @PostMapping("/signin")
    public ResponseEntity<JwtAuthResponse> signIn(
            @RequestBody SignInRequest signInRequest){
        return ResponseEntity.ok(
                authenticationService.signIn(signInRequest));
    }

    @PostMapping("/signup")
    public ResponseEntity<JwtAuthResponse> signUp(
            @RequestBody SignUpRequest signUpRequest){
        System.out.println(signUpRequest);
        return ResponseEntity.ok(
                authenticationService.signUp(signUpRequest));
    }
}
