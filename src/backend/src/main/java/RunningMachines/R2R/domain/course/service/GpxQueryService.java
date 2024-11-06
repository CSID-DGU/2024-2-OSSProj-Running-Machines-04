package RunningMachines.R2R.domain.course.service;

import RunningMachines.R2R.domain.course.dto.GpxResponseDto;
import RunningMachines.R2R.global.exception.CustomException;
import RunningMachines.R2R.global.exception.ErrorCode;
import RunningMachines.R2R.global.s3.S3Provider;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.InputStream;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import lombok.RequiredArgsConstructor;

@Slf4j
@Service
@RequiredArgsConstructor
public class GpxQueryService {

    private final S3Provider s3Provider;

    public List<GpxResponseDto> parseGpxs(double latitude, double longitude) {
        List<GpxResponseDto> gpxResponses = new ArrayList<>();

        try {
            // S3에서 모든 GPX 파일 가져오기
            List<String> fileKeys = s3Provider.getCourseFiles();
            log.info("총 {}개의 파일을 가져왔습니다.", fileKeys.size());

            // GPX파일을 모두 열어 파싱
            for (String fileKey : fileKeys) {
                List<String> waypoints = new ArrayList<>();
                String fileName = "";

                try {
                    URL url = s3Provider.getFileUrl(fileKey); // S3에서 각 파일 URL 가져오기
//                    log.info("URL 가져오기 성공: {}", url);

                    InputStream inputStream = url.openStream(); // S3에서 가져온 파일을 InputStream으로 읽음

                    // 파일명을 원본 파일명으로 변환
                    fileName = s3Provider.getOriginalFileName(fileKey);
//                    log.info("원래 파일명: {}", fileName);

                    // XML 파싱
                    DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
                    DocumentBuilder builder = factory.newDocumentBuilder();
                    Document document = builder.parse(inputStream);
                    document.getDocumentElement().normalize(); // XML 파싱 중 트리 구조를 정상화

                    // GPX 파일 내의 <trkpt> 태그(웨이포인트) 목록 추출
                    NodeList nodeList = document.getElementsByTagName("trkpt");
                    for (int i = 0; i < nodeList.getLength(); i++) {
                        // 각 웨이포인트의 위경도 추출해 리스트에 추가
                        String lat = nodeList.item(i).getAttributes().getNamedItem("lat").getNodeValue();
                        String lon = nodeList.item(i).getAttributes().getNamedItem("lon").getNodeValue();
                        waypoints.add("Lat: " + lat + ", Lon: " + lon);
                    }

                    inputStream.close();
                } catch (Exception e) {
                    log.error("파일 파싱 중 오류 발생 - 파일 키: {}, 오류: {}", fileKey, e.getMessage(), e);
                    continue; // 특정 파일 파싱 중 오류가 발생하면 그 파일을 건너뜀
                }
                gpxResponses.add(new GpxResponseDto(fileName, waypoints));
            }
        } catch (Exception e) {
            log.error("GPX 파일 목록을 가져오는 중 오류 발생: {}", e.getMessage(), e);
            throw new CustomException(ErrorCode.GPX_PARSING_FAILED);
        }

        return gpxResponses;
    }
}
