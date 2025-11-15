"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiAssistantController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const ai_assistant_service_1 = require("./ai-assistant.service");
const send_message_dto_1 = require("./dto/send-message.dto");
let AiAssistantController = class AiAssistantController {
    constructor(aiAssistantService) {
        this.aiAssistantService = aiAssistantService;
    }
    async sendMessage(req, dto) {
        return this.aiAssistantService.sendMessage(req.user.userId, dto);
    }
    async getSessions(req) {
        return this.aiAssistantService.getSessions(req.user.userId);
    }
    async getSession(req, id) {
        return this.aiAssistantService.getSession(req.user.userId, +id);
    }
    async deleteSession(req, id) {
        await this.aiAssistantService.deleteSession(req.user.userId, +id);
    }
};
exports.AiAssistantController = AiAssistantController;
__decorate([
    (0, common_1.Post)('message'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, send_message_dto_1.SendMessageDto]),
    __metadata("design:returntype", Promise)
], AiAssistantController.prototype, "sendMessage", null);
__decorate([
    (0, common_1.Get)('sessions'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AiAssistantController.prototype, "getSessions", null);
__decorate([
    (0, common_1.Get)('sessions/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AiAssistantController.prototype, "getSession", null);
__decorate([
    (0, common_1.Delete)('sessions/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AiAssistantController.prototype, "deleteSession", null);
exports.AiAssistantController = AiAssistantController = __decorate([
    (0, common_1.Controller)('ai-assistant'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [ai_assistant_service_1.AiAssistantService])
], AiAssistantController);
//# sourceMappingURL=ai-assistant.controller.js.map