package com.chelete.demo.client;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface clientRepository extends JpaRepository<client,Long> {

    @Query("SELECT c FROM client c ORDER BY c.id_client DESC")
    List<client> findAllSortedByIdDesc();
}
