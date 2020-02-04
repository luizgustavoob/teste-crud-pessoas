package br.com.softplan.crudpessoas.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@Api(value = "/source")
public class SourceController {

	@GetMapping("/source")
	@ResponseStatus(code = HttpStatus.OK)
	@ApiOperation(value = "Retorna os detalhes do projeto")
	@ApiResponses(value = {
			@ApiResponse(code = 200, message = "Retorna o repositório do projeto no Github"),
			@ApiResponse(code = 500, message = "Foi gerada uma exceção no servidor")
	})
	public String getLinkGithub() {
		return "https://github.com/luizgustavoob/avaliacao-softplan";
	}
}
