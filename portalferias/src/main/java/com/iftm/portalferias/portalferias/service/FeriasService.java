package com.iftm.portalferias.portalferias.service;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iftm.portalferias.portalferias.entity.Ferias;
import com.iftm.portalferias.portalferias.repository.IFeriasRepository;

@Service
public class FeriasService {

	@Autowired
	private IFeriasRepository repository;

	public Ferias salvar(Ferias ferias) {
		return repository.save(ferias);
	}

	public void excluir(Long id) {
		repository.delete(new Ferias(id));
	}

	public List<Ferias> buscarTodos() {
		return repository.findAll();
	}

	public Ferias buscarPorId(Long id) {
		return repository.findOne(id);
	}

	public Ferias atualizar(Long id, Ferias grupo) {
		Ferias entidadeSalvo = buscarPorId(id);
		BeanUtils.copyProperties(grupo, entidadeSalvo, "id");
		return salvar(grupo);
	}
}
