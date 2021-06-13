# Build environment
FROM node:14.15.1-stretch as build-env
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./

RUN npm ci
COPY . ./

RUN npm run build

# Live environment
FROM nginx:stable-alpine as live-env
WORKDIR /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-env /app/build /usr/share/nginx/html
COPY env.sh .
COPY .env .
RUN apk add --no-cache bash
EXPOSE 8080
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]

