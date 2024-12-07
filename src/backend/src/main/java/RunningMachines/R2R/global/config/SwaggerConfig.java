package RunningMachines.R2R.global.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.servers.Server;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        servers = {
                @Server(
                        url = "http://localhost:8080",
                        description = "로컬 서버 URL"
                ),
                @Server(
                        url = "https://52.78.82.12.nip.io",
                        description = "HTTPS 서버 URL"
                )
        }
)
public class SwaggerConfig {

    private static final String SCHEME_NAME = "Authorization";
    private static final String SCHEME_TYPE = "Bearer";

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .components(new Components().addSecuritySchemes(SCHEME_NAME, securityScheme()))
                .addSecurityItem(new SecurityRequirement().addList(SCHEME_NAME))
                .info(getInfo());
    }

    private Info getInfo() {
        return new Info()
                .title("R2R API Document")
                .description("R2R document 입니다.")
                .version("1.0.0");
    }

    private SecurityScheme securityScheme() {
        return new SecurityScheme()
                .name(SCHEME_NAME)
                .type(SecurityScheme.Type.HTTP)
                .scheme(SCHEME_TYPE)
                .bearerFormat("JWT")
                .in(SecurityScheme.In.HEADER);
    }
}
