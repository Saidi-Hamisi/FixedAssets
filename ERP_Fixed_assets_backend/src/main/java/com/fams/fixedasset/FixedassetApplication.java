package com.fams.fixedasset;

import com.fams.fixedasset.Authentication.models.ERole;
import com.fams.fixedasset.Authentication.models.Role;
import com.fams.fixedasset.Authentication.models.User;
import com.fams.fixedasset.Authentication.repositories.roles.RoleRepository;
import com.fams.fixedasset.Authentication.repositories.users.UserRepository;
import com.fams.fixedasset.assetmanagement.FileUploads.FilesStorageServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class FixedassetApplication  extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(FixedassetApplication.class, args);
	}
	@Bean
	CommandLineRunner init(FilesStorageServiceImpl storageService) {
		return (args) -> {
			storageService.deleteAll();
			storageService.init();
		};
	}
	@Component
	public class AdminData implements CommandLineRunner {

		@Autowired
		private UserRepository repository;

		@Autowired
		private RoleRepository roleRepository;

		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
		LocalDateTime now = LocalDateTime.now();
		String modified_on = dtf.format(now);

		//Default Role
		void addRole()
		{
			Role role = new Role();
			role.setName(ERole.ROLE_ADMIN);
			roleRepository.save(role);
		}

		//Default admin records
		void addAdmin()
		{
			User user = new User();
			Set<Role> roles = new HashSet<>();
			Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN).orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(adminRole);
			user.setRoles(roles);
			user.setFirstname("admin");
			user.setLastname("admin");
			user.setUsername("admin");
			user.setEmail("famsadmin@gmail.com");
			user.setPhonenumber("0700000000");
			user.setDepartment("famsdeptmt");
			user.setModifiedBy("defaultuser");
			user.setCreatedOn(modified_on);
			user.setModifiedOn(modified_on);
			user.setAcctActive(true);
			user.setAcctLocked(false);
			user.setDeleteFlag("N");
			user.setPassword("$2a$10$CQaGCl7cT0DCKwy8i2XaN.8X1jM09kr6aQgh2DfDV/VQT1SYP3nL6");
			repository.save(user);
		}
		@Override
		public void run(String...args) throws Exception {
			int countusers = repository.countUsers();
			int countroles = roleRepository.countRoles();

			if(countroles < 1)
			{
				addRole();
			}
			if(countusers < 1 )
			{
				addAdmin();
			}
		}
	}
}
