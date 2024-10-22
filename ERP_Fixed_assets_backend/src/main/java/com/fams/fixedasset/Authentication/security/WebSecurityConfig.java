//package com.fams.fixedasset.Authentication.security;
//
//import com.fams.fixedasset.Authentication.security.jwt.AuthEntryPointJwt;
//import com.fams.fixedasset.Authentication.security.jwt.AuthTokenFilter;
//import com.fams.fixedasset.Authentication.security.services.UserDetailsServiceImpl;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//
//@Configuration
//@EnableWebSecurity
//@EnableGlobalMethodSecurity(// securedEnabled = true,// jsr250Enabled = true,
//		prePostEnabled = true)
//public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
//	@Autowired
//    UserDetailsServiceImpl userDetailsService;
//
//	@Autowired
//	private AuthEntryPointJwt unauthorizedHandler;
//
//	@Bean
//	public AuthTokenFilter authenticationJwtTokenFilter() {
//		return new AuthTokenFilter();
//	}
//
//	@Override
//	public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
//		authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
//	}
//
//	@Bean
//	@Override
//	public AuthenticationManager authenticationManagerBean() throws Exception {
//		return super.authenticationManagerBean();
//	}
//
//	@Bean
//	public PasswordEncoder passwordEncoder() {
//		return new BCryptPasswordEncoder();
//	}
//
//	@Override
//	protected void configure(HttpSecurity http) throws Exception {
//		http.cors().and().csrf().disable()
//			.exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
//			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
//			.authorizeRequests().antMatchers("/fams/auth/**").permitAll()
//			.antMatchers("/fams/roles/**").hasRole("ADMIN")
//				.antMatchers("/fams/users/**").hasRole("ADMIN")
//				.antMatchers("/fams/otherusers/**").permitAll()
//				.antMatchers("/fams/auth/logout").permitAll()
//				.antMatchers("/fams/audit/**").permitAll()
//				.antMatchers("/fams/reset/**").permitAll()
//				.anyRequest().permitAll();
//			//.anyRequest().authenticated();
//
//		http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
//	}
//}


package com.fams.fixedasset.Authentication.security;

import com.fams.fixedasset.Authentication.security.jwt.AuthEntryPointJwt;
import com.fams.fixedasset.Authentication.security.jwt.AuthTokenFilter;
import com.fams.fixedasset.Authentication.security.services.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(// securedEnabled = true,// jsr250Enabled = true,
		prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	@Autowired
	UserDetailsServiceImpl userDetailsService;

//	@Value("${users.app.client.origin_url}")
//	private String client_origin_url;
//	@Value("${users.app.client.origin_ip}")
//	private String client_origin_ip;
//	@Value("${users.app.client.origin_postbank_uat_url}")
//	private String client_origin_postbank_uat_url;
//	@Value("${users.app.client.origin_postbank_uat_ip}")
//	private String client_origin_postbank_uat_ip;
//	@Value("${users.app.client.origin_postbank_live_url}")
//	private String client_origin_postbank_live_url;
//	@Value("${users.app.client.origin_postbank_live_ip}")
//	private String client_origin_postbank_live_ip;
//
//	@Value("${users.app.client.origin_52_ip}")
//	private String client_origin_52_ip;



	@Autowired
	private AuthEntryPointJwt unauthorizedHandler;

	@Bean
	public AuthTokenFilter authenticationJwtTokenFilter() {
		return new AuthTokenFilter();
	}

	@Override
	public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
		authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
	}
	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}


	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
				.cors()
				.and()
				.csrf()
				.disable()
				.authorizeRequests().antMatchers("/fams/auth/**").permitAll()
//			.antMatchers("/soa/roles/**").hasRole("ADMIN")
//				.antMatchers("/soa/users/**").hasRole("ADMIN")
//				.antMatchers("/soa/departments/**").hasRole("ADMIN")
				.antMatchers("/fams/auth/signin/**").permitAll()
