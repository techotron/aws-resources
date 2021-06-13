# build stage
FROM golang:1.16-alpine AS build-env
RUN apk --no-cache add build-base git gcc
ADD . /src
RUN cd /src && go build -o backend

# final stage
FROM alpine
WORKDIR /app
RUN apk add bash
COPY --from=build-env /src/backend /app/
ENTRYPOINT ./backend
