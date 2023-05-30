package com.chelete.demo.devis;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/chelete/devis")
public class devisController {

    
    @Autowired
    private devisRepository repository;

    //GET ALL DEVIS
    @GetMapping("/devis")
    public List<devis> getAll(){
     return repository.findAllSortedByIdDesc();
    
    }



    //GET DEVIS BY ID
    @GetMapping("devis/{id}")
    public ResponseEntity<devis> GetById(@PathVariable Long id){
      devis devis =repository.findById(id).orElseThrow(()-> new RessourceNotFoundException("Product Not found!"));
      return ResponseEntity.ok(devis);
    }


    //ADD DEVIS
    @PostMapping("/devis")
      public ResponseEntity<devis> addDevis(@RequestBody devis D){
        devis addedDevis = repository.save(D);
         return new ResponseEntity<>(addedDevis, HttpStatus.CREATED);
      }
    

    //UPDATE DEVIS
    @PutMapping("/devis/{id}")
    public ResponseEntity<devis> Update(@PathVariable Long id , @RequestBody devis NewDevis){
      devis devis =repository.findById(id).orElseThrow(()-> new RessourceNotFoundException("Facture Not found!"));
      devis.setDate_devis(NewDevis.getDate_devis());
      devis.setMontant(NewDevis.getMontant());
      devis.setMontant_lettre(NewDevis.getMontant_lettre());
      devis.setRemarque(NewDevis.getRemarque());
      devis.setNumero_devis(NewDevis.getNumero_devis());

      devis updatedDevis =repository.save(devis);
      return ResponseEntity.ok(updatedDevis);
    }

    
}
