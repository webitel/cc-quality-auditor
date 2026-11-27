import { ChannelType, InteractionStatus } from '@webitel/api-services/enums';

import { EvaluationCardTab } from '../../../modules/evaluation-card/enums/EvaluationCardTab.enum';
import { InteractionType } from '../../../modules/interactions/enums/InteractionType.enum';
import { SearchMode } from '../../../modules/interactions/enums/SearchMode.enum';

export default {
	audit: 'Kiểm toán',
	scorecards: {
		scorecards: 'Phiếu chấm điểm | Các phiếu chấm điểm',
		emptyWorkspace: 'Chưa có phiếu chấm điểm nào',
		usedScorecardCantEdit:
			'Phiếu chấm điểm này đã có đánh giá và không thể chỉnh sửa. Hãy mở phiếu và dùng LƯU NHƯ để tạo bản sao.',
		usedScorecardCantDelete:
			'Phiếu chấm điểm này đang được sử dụng và không thể xóa.',
	},
	interactions: {
		allInteractions: 'Tất cả tương tác',
		transcribe: 'Chuyển đổi bản ghi',
		assign: 'Chỉ định',
		assignInteractions: 'Chỉ định tương tác | Chỉ định {n} tương tác',
		me: '(tôi)',
		deleteEvaluations: 'Xóa đánh giá | Xóa {n} đánh giá',
		evaluationsWillBeDeleted:
			'Đánh giá sẽ bị xóa. | Các đánh giá này sẽ bị xóa.',
		interactionReturnsToNotEvaluated:
			'Tương tác trở về trạng thái “Chưa đánh giá”.',
		interactionDate: 'Ngày tương tác',
		customer: 'Khách hàng',
		plan: 'Kế hoạch',
		contactReason: 'Lý do liên hệ',
		contactResult: 'Kết quả liên hệ',
		csat: 'CSAT',
		skipReason: 'Lý do bỏ qua',
		interactionTypes: {
			[InteractionType[ChannelType.Call]]: ({ linked }) =>
				linked('objects.interactionType.call'),
			[InteractionType[ChannelType.Chat]]: ({ linked }) =>
				linked('objects.interactionType.chat'),
			[InteractionType[ChannelType.Email]]: ({ linked }) =>
				linked('objects.interactionType.email'),
		},
		searchModes: {
			[SearchMode.Search]: 'Tìm kiếm thông thường',
			[SearchMode.Fts]: 'Tìm kiếm toàn văn bản',
			[SearchMode.Description]: 'Bình luận của tác vụ',
		},
	},
	evaluationCard: {
		tabs: {
			[EvaluationCardTab.Conversation]: 'Cuộc hội thoại',
			[EvaluationCardTab.Information]: 'Thông tin',
			[EvaluationCardTab.ScreenRecording]: 'Ghi hình màn hình',
		},
		evaluation: 'Đánh giá',
		skip: {
			action: 'Bỏ qua',
			title: 'Bỏ qua tương tác',
			popupDescription:
				'Tương tác sẽ bị xóa khỏi hàng chờ của bạn và được đánh dấu là đã bỏ qua.',
			reasonPlaceholder: 'Tại sao bạn bỏ qua tương tác này?',
		},
		assignedTo: 'Được giao cho',
		unavailable: {
			[InteractionStatus.Pending]: 'Bạn không thể đánh giá tương tác này',
			[InteractionStatus.Skipped]: 'Tương tác này đã bị bỏ qua',
		},
		date: 'Ngày',
		information: {
			unknown: 'Không xác định',
			postprocessing: 'Xử lý sau',
			empty: 'Chưa có thông tin',
		},
	},
	startPage: {
		interactions: {
			text: 'Tìm kiếm cuộc gọi, cuộc trò chuyện và email, phân công hoặc đánh giá chúng.',
		},
		scorecards: {
			text: 'Tạo phiếu chấm điểm, đặt trọng số tiêu chí và nhóm câu hỏi.',
		},
	},
	objects: {
		criterion: 'Tiêu chí | Các tiêu chí',
	},
};
