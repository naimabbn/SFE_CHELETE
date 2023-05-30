package com.chelete.demo.devis;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface devisRepository extends JpaRepository<devis,Long> {
    @Query("SELECT d FROM devis d ORDER BY d.id_devis DESC")
    List<devis> findAllSortedByIdDesc();
}
