import { message as antMessage } from 'ant-design-vue';

export const message = antMessage;

export const showSuccess = (content: string) => antMessage.success(content);
export const showError = (content: string) => antMessage.error(content);
export const showWarning = (content: string) => antMessage.warning(content);
export const showInfo = (content: string) => antMessage.info(content);
