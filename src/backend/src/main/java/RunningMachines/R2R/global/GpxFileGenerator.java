package RunningMachines.R2R.global;

import RunningMachines.R2R.domain.course.dto.UserCourseRequestDto;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.time.Instant;
import java.time.format.DateTimeFormatter;
import javax.xml.stream.XMLOutputFactory;
import javax.xml.stream.XMLStreamWriter;
import java.util.List;

public class GpxFileGenerator {

    public static InputStream createGpxFile(List<UserCourseRequestDto.Waypoint> waypoints) throws Exception {
        // 메모리 내에서 데이터 흐름을 생성하여 XML 데이터를 일시적으로 저장
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        // XMLStreamWriter 사용해 XML 문서 쓰기 위한 준비
        XMLOutputFactory xmlOutputFactory = XMLOutputFactory.newInstance();
        XMLStreamWriter writer = xmlOutputFactory.createXMLStreamWriter(outputStream, "UTF-8");

        // XML 문서 시작
        writer.writeStartDocument("UTF-8", "1.0");
        writer.writeStartElement("gpx");
        writer.writeAttribute("version", "1.1");
        writer.writeAttribute("creator", "RunningMachines");

        // 트랙 정보 생성
        writer.writeStartElement("trk"); // 트랙
        writer.writeStartElement("trkseg"); // 트랙의 각 구 (여러 웨이포인트로 구성)

        DateTimeFormatter formatter = DateTimeFormatter.ISO_INSTANT; // 타임스탬프 형식 지정(yyyy-MM-dd'T'HH:mm:ss'Z')
        for (UserCourseRequestDto.Waypoint waypoint : waypoints) {
            // 웨이포인트 추가
            writer.writeStartElement("trkpt");
            writer.writeAttribute("lat", Double.toString(waypoint.getLat()));
            writer.writeAttribute("lon", Double.toString(waypoint.getLon()));

            // 타임스탬프 추가
            writer.writeStartElement("time");
            writer.writeCharacters(Instant.parse(waypoint.getTimestamp()).toString());
            writer.writeEndElement(); // time

            writer.writeEndElement(); // trkpt
        }

        writer.writeEndElement(); // trkseg
        writer.writeEndElement(); // trk
        writer.writeEndElement(); // gpx

        // 스트림 저장 및 해제
        writer.flush();
        writer.close();

        return new ByteArrayInputStream(outputStream.toByteArray());
    }
}
