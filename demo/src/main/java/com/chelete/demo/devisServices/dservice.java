package com.chelete.demo.devisServices;

import com.chelete.demo.devis.devis;
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
public class dservice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
     private long id_service;


     @Column
    private String designation;

    @Column
    private String quantite;

    @Column
    private float pu;

    @Column
    private float montant;

    @Column
    private String u;

    public String getU() {
        return u;
    }



    public void setU(String u) {
        this.u = u;
    }



    @ManyToOne
    @JoinColumn(name = "id_devis")
    private devis devis;





    public dservice() {
    }



    public dservice(String designation, String quantite, float pu, float montant,
            com.chelete.demo.devis.devis devis) {
        this.designation = designation;
        this.quantite = quantite;
        this.pu = pu;
        this.montant = montant;
        this.devis = devis;
    }



    public long getId_service() {
        return id_service;
    }



    public void setId_service(long id_service) {
        this.id_service = id_service;
    }



    public String getDesignation() {
        return designation;
    }



    public void setDesignation(String designation) {
        this.designation = designation;
    }



    public String getQuantite() {
        return quantite;
    }



    public void setQuantite(String quantite) {
        this.quantite = quantite;
    }



    public float getPu() {
        return pu;
    }



    public void setPu(float pu) {
        this.pu = pu;
    }



    public float getMontant() {
        return montant;
    }



    public void setMontant(Float montant) {
        this.montant = montant;
    }



    public devis getDevis() {
        return devis;
    }



    public void setDevis(devis devis) {
        this.devis = devis;
    }


    
}
