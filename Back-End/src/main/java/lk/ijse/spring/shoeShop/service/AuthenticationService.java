package lk.ijse.spring.shoeShop.service;


import lk.ijse.spring.shoeShop.auth.reponse.JwtAuthResponse;
import lk.ijse.spring.shoeShop.auth.request.SignInRequest;
import lk.ijse.spring.shoeShop.auth.request.SignUpRequest;

public interface AuthenticationService {
    JwtAuthResponse signIn(SignInRequest signInRequest);
    JwtAuthResponse signUp(SignUpRequest signUpRequest);
}
