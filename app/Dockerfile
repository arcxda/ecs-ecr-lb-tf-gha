FROM --platform=linux/amd64 node:18-alpine

RUN ["npm" ,"install", "-g","pnpm"]

COPY package.json /vite-app/
COPY . /vite-app

WORKDIR /vite-app

RUN ["pnpm", "install"]

RUN ["pnpm", "build"]

#CMD ["pnpm", "dev"]


FROM nginx:1.24-alpine as server
COPY --from=builder /vite-app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8000