//				.antMatchers("/api/v1/contraDetails/**").permitAll()
//				.antMatchers("/api/v1/transaction/**").permitAll()
				.antMatchers("/fams/auth/logout/**").permitAll()
				.antMatchers("/fams/users/signup/**").permitAll()
				.antMatchers("/fams/users/updatepassword/**").authenticated()
				.antMatchers("/fams/users/logout/**").permitAll()
				.antMatchers("/fams/users/forgot-password/**").permitAll()
				.anyRequest()
				.permitAll()
//				.fullyAuthenticated()
				//.permitAll()
				.and()
				.sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				.and()
				.exceptionHandling()
				.authenticationEntryPoint(unauthorizedHandler)
				.and()
				.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
		http.headers().frameOptions().disable();
		http.headers().cacheControl().disable();
		http.headers().contentTypeOptions().disable();
		http.headers().xssProtection().disable();
		http.headers().addHeaderWriter((request, response) -> {
			response.setHeader("Access-Control-Allow-Credentials", "true");
		});
	}


//	@Bean
//	public CorsConfigurationSource corsConfigurationSource() {
//		CorsConfiguration config = new CorsConfiguration();
//		config.setAllowCredentials(true);
//		config.addAllowedOrigin("*");
//		config.addAllowedHeader("*");
//		config.addAllowedMethod("*");
//
//		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//		source.registerCorsConfiguration("/**", config);
//
//		return source;
//	}
@Bean
public CorsConfigurationSource corsConfigurationSource() {
	CorsConfiguration config = new CorsConfiguration();
	config.setAllowCredentials(true);
	config.addAllowedOriginPattern("*");
	config.addAllowedHeader("*");
	config.addAllowedMethod("*");

	UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	source.registerCorsConfiguration("/**", config);

	return source;
}


//	@Bean
//	CorsConfigurationSource corsConfigurationSource()
//	{
//		CorsConfiguration config = new CorsConfiguration();
//		config.setAllowCredentials(true);
//		config.setMaxAge(4000000L);
////		For Security Set to only allow request from a static elastic IP
////		config.addAllowedOrigin(client_origin_ip);
////		config.addAllowedOrigin(client_origin_url);
////		config.addAllowedOrigin(client_origin_postbank_uat_url);
////		config.addAllowedOrigin(client_origin_postbank_uat_ip);
////		config.addAllowedOrigin(client_origin_postbank_live_url);
////		config.addAllowedOrigin(client_origin_postbank_live_ip);
////		config.addAllowedOrigin(client_origin_52_ip);
//		config.addAllowedOrigin("http://localhost:4200/");
//		config.addAllowedOrigin("http://localhost:4300/");
//		config.addAllowedOrigin("http://127.0.0.1:9002/swagger-ui/#/");
//		config.addAllowedHeader("Content-Type");
//		config.addAllowedHeader("x-xsrf-token");
//		config.addAllowedHeader("Authorization");
//		config.addAllowedHeader("Access-Control-Allow-Headers");
//		config.addAllowedHeader("Origin");
//		config.addAllowedHeader("Accept");
//		config.addAllowedHeader("X-Requested-With");
//		config.addAllowedHeader("Access-Control-Request-Method");
//		config.addAllowedHeader("Access-Control-Request-Headers");
//		config.addExposedHeader("Content-Type");
//		config.addExposedHeader("x-xsrf-token");
//		config.addExposedHeader("Authorization");
//		config.addExposedHeader("Access-Control-Allow-Headers");
//		config.addExposedHeader("Origin");
//		config.addExposedHeader("Accept");
//		config.addExposedHeader("X-Requested-With");
//		config.addExposedHeader("Access-Control-Request-Method");
//		config.addExposedHeader("Access-Control-Request-Headers");
//		config.addExposedHeader("Message");
//		config.addAllowedMethod("OPTIONS");
//		config.addAllowedMethod("HEAD");
//		config.addAllowedMethod("GET");
//		config.addAllowedMethod("PUT");
//		config.addAllowedMethod("POST");
//		config.addAllowedMethod("DELETE");
//		config.addAllowedMethod("PATCH");
//		System.out.println("-----------------------------------");
//		System.out.println(config.getAllowedOrigins());
//		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//		source.registerCorsConfiguration("/**", config);
//		return source;
//	}



}
