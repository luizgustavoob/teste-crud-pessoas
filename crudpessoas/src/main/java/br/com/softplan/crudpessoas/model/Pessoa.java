package br.com.softplan.crudpessoas.model;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.br.CPF;

import com.fasterxml.jackson.annotation.JsonIgnore;

import br.com.softplan.crudpessoas.enums.Sexo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "PESSOA")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = {"id"})
public class Pessoa {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "nome", nullable = false)
	@NotNull
	private String nome;
	
	@Enumerated(EnumType.STRING)
	private Sexo sexo;
	
	@Email
	private String email;
	
	@NotNull
	private LocalDate dataNascimento;
	
	private String naturalidade;
	
	private String nacionalidade;
	
	@Column(name = "cpf", nullable = false, unique = true)
	@NotNull
	@CPF
	private String cpf;
	
	@JsonIgnore
	private LocalDate dataCadastro;
	
	@JsonIgnore
	private LocalDate ultimaAlteracao;
	
	@PrePersist
	private void prePersist() {
		this.dataCadastro = LocalDate.now();
		this.ultimaAlteracao = LocalDate.now();
	}
	
	@PreUpdate
	private void preUpdate() {
		this.ultimaAlteracao = LocalDate.now();
	}
}
