# STEP 1
# 1
FROM node:18-alpine AS builder
# 2
WORKDIR /app
# 3
COPY . .
# 4
RUN yarn
# 5
RUN yarn build

# STEP 2
#6
FROM node:18-alpine
#7
WORKDIR /app
#8
COPY --from=builder /app ./
#9
CMD ["yarn","start:dev"]