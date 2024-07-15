import { ILineToken, TokenLevel } from '../model/lineToken';
import config from '../utility/config';
import lineService from './lineService';
import { NotifyEnvelop, notifyQueue } from './notifyQueueService';

export async function sendPremiumInvitation(channel: string, channels: string): Promise<void> {
  try {
    const tokenInfos: ILineToken[] | null = await lineService.retrieveUserLineToken(channel, channels);

    if (!tokenInfos || tokenInfos.length === 0) {
      console.log('No token information found.');
      return;
    }

    for (const tokenInfo of tokenInfos) {
      if (tokenInfo.tokenLevel.includes(TokenLevel.Premium)) {
        const invitationMessage = buildInvitationMessage(tokenInfo.channel);
        notifyQueue.push({ user: tokenInfo, payload: { content: invitationMessage } } as NotifyEnvelop);
      }
    }
  } catch (error) {
    console.error('Error in sendPremiumInvitation:', error);
    throw error;
  }
}

function buildInvitationMessage(channelId: string): string {
  const baseContent = [''];
  baseContent.push(`Hi ${channelId}`);
  baseContent.push('邀請使用新功能');
  baseContent.push('祝您使用愉快！');
  baseContent.push(`${config.CLIENT_URL}/my`);
  return baseContent.join('\n');
}
