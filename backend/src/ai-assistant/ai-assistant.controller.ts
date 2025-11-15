import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AiAssistantService } from './ai-assistant.service';
import { SendMessageDto } from './dto/send-message.dto';

@Controller('ai-assistant')
@UseGuards(JwtAuthGuard)
export class AiAssistantController {
  constructor(private readonly aiAssistantService: AiAssistantService) {}

  @Post('message')
  @HttpCode(HttpStatus.CREATED)
  async sendMessage(@Req() req, @Body() dto: SendMessageDto) {
    return this.aiAssistantService.sendMessage(req.user.userId, dto);
  }

  @Get('sessions')
  async getSessions(@Req() req) {
    return this.aiAssistantService.getSessions(req.user.userId);
  }

  @Get('sessions/:id')
  async getSession(@Req() req, @Param('id') id: string) {
    return this.aiAssistantService.getSession(req.user.userId, +id);
  }

  @Delete('sessions/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteSession(@Req() req, @Param('id') id: string) {
    await this.aiAssistantService.deleteSession(req.user.userId, +id);
  }
}
