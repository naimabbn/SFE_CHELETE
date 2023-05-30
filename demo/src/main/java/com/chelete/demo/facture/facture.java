package com.chelete.demo.facture;

import java.time.LocalDate;


import com.chelete.demo.client.client;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import jakarta.persistence.Table;

@Entity
@Table
public class facture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
     private long id_facture;


     @Column
    private String numero_facture;

   

    @ManyToOne
    @JoinColumn(name = "id_client") client client;

    @Column
    private LocalDate date_facture;

    @Column
    private double montant;


    @Column
    private String montant_lettre;


    @Column
    private String mode_reglement;

    @Column
    private String bl;


    @Column
    private LocalDate date_reglement;

    @Column
    private String situation;

    @Column
    private String remarque;
    
   

    public facture(){}



    public facture(com.chelete.demo.client.client client, LocalDate date_facture, double montant, String mode_reglement,
            LocalDate date_reglement,String bl ,String montant_lettre, String situation, String remarque ,String numero_facture) {
        this.client = client;
        this.date_facture = date_facture;
        this.montant = montant;
        this.mode_reglement = mode_reglement;
        this.date_reglement = date_reglement;
        this.situation = situation;
        this.remarque = remarque;
        this.montant_lettre=montant_lettre;
        this.numero_facture=numero_facture;
        this.bl=bl;
    }



    public long getId_facture() {
        return id_facture;
    }



    public void setId_facture(long id_facture) {
        this.id_facture = id_facture;
    }



    public String getNumero_facture() {
        return numero_facture;
    }



    public void setNumero_facture(String numero_facture) {
        this.numero_facture = numero_facture;
    }

    public client getClient() {
        return client;
    }



    public void setClient(client client) {
        this.client = client;
    }


    public String getMontant_lettre() {
        return montant_lettre;
    }



    public void setMontant_lettre(String montant_lettre) {
        this.montant_lettre = montant_lettre;
    }



    public LocalDate getDate_facture() {
        return date_facture;
    }



    public void setDate_facture(LocalDate date_facture) {
        this.date_facture = date_facture;
    }



    public double getMontant() {
        return montant;
    }



    public void setMontant(double montant) {
        this.montant = montant;
    }



    public String getMode_reglement() {
        return mode_reglement;
    }



    public void setMode_reglement(String mode_reglement) {
        this.mode_reglement = mode_reglement;
    }



    public LocalDate getDate_reglement() {
        return date_reglement;
    }



    public void setDate_reglement(LocalDate date_reglement) {
        this.date_reglement = date_reglement;
    }



    public String getSituation() {
        return situation;
    }



    public void setSituation(String situation) {
        this.situation = situation;
    }



    public String getRemarque() {
        return remarque;
    }



    public void setRemarque(String remarque) {
        this.remarque = remarque;
    }

    public String getBl() {
        return bl;
    }



    public void setBl(String bl) {
        this.bl = bl;
    }
    
    
}
