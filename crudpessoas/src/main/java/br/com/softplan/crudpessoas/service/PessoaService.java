package br.com.softplan.crudpessoas.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import br.com.softplan.crudpessoas.model.Pessoa;
import br.com.softplan.crudpessoas.repository.PessoaRepository;

@Service
public class PessoaService {

	@Autowired
	private PessoaRepository repository;
	
	public Pessoa insert(Pessoa pessoa) {
		return repository.save(pessoa);
	}
	
	public Pessoa update(Long id, Pessoa pessoa) {
		Pessoa pessoaSave = repository.findById(id).orElseThrow(() -> new EmptyResultDataAccessException(1));
		BeanUtils.copyProperties(pessoa, pessoaSave, "id", "dataCadastro");
		return repository.save(pessoaSave);
	}
	
	public void delete(Long id) {
		repository.deleteById(id);
	}
	
	public Page<Pessoa> findAll(Pageable paginacao) {
		return repository.findAll(paginacao);
	}
	
	public Pessoa findById(Long id) {
		return repository.findById(id).orElse(null);
	}
	
	public boolean cpfJaCadastrado(Long idPessoa, String cpf) {
		Pessoa pessoa = repository.findByCpf(cpf).orElse(null);
		return pessoa != null && pessoa.getId() != idPessoa;
	}
}
