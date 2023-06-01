#!/bin/sh
response=$(curl --location --request POST 'http://host.docker.internal:8000/user/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "user": {
        "email" : "admin@admin.com",
        "password" : "admin"
    }
}')

admin_token=$(echo "$response" | jq -r '.user.access_token')

# Define the product data
product1='{"name": "Violin", "price": 499.99, "photo": "violin.jpg", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "quantity": 7}'
product2='{"name": "Drums", "price": 699.99, "photo": "drums.jpg", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "quantity": 3}'
product3='{"name": "Saxophone", "price": 599.99, "photo": "saxophone.jpg", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "quantity": 5}'


product1='{"name": "Violin", "price": 499.99, "photo": "violin.jpg", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "quantity": 7}'
product2='{"name": "Saxophone", "price": 599.99, "photo": "saxophone.jpg", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "quantity": 5}'
product3='{"name": "Drums", "price": 699.99, "photo": "drums.jpg", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "quantity": 3}'
product4='{"name": "Trumpet", "price": 299.99, "photo": "trumpet.jpg", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "quantity": 2}'
product5='{"name": "Flute", "price": 199.99, "photo": "flute.jpg", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "quantity": 10}'
product6='{"name": "Cello", "price": 799.99, "photo": "cello.jpg", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "quantity": 8}'
product7='{"name": "Keyboard", "price": 399.99, "photo": "keyboard.jpg", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "quantity": 15}'
product8='{"name": "Trombone", "price": 499.99, "photo": "trombone.jpg", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "quantity": 4}'
product9='{"name": "Harp", "price": 999.99, "photo": "harp.jpg", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "quantity": 6}'
product10='{"name": "Accordion", "price": 799.99, "photo": "accordion.jpg", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "quantity": 12}'
product11='{"name": "Xylophone", "price": 199.99, "photo": "xylophone.jpg", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "quantity": 3}'
product12='{"name": "Banjo", "price": 349.99, "photo": "banjo.jpg", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "quantity": 9}'
product13='{"name": "Bagpipes", "price": 599.99, "photo": "bagpipes.jpg", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "quantity": 5}'
product14='{"name": "Harmonica", "price": 49.99, "photo": "harmonica.jpg", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "quantity": 20}'
product15='{"name": "Oboe", "price": 499.99, "photo": "oboe.jpg", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "quantity": 3}'
product16='{"name": "Bass Guitar", "price": 399.99, "photo": "bass-guitar.jpg", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "quantity": 5}'
product17='{"name": "Ukulele", "price": 99.99, "photo": "ukulele.jpg", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "quantity": 8}'
product18='{"name": "Mandolin", "price": 299.99, "photo": "mandolin.jpg", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "quantity": 10}'
product19='{"name": "Triangle", "price": 9.99, "photo": "triangle.jpg", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "quantity": 4}'

url='http://host.docker.internal:8000/product'
echo "$admin_token"

curl -X POST \
  -H "Authorization: Bearer $admin_token" \
  -H "Content-Type: application/json" \
  -d '{"product":'"$product1"'}' \
  "$url"

curl -X POST \
  -H "Authorization: Bearer $admin_token" \
  -H "Content-Type: application/json" \
  -d '{"product":'"$product2"'}' \
  "$url"

curl -X POST \
  -H "Authorization: Bearer $admin_token" \
  -H "Content-Type: application/json" \
  -d '{"product":'"$product3"'}' \
  "$url"

curl -X POST \
  -H "Authorization: Bearer $admin_token" \
  -H "Content-Type: application/json" \
  -d '{"product":'"$product4"'}' \
  "$url"

curl -X POST \
  -H "Authorization: Bearer $admin_token" \
  -H "Content-Type: application/json" \
  -d '{"product":'"$product5"'}' \
  "$url"

curl -X POST \
  -H "Authorization: Bearer $admin_token" \
  -H "Content-Type: application/json" \
  -d '{"product":'"$product6"'}' \
  "$url"

curl -X POST \
  -H "Authorization: Bearer $admin_token" \
  -H "Content-Type: application/json" \
  -d '{"product":'"$product7"'}' \
  "$url"

curl -X POST \
  -H "Authorization: Bearer $admin_token" \
  -H "Content-Type: application/json" \
  -d '{"product":'"$product8"'}' \
  "$url"

curl -X POST \
  -H "Authorization: Bearer $admin_token" \
  -H "Content-Type: application/json" \
  -d '{"product":'"$product9"'}' \
  "$url"

curl -X POST \
  -H "Authorization: Bearer $admin_token" \
  -H "Content-Type: application/json" \
  -d '{"product":'"$product10"'}' \
  "$url"

curl -X POST \
  -H "Authorization: Bearer $admin_token" \
  -H "Content-Type: application/json" \
  -d '{"product":'"$product11"'}' \
  "$url"

curl -X POST \
  -H "Authorization: Bearer $admin_token" \
  -H "Content-Type: application/json" \
  -d '{"product":'"$product12"'}' \
  "$url"

curl -X POST \
  -H "Authorization: Bearer $admin_token" \
  -H "Content-Type: application/json" \
  -d '{"product":'"$product13"'}' \
  "$url"

curl -X POST \
  -H "Authorization: Bearer $admin_token" \
  -H "Content-Type: application/json" \
  -d '{"product":'"$product14"'}' \
  "$url"

curl -X POST \
  -H "Authorization: Bearer $admin_token" \
  -H "Content-Type: application/json" \
  -d '{"product":'"$product15"'}' \
  "$url"

curl -X POST \
  -H "Authorization: Bearer $admin_token" \
  -H "Content-Type: application/json" \
  -d '{"product":'"$product16"'}' \
  "$url"

curl -X POST \
  -H "Authorization: Bearer $admin_token" \
  -H "Content-Type: application/json" \
  -d '{"product":'"$product17"'}' \
  "$url"

curl -X POST \
  -H "Authorization: Bearer $admin_token" \
  -H "Content-Type: application/json" \
  -d '{"product":'"$product18"'}' \
  "$url"

curl -X POST \
  -H "Authorization: Bearer $admin_token" \
  -H "Content-Type: application/json" \
  -d '{"product":'"$product19"'}' \
  "$url"

