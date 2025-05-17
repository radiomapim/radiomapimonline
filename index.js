const { spawn } = require('child_process');

const audioURL = 'https://stream.zeno.fm/7wbprc3ce4qvv';
const logoFile = 'https://mapim.home.blog/wp-content/uploads/2025/05/dizzer1200-web.png?w=948';
const streamKey = 'fs56-ztuy-kuz9-pzgq-amqk'; // SUA CHAVE AQUI

const ffmpegArgs = [
  '-re', '-i', audioURL,
  '-loop', '1', '-i', logoFile,
  '-filter_complex', '[1:v]scale=1280:720[bg];[bg][0:a]overlay=format=auto',
  '-c:v', 'libx264', '-preset', 'ultrafast', '-b:v', '1000k',
  '-pix_fmt', 'yuv420p',
  '-c:a', 'aac', '-b:a', '96k', '-ar', '44100',
  '-f', 'flv', `rtmp://a.rtmp.youtube.com/live2/${streamKey}`
];

const ffmpeg = spawn('ffmpeg', ffmpegArgs);

ffmpeg.stdout.on('data', data => {
  console.log(`FFmpeg stdout: ${data}`);
});

ffmpeg.stderr.on('data', data => {
  console.error(`FFmpeg stderr: ${data}`);
});

ffmpeg.on('close', code => {
  console.log(`FFmpeg exited with code ${code}`);
});
