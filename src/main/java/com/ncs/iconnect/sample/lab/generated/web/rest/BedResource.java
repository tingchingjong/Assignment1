package com.ncs.iconnect.sample.lab.generated.web.rest;

import com.ncs.iconnect.sample.lab.generated.service.BedService;
import com.ncs.iconnect.sample.lab.generated.web.rest.errors.BadRequestAlertException;
import com.ncs.iconnect.sample.lab.generated.service.dto.BedDTO;
import com.ncs.iconnect.sample.lab.generated.service.dto.BedCriteria;
import com.ncs.iconnect.sample.lab.generated.service.BedQueryService;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.ncs.iconnect.sample.lab.generated.domain.Bed}.
 */
@RestController
@RequestMapping("/api")
public class BedResource {

    private final Logger log = LoggerFactory.getLogger(BedResource.class);

    private static final String ENTITY_NAME = "bed";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BedService bedService;

    private final BedQueryService bedQueryService;

    public BedResource(BedService bedService, BedQueryService bedQueryService) {
        this.bedService = bedService;
        this.bedQueryService = bedQueryService;
    }

    /**
     * {@code POST  /beds} : Create a new bed.
     *
     * @param bedDTO the bedDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new bedDTO, or with status {@code 400 (Bad Request)} if the bed has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/beds")
    public ResponseEntity<BedDTO> createBed(@Valid @RequestBody BedDTO bedDTO) throws URISyntaxException {
        log.debug("REST request to save Bed : {}", bedDTO);
        if (bedDTO.getId() != null) {
            throw new BadRequestAlertException("A new bed cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BedDTO result = bedService.save(bedDTO);
        return ResponseEntity.created(new URI("/api/beds/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /beds} : Updates an existing bed.
     *
     * @param bedDTO the bedDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated bedDTO,
     * or with status {@code 400 (Bad Request)} if the bedDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the bedDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/beds")
    public ResponseEntity<BedDTO> updateBed(@Valid @RequestBody BedDTO bedDTO) throws URISyntaxException {
        log.debug("REST request to update Bed : {}", bedDTO);
        if (bedDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BedDTO result = bedService.update(bedDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, bedDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /beds} : get all the beds.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of beds in body.
     */
    @GetMapping("/beds")
    public ResponseEntity<List<BedDTO>> getAllBeds(BedCriteria criteria, Pageable pageable) {
        log.debug("REST request to get Beds by criteria: {}", criteria);
        Page<BedDTO> page = bedQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /beds/count} : count all the beds.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/beds/count")
    public ResponseEntity<Long> countBeds(BedCriteria criteria) {
        log.debug("REST request to count Beds by criteria: {}", criteria);
        return ResponseEntity.ok().body(bedQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /beds/:id} : get the "id" bed.
     *
     * @param id the id of the bedDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the bedDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/beds/{id}")
    public ResponseEntity<BedDTO> getBed(@PathVariable Long id) {
        log.debug("REST request to get Bed : {}", id);
        Optional<BedDTO> bedDTO = bedService.findOne(id);
        return ResponseUtil.wrapOrNotFound(bedDTO);
    }

    /**
     * {@code DELETE  /beds/:id} : delete the "id" bed.
     *
     * @param id the id of the bedDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/beds/{id}")
    public ResponseEntity<Void> deleteBed(@PathVariable Long id) {
        log.debug("REST request to delete Bed : {}", id);
        bedService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
