package com.chelete.demo.facture;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface factureRepository  extends JpaRepository<facture,Long>{
    @Query("SELECT f FROM facture f ORDER BY f.id_facture DESC")
    List<facture> findAllSortedByIdDesc();

    @Query("SELECT f FROM facture f  where client.id_client=:id and situation='accuser' ORDER BY f.id_facture DESC")
    List<facture> ficheCredit(@Param("id") Long id);

}
