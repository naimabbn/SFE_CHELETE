package com.chelete.demo.client;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table
public class client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
     private long id_client;

    @Column
    private String nom;

    @Column
    private String addresse;

    @Column
    private long ICE;
    
   

    public client(){}
    public client(String nom, String addresse, long iCE ) {
        this.nom = nom;
        this.addresse = addresse;
        ICE = iCE;
    }


    public Long getId_client() {
        return id_client;
    }


    public void setId_client(Long id_client) {
        this.id_client = id_client;
    }


    public String getNom() {
        return nom;
    }


    public void setNom(String nom) {
        this.nom = nom;
    }


    public String getAddresse() {
        return addresse;
    }


    public void setAddresse(String addresse) {
        this.addresse = addresse;
    }


    public Long getICE() {
        return ICE;
    }


    public void setICE(Long iCE) {
        ICE = iCE;
    }


   


}
