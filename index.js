const fs = require('fs');
const sharp = require('sharp');

// Lê a pasta "images"
fs.readdir('images', (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  // Para cada arquivo na pasta "images"
  files.forEach(file => {
    // Lê a imagem da pasta "images"
    sharp('images/' + file)
      // Ajusta o tamanho da imagem para 1900x1080 pixels
      .resize(1900, 1080, {
        fit: sharp.fit.contain,
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      // Coloca a imagem da pasta "images" na frente da imagem "fundo.png"
      .composite([{ input: 'fundo.png', gravity: 'center' }, { input: 'images/' + file, gravity: 'center' }])
      // Salva a imagem editada na pasta "pront" com o mesmo nome do arquivo original
      .toFile('pront/' + file, (err, info) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`Arquivo ${file} salvo com sucesso!`);
        }
      });
  });
});
