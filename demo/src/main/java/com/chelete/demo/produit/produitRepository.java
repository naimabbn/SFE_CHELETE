package com.chelete.demo.produit;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface produitRepository extends JpaRepository<produit,Long> {


    @Query("SELECT p FROM produit p ORDER BY p.id_produit DESC")
    List<produit> findAllSortedByIdDesc();

    @Query("SELECT p FROM produit p where p.reference  LIKE %:reference%")
    List<produit> findByReferenceContainingIgnoreCase(@Param("reference") String reference);
    
}
