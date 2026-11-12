import { HandledBy } from '../../../modules/interactions/enums/HandledBy.enum';
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
		interactionDate: 'Ngày tương tác',
		customer: 'Khách hàng',
		plan: 'Kế hoạch',
		dueDate: 'Hạn chót',
		contactReason: 'Lý do liên hệ',
		contactResult: 'Kết quả liên hệ',
		csat: 'CSAT',
		ratedAt: 'Thời điểm đánh giá',
		handledBy: 'Xử lý bởi',
		firstResponse: 'Phản hồi đầu tiên',
		messages: 'Tin nhắn',
		skipReason: 'Lý do bỏ qua',
		skippedBy: 'Người bỏ qua',
		skippedAt: 'Thời điểm bỏ qua',
		handledByTypes: {
			[HandledBy.Agent]: 'Tổng đài viên',
			[HandledBy.Bot]: 'Bot',
			[HandledBy.Ivr]: 'IVR',
		},
		interactionTypes: {
			[InteractionType.Call]: ({ linked }) =>
				linked('objects.interactionType.call'),
			[InteractionType.Chat]: ({ linked }) =>
				linked('objects.interactionType.chat'),
			[InteractionType.Email]: ({ linked }) =>
				linked('objects.interactionType.email'),
		},
		searchModes: {
			[SearchMode.Search]: 'Tìm kiếm thông thường',
			[SearchMode.Fts]: 'Tìm kiếm toàn văn bản',
			[SearchMode.Description]: 'Bình luận của tác vụ',
		},
	},
	startPage: {
		scorecards: {
			text: 'Tạo phiếu chấm điểm, đặt trọng số tiêu chí và nhóm câu hỏi.',
		},
	},
	objects: {
		criterion: 'Tiêu chí | Các tiêu chí',
	},
};
