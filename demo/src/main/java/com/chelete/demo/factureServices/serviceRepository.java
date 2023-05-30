package com.chelete.demo.factureServices;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface serviceRepository extends JpaRepository<fservice,Long> {
    @Query("SELECT s FROM fservice s ORDER BY s.id_service DESC")
    List<fservice> findAllSortedByIdDesc();

    @Query("SELECT s FROM fservice s WHERE s.facture.id_facture =:id ORDER BY s.id_service DESC")
    List<fservice> findByFactureId(@Param("id") Long id);

}
