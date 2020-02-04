package br.com.softplan.crudpessoas.enums;

import lombok.Getter;
import lombok.Setter;

public enum Sexo {

	MASCULINO("MASCULINO"),
	FEMININO("FEMININO"),
	OUTRO("OUTRO");
	
	@Getter @Setter
	private String descricao;
	
	private Sexo(String descricao) {
		this.descricao = descricao;
	}
}
