// import { LineTokenModel } from '../model/lineToken';
// import { UserSettingModel, Level } from '../model/UserSetting';

// async function migrateUser(channel: string) {
//   const old = await LineTokenModel.findOne({ channel });

//   if (!old) {
//     console.log(`[X] 找不到 channel: ${channel}`);
//     return;
//   }

//   const messageLevel = mapLevel(old.tokenLevel || []);

//   const update: any = {
//     account: old.channel,
//     verifyCode: old.verifyCode,
//     verifyCodeExpires: old.verifyCodeExpires,
//     favoritePosts: old.favoritePosts || [],
//     keywords: old.keywords || [],
//     line: {
//       enabled: old.notifyEnabled,
//       isGroup: false,
//       pushKey: old.token, // LINE Notify token
//       name: null,
//       messageLevel,
//       channelType: 'notify',
//     },
//   };

//   if (old.tgChatId) {
//     update.telegram = {
//       enabled: true,
//       pushKey: old.tgChatId,
//       name: old.tgUserName || null,
//       messageLevel: Level.Standard,
//     };
//   }

//   await UserSettingModel.findOneAndUpdate(
//     { account: old.channel },
//     { $set: update },
//     { upsert: true, new: true, setDefaultsOnInsert: true }
//   );

//   console.log(`[✓] 轉換完成: ${channel}`);
// }

// function mapLevel(levels: string[]): Level {
//   if (levels.includes('premium')) return Level.Premium;
//   if (levels.includes('standard')) return Level.Standard;
//   if (levels.includes('test')) return Level.Test;
//   return Level.Basic;
// }

// export { migrateUser };
