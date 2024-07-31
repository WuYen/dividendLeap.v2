# 第一階段：構建階段
FROM node:18 AS build

WORKDIR /usr/src/app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝依賴
RUN npm install

# 複製所有源代碼到工作目錄
COPY . .

# 編譯 TypeScript
RUN npm run build

# 第二階段：運行階段
FROM node:18

WORKDIR /usr/src/app

# 從構建階段複製編譯好的文件
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package*.json ./

# 安裝生產依賴（如果有需要，可以包括生產模式下的依賴安裝）
RUN npm install --only=production

# 暴露應用運行的端口
EXPOSE 3000

# 啟動應用
CMD ["node", "dist/app.js"]
