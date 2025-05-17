#!/bin/bash

# Nome do seu canal/radio
RADIO_NAME="MAPIM Web Rádio"

# Link do streaming de áudio ao vivo
AUDIO_URL="https://stream.zeno.fm/7wbprc3ce4qvv"

# Link da imagem fixa (pode ser hospedada em qualquer lugar)
IMAGE_URL="https://mapim.home.blog/wp-content/uploads/2025/05/dizzer1200-web.png?w=948"

# Chave de transmissão do YouTube (substitua pela sua chave real)
YOUTUBE_STREAM_KEY="fs56-ztuy-kuz9-pzgq-amqk"

# Comando completo do FFmpeg
ffmpeg -re -i "$AUDIO_URL" \
-loop 1 -i "$IMAGE_URL" \
-vf "scale=1280:720" \
-c:v libx264 -preset ultrafast -b:v 1000k -pix_fmt yuv420p \
-c:a aac -b:a 96k -ar 44100 \
-shortest -f flv "rtmp://a.rtmp.youtube.com/live2/$YOUTUBE_STREAM_KEY"
