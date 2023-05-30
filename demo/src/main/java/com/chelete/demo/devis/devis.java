package com.chelete.demo.devis;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import com.chelete.demo.client.client;

@Entity
@Table
public class devis {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
     private long id_devis;

    @ManyToOne
    @JoinColumn(name = "id_client")
    private client client;

    @Column
    private LocalDate date_devis;

    @Column
    private float montant;

    @Column
    private String numero_devis;   

   

    @Column
    private String remarque;   

    @Column
    private String montant_lettre;


    public devis(){}



    public devis(com.chelete.demo.client.client client, LocalDate date_devis, float montant, 
            String remarque ,String numero) {
        this.client = client;
        this.date_devis = date_devis;
        this.montant = montant;
       this.numero_devis=numero;
        this.remarque = remarque;
    }



    public long getId_devis() {
        return id_devis;
    }



    public void setId_devis(long id_devis) {
        this.id_devis = id_devis;
    }
    public String getNumero_devis() {
        return numero_devis;
    }



    public void setNumero_devis(String numero_devis) {
        this.numero_devis = numero_devis;
    }


    public client getClient() {
        return client;
    }



    public void setClient(client client) {
        this.client = client;
    }



    public LocalDate getDate_devis() {
        return date_devis;
    }



    public void setDate_devis(LocalDate date_devis) {
        this.date_devis = date_devis;
    }



    public float getMontant() {
        return montant;
    }



    public void setMontant(float montant) {
        this.montant = montant;
    }






    public String getRemarque() {
        return remarque;
    }



    public void setRemarque(String remarque) {
        this.remarque = remarque;
    }
    public String getMontant_lettre() {
        return montant_lettre;
    }



    public void setMontant_lettre(String montant_lettre) {
        this.montant_lettre = montant_lettre;
    }
    
    
}
