package com.iftm.portalferias.portalferias.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.iftm.portalferias.portalferias.entity.Ferias;

public interface IFeriasRepository extends JpaRepository<Ferias, Long> {
	
}