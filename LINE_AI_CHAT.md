# LINE AI 文字聊天

目前支援 LINE 官方帳號的一對一文字訊息，沿用 `OPEN_AI_KEY`，不提供資料庫查詢或外部操作工具。群組與聊天室訊息不進入個人對話。

## 使用者與對話

- 既有 `UserSetting.channels` 中 `type: line` 的 `token` 就是 LINE 使用者 ID。一對一聊天依此尋找既有使用者，不使用顯示名稱識別。
- 新使用者以 `line:<LINE userId>` 作為 account。既有帳號不改名、不搬移資料。
- 新增 `LineConversation` collection，以唯一 `lineUserId` 分隔對話；保存最近 20 則訊息（最多 10 輪），並提供給下一次 AI 請求。
- LINE ID 由 server 讀取已驗證 webhook 的 `source.userId`，不接受 AI 或對話文字指定身分。
- 對話會存入 Mongo 並送給 OpenAI 產生回覆；不會將其他使用者的歷史加入請求。

## 設定與啟用

1. 設定 `MONGODB_URI`、`OPEN_AI_KEY`、`LINE_CHANNEL_SECRET`、`LINE_CHANNEL_ACCESS_TOKEN`。
2. 可選擇設定 `LINE_AI_MODEL`，預設沿用專案既有的 `gpt-4o-mini`。
3. 執行 `npm run build`，以 `npm start` 啟動，並部署至 LINE 可連線的 HTTPS 網址。
4. 在 LINE Developers 設定 Webhook URL：`https://<server>/line/message/callback`，並開啟 Use webhook。Verify 送出空 events 時應正常回應。
5. 若 LINE Official Account Manager 已設定會重複回覆的自動回應，請關閉該設定。
6. 私訊 Bot「我叫小明」，再問「我叫什麼名字？」；另一個 LINE 帳號的對話不應包含小明的上下文。

簽章以原始 request body 驗證，包括 development 環境；手動 HTTP 測試也必須產生正確簽章。反向代理不可改寫 JSON body。

## 目前執行限制

- 此版本在 webhook 請求內等待回覆；OpenAI 請求 timeout 為 20 秒且不自動重試。同一使用者的訊息在單一 Node 程序內依序處理。
- 這是單一 server instance 的初版。多副本部署、長時間任務與大量訊息需要改用持久化 queue 與跨程序鎖；目前等待過久可能導致 webhook 或 reply token 超時。
- 最近 100 個成功保存的事件 ID 用於避免 webhook 重送再次呼叫 AI。資料先保存、再傳送 LINE 回覆；若傳送失敗，該事件不會自動重送回覆，使用者需再發訊息。
- 此次未實作永久聊天封存、重設對話、每人用量限制、群組權限或 Rich Menu。

## 驗證

```powershell
node_modules\.bin\tsc.cmd --noEmit
node_modules\.bin\jest.cmd --runInBand service.test/lineAIChatService.test.ts utility.test/lineSignature.test.ts
```

測試使用 mock，不會連接 Mongo、OpenAI 或 LINE。
