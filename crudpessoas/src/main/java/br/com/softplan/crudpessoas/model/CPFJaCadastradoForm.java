package br.com.softplan.crudpessoas.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "cpfForm", description = "Modelo do objeto para verificação do CPF já cadastrado")
public class CPFJaCadastradoForm {
	
	@ApiModelProperty(value = "Código da pessoa (utilizado para os casos de edições)")
	private Long id;
	@ApiModelProperty(value = "CPF à ser verificado")
	private String cpf;
}
