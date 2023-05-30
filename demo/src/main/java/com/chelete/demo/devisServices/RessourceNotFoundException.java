package com.chelete.demo.devisServices;

import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;
@ResponseStatus(value= HttpStatus.NOT_FOUND)
public class RessourceNotFoundException extends RuntimeException {
    public RessourceNotFoundException(String message){
        super(message);
    }
}
