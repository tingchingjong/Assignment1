package com.ncs.iconnect.sample.lab.generated.repository;

import com.ncs.iconnect.sample.lab.generated.domain.Bed;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Bed entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BedRepository extends JpaRepository<Bed, Long>, JpaSpecificationExecutor<Bed> {
    @Query("FROM tbl bed w WHERE LOWER(w.bed_name) LIKE LOWER(CONCAT('%',queryt,'%'))")
    public static Page<Bed> search(@Param("query") String query, Pageable page){

        return null;

    }
    
    Bed findByBedReferenceId(String bedReferenceId);
    Bed findByBedName(String bedName);
}
