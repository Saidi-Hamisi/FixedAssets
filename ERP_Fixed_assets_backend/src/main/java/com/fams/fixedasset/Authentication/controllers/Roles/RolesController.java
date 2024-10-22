package com.fams.fixedasset.Authentication.controllers.Roles;

import com.fams.fixedasset.Authentication.models.ERole;
import com.fams.fixedasset.Authentication.models.Role;
import com.fams.fixedasset.Authentication.payload.requests.auditing.Auditing;
import com.fams.fixedasset.Authentication.payload.responses.MessageResponse;
import com.fams.fixedasset.Authentication.repositories.AuditingRepository;
import com.fams.fixedasset.Authentication.repositories.roles.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/fams/roles")
public class RolesController {
	@Autowired
	private RoleRepository repository;

	//Auditing Configs
	DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
	LocalDateTime now = LocalDateTime.now();
	String modified_on = dtf.format(now);

	@Autowired
	AuditingRepository auditingRepository;

	//Auditing
	public void addAudit(Authentication authentication, HttpServletRequest request, String action)
	{
		Auditing auditing = new Auditing();
		auditing.setActivity(action);
		auditing.setStarttime(dtf.format(now));
		auditing.setUsername(authentication.getName());
		auditing.setRequestip(request.getRemoteAddr());
		auditingRepository.save(auditing);
	}

	//Add Roles
	@PostMapping("/add")
	public ResponseEntity<?> saveSenderInfo(@RequestBody Role details,Authentication authentication, HttpServletRequest request) throws Exception
	{
		//Get Role Enum
		String role = details.getName().toString().toUpperCase();
		switch (role) {
			case "ADMIN":
				details.setName(ERole.ROLE_ADMIN);
				break;
			case "EXECUTIVE":
				details.setName(ERole.ROLE_EXECUTIVE);
				break;
			case "SUPERVISOR":
				details.setName(ERole.ROLE_SUPERVISOR);
				break;
			case "CLERK":
			default:
				details.setName(ERole.ROLE_CLERK);
		}
        if (repository.existsByName(details.getName())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Role already added!"));
        }

		Role newrole = repository.save(details);

		//Add Audit
		addAudit(authentication,request,"Admin add new role :: Role Name :: "+details.getName());
		return new ResponseEntity<>(newrole, HttpStatus.CREATED);
	}

	//For listing all Roles
	@GetMapping("/view")
	public ResponseEntity<List<Role>> getAllRoles(Authentication authentication, HttpServletRequest request)
	{
		List<Role> roles =repository.findAll();

		//Add Audit
		addAudit(authentication,request,"Admin View All Roles");

		return new ResponseEntity<>(roles, HttpStatus.OK);
	}

	//Updating ROLE NAME
	@PutMapping("/update")
	public ResponseEntity<Role> updateRole(@RequestBody Role tmp,Authentication authentication, HttpServletRequest request)
	{
		Role updatedetails = repository.save(tmp);
		//Add Audit
		addAudit(authentication,request,"Admin Update Role :: Role Id :: "+tmp.getId());
		return new ResponseEntity<>(updatedetails,HttpStatus.OK);
	}

	//Deleting ROLE
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteRole(@PathVariable("id") Long id,Authentication authentication, HttpServletRequest request)
	{
		if(repository.selectFlag(id).equalsIgnoreCase("")) {
			repository.deleteById(id);
			//Add Audit
			addAudit(authentication, request, "Admin Delete Role - Role id = " + id);
			return ResponseEntity.ok(new MessageResponse("Role Deleted!"));
		}
		else
		{
			return ResponseEntity.ok(new MessageResponse("Role Already Assigned to Users, Deletion not allowed!"));
		}
	}

	//Test Content accessible by all users
	@GetMapping("/all")
	public String allRoles() {
		return "Public Content.";
	}

	//Test content accessible to clerks only
	@GetMapping("/clerk")
	@PreAuthorize("hasRole('ROLE_CLERK')")
	public String userAccess() {
		return "Clerk Content.";
	}


	//Test content accessible to supervisors only
	@GetMapping("/supervisor")
	@PreAuthorize("hasRole('ROLE_SUPERVISOR')")
	public String supervisorAccess() {
		return "Supervisor Content.";
	}

	//Test content accessible to executive only
	@GetMapping("/executive")
	@PreAuthorize("hasRole('ROLE_EXECUTIVE')")
	public String executiveAccess() {
		return "Executive Dashboard";
	}


	//Test content accessible to ADMiN only
	@GetMapping("/admin")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public String adminAccess() {
		return "Admin Board.";
	}
}
