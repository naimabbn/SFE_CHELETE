package com.chelete.demo.devisServices;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface serviceeRepository extends JpaRepository<dservice,Long> {
    @Query("SELECT s FROM dservice s ORDER BY s.id_service DESC")
    List<dservice> findAllSortedByIdDesc();

    @Query("SELECT s FROM dservice s WHERE s.devis.id_devis =:id ORDER BY s.id_service DESC")
    List<dservice> findByFactureId(@Param("id") Long id);

}
