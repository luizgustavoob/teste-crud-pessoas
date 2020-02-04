package br.com.softplan.crudpessoas.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.softplan.crudpessoas.model.CPFJaCadastradoForm;
import br.com.softplan.crudpessoas.model.Pessoa;
import br.com.softplan.crudpessoas.service.PessoaService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@RequestMapping("/pessoas")
@Api(value = "/pessoas")
public class PessoaController {
	
	@Autowired
	private PessoaService service;
	
	@PostMapping
	@ApiOperation(value = "Insere uma nova pessoa")
	@ApiResponses(value = {
			@ApiResponse(code = 201, message = "Pessoa inserida com sucesso"),
			@ApiResponse(code = 401, message = "Não possui permissão para utilizar o recurso"),
			@ApiResponse(code = 500, message = "Foi gerada uma exceção no servidor")
	})
	public ResponseEntity<Pessoa> insert(
			@RequestBody
			@Valid
			@ApiParam(required = true, name = "pessoa", value = "Dados da nova pessoa")
			Pessoa pessoa) {
		Pessoa pessoaSave = service.insert(pessoa);
		return ResponseEntity.status(HttpStatus.CREATED).body(pessoaSave);
	}
	
	@PutMapping("/{id}")
	@ApiOperation(value = "Atualiza uma pessoa pré-existente")
	@ApiResponses(value = {
			@ApiResponse(code = 200, message = "Pessoa atualizada com sucesso"),
			@ApiResponse(code = 401, message = "Não possui permissão para utilizar o recurso"),
			@ApiResponse(code = 500, message = "Foi gerada uma exceção no servidor")
	})
	public ResponseEntity<Pessoa> update(
			@PathVariable("id")
			@ApiParam(required = true, name = "código", value = "Código identificador da pessoa para atualização")
			Long id,
			@RequestBody
			@Valid
			@ApiParam(required = true, name = "pessoa", value = "Dados da pessoa para atualização")
			Pessoa pessoa) {
		Pessoa pessoaSave = service.update(id, pessoa);
		return ResponseEntity.ok(pessoaSave);
	}
	
	@GetMapping("/{id}")
	@ApiOperation(value = "Retorna uma pessoa através do seu código identificador")
	@ApiResponses(value = {
			@ApiResponse(code = 200, message = "Retorna a pessoa"),
			@ApiResponse(code = 401, message = "Não possui permissão para utilizar o recurso"),
			@ApiResponse(code = 500, message = "Foi gerada uma exceção no servidor")
	})
	public ResponseEntity<Pessoa> findById(
			@PathVariable("id")
			@ApiParam(required = true, name = "código", value = "Código identificador da pessoa para pesquisa")
			Long id) {
		Pessoa pessoa = service.findById(id);
		return ResponseEntity.ok(pessoa);
	}
	
	@GetMapping
	@ApiOperation(value = "Retorna uma página de pessoas")
	@ApiResponses(value = {
			@ApiResponse(code = 200, message = "Retorna uma página de pessoas"),
			@ApiResponse(code = 401, message = "Não possui permissão para utilizar o recurso"),
			@ApiResponse(code = 500, message = "Foi gerada uma exceção no servidor")
	})
	@ApiImplicitParams({
		@ApiImplicitParam(name = "sort.sorted", value = "Indica se a página está ordenada"),
		@ApiImplicitParam(name = "sort.unsorted", value = "Indica se a página não está ordenada"),
		@ApiImplicitParam(name = "paged", value = "Indica se o resultado está paginado"),
		@ApiImplicitParam(name = "unpaged", value = "Indica se o resultado não está paginado"),
		@ApiImplicitParam(name = "pageNumber", value = "Indica o número da página do resultado"),
		@ApiImplicitParam(name = "pageSize", value = "Indica o tamanho (qtde de registros) da página do resultado"),
		@ApiImplicitParam(name = "offset", value = "Indica o deslocamento, isto é, o número de registros que foram 'pulados', na página do resultado")
	})
	public ResponseEntity<Page<Pessoa>> findAll(Pageable paginacao) {
		Page<Pessoa> pessoas = service.findAll(paginacao);
		return ResponseEntity.ok(pessoas);
	}
	
	@DeleteMapping("/{id}")
	@ResponseStatus(code = HttpStatus.OK)
	@ApiOperation(value = "Deleta uma pessoa a partir do seu código identificador")
	@ApiResponses(value = {
			@ApiResponse(code = 200, message = "Pessoa removida com sucesso"),
			@ApiResponse(code = 401, message = "Não possui permissão para utilizar o recurso"),
			@ApiResponse(code = 500, message = "Foi gerada uma exceção no servidor")
	})
	public void delete(
			@PathVariable("id")
			@ApiParam(required = true, name = "código", value = "Código identificador da pessoa para remoção")
			Long id) {
		service.delete(id);
	}
	
	@GetMapping("/cpfJaCadastrado")
	@ResponseStatus(code = HttpStatus.OK)
	@ApiOperation(value = "Retorna se um determinado CPF já foi utilizado para alguma pessoa")
	@ApiResponses(value = {
			@ApiResponse(code = 200, message = "Retorna se CPF já foi utilizado"),
			@ApiResponse(code = 401, message = "Não possui permissão para utilizar o recurso"),
			@ApiResponse(code = 500, message = "Foi gerada uma exceção no servidor")
	})
	public boolean cpfJaCadastrado(
			@ApiParam(required = true, name = "cpfForm", value = "Modelo do objeto para verificação do CPF já cadastrado")
			CPFJaCadastradoForm cpfForm) {
		return service.cpfJaCadastrado(cpfForm.getId(), cpfForm.getCpf());
	}
}
