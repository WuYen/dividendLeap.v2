import axios from 'axios';
import { IPostInfo } from '../model/PostInfo';

export async function sendPushNotification(post: IPostInfo, tokens: string[]) {
  const expoPushMessages = tokens.map((token) => {
    if (!/^ExponentPushToken\[\w+\]$/.test(token)) {
      throw new Error(`無效的 token: ${token}`);
    }

    return {
      to: token,
      sound: 'default',
      title: `[${post.tag}] ${post.title}`,
      body: `作者：${post.author}｜時間：${post.date}`,
      data: { post },
    };
  });

  const response = await axios.post('https://exp.host/--/api/v2/push/send', expoPushMessages, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data;
}
