package com.ncs.iconnect.sample.lab.generated.service;

import com.ncs.iconnect.sample.lab.generated.domain.Ward;
import com.ncs.iconnect.sample.lab.generated.repository.WardRepository;
import com.ncs.iconnect.sample.lab.generated.service.dto.WardDTO;
import com.ncs.iconnect.sample.lab.generated.service.mapper.WardMapper;
import com.ncs.iconnect.sample.lab.generated.web.rest.errors.WardNameAlreadyUsedException;
import com.ncs.iconnect.sample.lab.generated.web.rest.errors.WardReferenceIdAlreadyUsedException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.Objects;

/**
 * Service Implementation for managing {@link Ward}.
 */
@Service
@Transactional
public class WardService {

    private final Logger log = LoggerFactory.getLogger(WardService.class);

    private final WardRepository wardRepository;

    private final WardMapper wardMapper;

    public WardService(WardRepository wardRepository, WardMapper wardMapper) {
        this.wardRepository = wardRepository;
        this.wardMapper = wardMapper;
    }

    /**
     * Save a ward.
     *
     * @param wardDTO the entity to save.
     * @return the persisted entity.
     */


    /**
     * Get all the wards.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<WardDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Wards");
        return wardRepository.findAll(pageable)
            .map(wardMapper::toDto);
    }

    /**
     * Get one ward by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<WardDTO> findOne(Long id) {
        log.debug("Request to get Ward : {}", id);
        return wardRepository.findById(id)
            .map(wardMapper::toDto);
    }

    /**
     * Delete the ward by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Ward : {}", id);
        wardRepository.deleteById(id);
    }

    public Page<Ward> search(String query, Pageable page){
        return WardRepository.search(query,page);
    }
    
    public WardDTO save(WardDTO wardDTO) {

        //TODO Function Check before Save.
        log.debug("Request to save Ward : {}", wardDTO);
        if(isWardReferenceIdInUse(wardDTO.getWardReferenceId())){
           throw new WardReferenceIdAlreadyUsedExceptions();
        }else if (isWardNameInUse(wardDTO.getWardName())){
           throw new WardNameAlreadyUsedExceptions();
        }

        Ward ward = wardMapper.toEntity(wardDTO);
        ward = wardRepository.save(ward);
        return wardMapper.toDto(ward);
        
    }
    
    public WardDTO update(WardDTO wardDTO) {
        //TODO Function Check before Update.
       log.debug("Request to save Ward : {}", wardDTO);
       WardDTO oldWard = findOne(wardDTO.getId()).orElseThrow(RuntimeException::new);
       if(!Objects.equals(oldWard.getWardReferenceId(),wardDTO.getWardReferenceId()) && isWardReferenceIdInUse(wardDTO.getWardReferenceId())){
            // Todo : Update All field except ID
            throw new WardReferenceIdAlreadyUsedException();
       }
        if(!Objects.equals(oldWard.getWardName(),wardDTO.getWardName()) && isWardNameInUse(wardDTO.getWardName())){
            // Todo : Update All field except ID
            throw new WardNameAlreadyUsedException();
        }
        // Update All
        Ward ward = wardMapper.toEntity(wardDTO);
        ward = wardRepository.save(ward);
        return wardMapper.toDto(ward);
    }


    //TODO Check Function
    public boolean isWardReferenceIdInUse(String wardReferenceId) {
        return wardRepository.findByWardReferenceId(wardReferenceId)!=null;
    }
    public boolean isWardNameInUse(String wardName){
        return wardRepository.findByWardName(wardName) != null;
    }
    

}
