package com.ncs.iconnect.sample.lab.generated.repository;

import com.ncs.iconnect.sample.lab.generated.domain.Ward;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Ward entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WardRepository extends JpaRepository<Ward, Long>, JpaSpecificationExecutor<Ward> {
    @Query("FROM tbl ward w WHERE LOWER(w.ward_name) LIKE LOWER(CONCAT('%',queryt,'%'))")
    public static Page<Ward> search(@Param("query") String query, Pageable page){
        return null;
    }

    Ward findByWardReferenceId(String wardReferenceId);
    Ward findByWardName(String wardName);
}
