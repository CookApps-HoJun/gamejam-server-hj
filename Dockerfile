FROM node:18-alpine

# /app 디렉터리를 WORKDIR로 설정
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

# 실행할 명령어
CMD ["yarn", "start:dev"]