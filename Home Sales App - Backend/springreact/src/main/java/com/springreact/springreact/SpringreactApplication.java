package com.springreact.springreact;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@ComponentScan(basePackages = "com.springreact.*") 
@EntityScan("com.springreact.*")
@EnableJpaRepositories(basePackages = "com.springreact.repository")
public class SpringreactApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringreactApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer configurer() {
		return new WebMvcConfigurer() {
			public void addCorsMappings(CorsRegistry registry){
				registry.addMapping("/**")
						.allowedOrigins("http://localhost:5173")
						.allowedMethods("GET","POST","PUT","DELETE","OPTIONS")
						.allowedHeaders("*");
			}
		};
	}

}
