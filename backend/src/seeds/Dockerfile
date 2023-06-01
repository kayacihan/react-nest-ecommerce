FROM alpine:latest

RUN apk update && apk add --no-cache curl jq

COPY create_products.sh /create_products.sh
RUN chmod +x /create_products.sh
CMD ["/bin/sh", "/create_products.sh"]
