package com.fams.fixedasset.Authentication.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(	name = "users", 
		uniqueConstraints = { 
			@UniqueConstraint(columnNames = "username"),
			@UniqueConstraint(columnNames = "email") 
		})
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@Size(max = 100)
	private String firstname;

	@NotBlank
	@Size(max = 100)
	private String lastname;

	@NotBlank
	@Size(max = 100)
	private String username;

	@NotBlank
	@Size(max = 100)
	private String phonenumber;

	@NotBlank
	@Size(max = 100)
	@Email
	private String email;

	@NotBlank
	@Size(max = 100)
	private String department;


	public User(String firstname, String lastname, String username, String phonenumber, String email, String department, String password, String createdOn, String modifiedBy, String modifiedOn, String deleteFlag, boolean isAcctActive, boolean isLoggedIn, boolean isAcctLocked, Set<Role> roles) {
		this.firstname = firstname;
		this.lastname = lastname;
		this.username = username;
		this.phonenumber = phonenumber;
		this.email = email;
		this.department = department;
		this.password = password;
		this.createdOn = createdOn;
		this.modifiedBy = modifiedBy;
		this.modifiedOn = modifiedOn;
		this.deleteFlag = deleteFlag;
		this.isAcctActive = isAcctActive;
		this.isLoggedIn = isLoggedIn;
		this.isAcctLocked = isAcctLocked;
		this.roles = roles;
	}

	@NotBlank
	@Size(max = 120)
	@JsonIgnore
	private String password;

	@Column(name = "createdOn", nullable = false)
	private String createdOn;

	@Column(name = "modifiedBy", nullable = false, length=15)
	private String modifiedBy;

	@Column(name = "modifiedOn", nullable = false)
	private String modifiedOn;

	@Column(name = "deleteFlag", nullable = false, length = 1)
	private String deleteFlag;

	@Column(name = "active")
	private boolean isAcctActive;

	public boolean isLoggedIn() {
		return isLoggedIn;
	}

	public void setLoggedIn(boolean loggedIn) {
		isLoggedIn = loggedIn;
	}

	@Column(columnDefinition = "boolean default false",name = "loggedin")
	private boolean isLoggedIn;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPhonenumber() {
		return phonenumber;
	}

	public void setPhonenumber(String phonenumber) {
		this.phonenumber = phonenumber;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getCreatedOn() {
		return createdOn;
	}

	public void setCreatedOn(String createdOn) {
		this.createdOn = createdOn;
	}

	public String getModifiedBy() {
		return modifiedBy;
	}

	public void setModifiedBy(String modifiedBy) {
		this.modifiedBy = modifiedBy;
	}

	public String getModifiedOn() {
		return modifiedOn;
	}

	public void setModifiedOn(String modifiedOn) {
		this.modifiedOn = modifiedOn;
	}

	public String getDeleteFlag() {
		return deleteFlag;
	}

	public void setDeleteFlag(String deleteFlag) {
		this.deleteFlag = deleteFlag;
	}

	public boolean isAcctActive() {
		return isAcctActive;
	}

	public void setAcctActive(boolean acctActive) {
		isAcctActive = acctActive;
	}

	public boolean isAcctLocked() {
		return isAcctLocked;
	}

	public void setAcctLocked(boolean acctLocked) {
		isAcctLocked = acctLocked;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	@Column(name = "locked")
	private boolean isAcctLocked;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(	name = "user_roles", 
				joinColumns = @JoinColumn(name = "user_id"), 
				inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<>();

	public User() {
	}

	public User(String username, String email, String password) {
		this.username = username;
		this.email = email;
		this.password = password;
	}

	public User(String firstname, String lastname, String username, String phonenumber, String email, String department, String password, String createdOn, String modifiedBy, String modifiedOn, String deleteFlag, boolean isAcctActive, boolean isAcctLocked) {
		this.firstname = firstname;
		this.lastname = lastname;
		this.username = username;
		this.phonenumber = phonenumber;
		this.email = email;
		this.department = department;
		this.password = password;
		this.createdOn = createdOn;
		this.modifiedBy = modifiedBy;
		this.modifiedOn = modifiedOn;
		this.deleteFlag = deleteFlag;
		this.isAcctActive = isAcctActive;
		this.isAcctLocked = isAcctLocked;
	}

	public User(String username, String email) {
		this.id = id;
		this.username = username;
		this.email = email;
	}

	public User(Long id, Set<Role> roles) {
		this.id = id;
		this.roles = roles;
	}


}
