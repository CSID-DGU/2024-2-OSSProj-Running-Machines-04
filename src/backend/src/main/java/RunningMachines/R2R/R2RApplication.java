package RunningMachines.R2R;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class R2RApplication {

	public static void main(String[] args) {
		SpringApplication.run(R2RApplication.class, args);
	}

}
