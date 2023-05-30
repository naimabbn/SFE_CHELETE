package com.chelete.demo.factureServices;
import com.chelete.demo.facture.facture;
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
public class fservice {
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

    

    @ManyToOne
    @JoinColumn(name = "id_facture")
    private facture facture;



    public fservice() {
    }



    public fservice(String designation, String quantite, float pu, float montant,
            com.chelete.demo.facture.facture facture) {
        this.designation = designation;
        this.quantite = quantite;
        this.pu = pu;
        this.montant = montant;
        this.facture = facture;
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



    public  facture getFacture() {
        return facture;
    }



    public void setFacture(facture facture) {
        this.facture = facture;
    }


    
}
