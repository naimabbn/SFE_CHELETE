package com.chelete.demo.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/chelete/admin")
public class adminController {
    
    @Autowired
    private adminRepository repository;

    //GET ALL ADMINS
    @GetMapping("/admins")
    public List<admin> getAllAdmins(){
        return repository.findAll();
    }


    

    //GET ADMIN BY ID
    @GetMapping("/admins/{id}")
    public ResponseEntity<admin> GetAdminById(@PathVariable Long id){
      admin admin =repository.findById(id).orElseThrow(()-> new RessourceNotFoundException("Product Not found!"));
      return ResponseEntity.ok(admin );
    }


    //UPDATE ADMIN
    @PutMapping("/admins/{id}")
    public ResponseEntity<admin> UpdateAdmin(@PathVariable Long id , @RequestBody admin NewAdmin){
      admin admin =repository.findById(id).orElseThrow(()-> new RessourceNotFoundException("Product Not found!"));
      admin.setLogin(NewAdmin.getLogin());
      admin.setPassword(NewAdmin.getPassword());
      admin apdatedAdmin =repository.save(admin);
      return ResponseEntity.ok(apdatedAdmin);
    }


    
}
