package com.chelete.demo.produit;


import com.itextpdf.text.pdf.PdfPCell;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table
public class produit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id_produit;
    @Column
    private String reference;
    @Column
    private int quantite;
    @Column
    private int stock;
    @Column
    private double prix_unitaire;
    @Column
    private double prix_vente;

    public produit(){}

    public produit(String reference, int quantite, int stock, double prix_unitaire, double prix_vente) {
        this.reference = reference;
        this.quantite = quantite;
        this.stock = stock;
        this.prix_unitaire = prix_unitaire;
        this.prix_vente = prix_vente;
    }

    public long getId_produit() {
        return id_produit;
    }

    public void setId_produit(int id_produit) {
        this.id_produit = id_produit;
    }
    public String getReference() {
        return reference;
    }
    public void setReference(String reference) {
        this.reference = reference;
    }
    public int getQuantite() {
        return quantite;
    }
    public void setQuantite(int quantite) {
        this.quantite = quantite;
    }
    public int getStock() {
        return stock;
    }
    public void setStock(int stock) {
        this.stock = stock;
    }
    public double getPrix_unitaire() {
        return prix_unitaire;
    }
    public void setPrix_unitaire(double prix_unitaire) {
        this.prix_unitaire = prix_unitaire;
    }
    public double getPrix_vente() {
        return prix_vente;
    }
    public void setPrix_vente(double prix_vente) {
        this.prix_vente = prix_vente;
    }

    public PdfPCell getName() {
        return null;
    }

    
  


}
