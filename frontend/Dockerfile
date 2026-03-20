FROM node:24-alpine AS builder
LABEL authors="Felipe Oliveira"

WORKDIR /app

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

COPY package*.json ./

RUN --mount=type=cache,target=/root/.npm \
    npm install --force

COPY . .
RUN npm run build

FROM builder AS runner

RUN --mount=type=cache,target=/root/.npm \
    npm install -g serve --force

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
