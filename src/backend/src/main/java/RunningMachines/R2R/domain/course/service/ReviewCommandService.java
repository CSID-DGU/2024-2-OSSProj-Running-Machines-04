package RunningMachines.R2R.domain.course.service;

import RunningMachines.R2R.domain.course.dto.ReviewRequestDto;
import RunningMachines.R2R.domain.course.dto.ReviewResponseDto;
import RunningMachines.R2R.domain.course.entity.*;
import RunningMachines.R2R.domain.course.repository.ReviewRepository;
import RunningMachines.R2R.domain.course.repository.TagRepository;
import RunningMachines.R2R.domain.course.repository.UserCourseRepository;
import RunningMachines.R2R.domain.user.entity.Elevation;
import RunningMachines.R2R.domain.user.entity.Prefer;
import RunningMachines.R2R.domain.user.entity.User;
import RunningMachines.R2R.domain.user.repository.PreferRepository;
import RunningMachines.R2R.domain.user.repository.UserRepository;
import RunningMachines.R2R.domain.user.service.UserCommandService;
import RunningMachines.R2R.global.exception.CustomException;
import RunningMachines.R2R.global.exception.ErrorCode;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class ReviewCommandService {

    private final ReviewRepository reviewRepository;
    private final TagRepository tagRepository;
    private final UserRepository userRepository;
    private final UserCourseRepository userCourseRepository;
    private final PreferRepository preferRepository;
    private final UserCommandService userCommandService;

    public ReviewResponseDto createReview(String email, Long userCourseId, ReviewRequestDto reviewRequestDto) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        UserCourse userCourse = userCourseRepository.findById(userCourseId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_COURSE_NOT_FOUND));

        Review review = reviewRequestDto.toEntity(user, userCourse);
        reviewRepository.save(review);

        // 리뷰에서 받은 난이도 바탕으로 선호도 업데이트
        Prefer prefer = preferRepository.findByUserId(user.getId())
                .orElseThrow(() -> new CustomException(ErrorCode.PREFER_NOT_FOUND));

        userCommandService.updatePreferElevation(prefer, reviewRequestDto.getDifficulty());
        preferRepository.save(prefer);

        // 리뷰 태그 생성
        for (Long tagId : reviewRequestDto.getTagIds()) {
            Tag tag = tagRepository.findById(tagId)
                    .orElseThrow(() -> new CustomException(ErrorCode.TAG_NOT_FOUND));

            ReviewTag reviewTag = ReviewTag.builder()
                    .tag(tag)
                    .build();

            review.addReviewTag(reviewTag);
        }

        return ReviewResponseDto.from(review);
    }
}
