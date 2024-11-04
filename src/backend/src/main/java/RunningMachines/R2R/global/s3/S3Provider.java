package RunningMachines.R2R.global.s3;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Component
public class S3Provider {

    private final AmazonS3 amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public String uploadFile(MultipartFile file, S3RequestDto s3RequestDto){

        String originalFilename = file.getOriginalFilename(); // 원본 파일명
        String extension = originalFilename.substring(originalFilename.lastIndexOf(".")); // 확장자명

        String fileName = s3RequestDto.getDirName() + "/" + s3RequestDto.getUserId() + "/" + UUID.randomUUID() + extension; //변경된 파일 명

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(file.getSize());
        try {
            amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, file.getInputStream(), metadata));
        }catch (IOException e){
            log.error("error at AmazonS3Manager uploadFile : {}", (Object) e.getStackTrace());
        }

        return amazonS3Client.getUrl(bucket, fileName).toString();
    }

}
