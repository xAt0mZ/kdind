ARG DOCKER_VERSION=latest
ARG KIND_VERSION=latest

# create an "alias" because COPY --from does not support expanding variables
FROM docker:${DOCKER_VERSION} AS docker

FROM alpine:latest AS kind
ARG KIND_VERSION
RUN apk add --no-cache curl
RUN curl -Lo /tmp/kind https://kind.sigs.k8s.io/dl/${KIND_VERSION}/kind-linux-amd64
RUN chmod +x /tmp/kind

# build api
FROM golang:latest AS api-builder
RUN mkdir -p /app/build
ADD ./api /app/
WORKDIR /app
RUN go mod download
RUN go build -o build ./...

FROM node:latest AS app-builder
RUN mkdir /app/
ADD ./app /app/
WORKDIR /app
RUN ls -l
RUN yarn
RUN yarn build

FROM alpine:latest
COPY --from=docker /usr/local/bin/docker /usr/local/bin/
COPY --from=kind /tmp/kind /usr/local/bin/
COPY --from=api-builder /app/build/kdind /app/
COPY --from=app-builder /app/build /app/static
RUN ls -lR /app
CMD ["/app/kdind"]