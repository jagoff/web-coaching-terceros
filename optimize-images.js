const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminWebp = require('imagemin-webp');
const path = require('path');

(async () => {
  try {
    console.log('🚀 Optimizing images...');
    
    // Optimize JPEG files
    const jpegFiles = await imagemin(['public/images/*.jpeg', 'public/img/*.jpeg'], {
      destination: 'public/optimized',
      plugins: [
        imageminMozjpeg.default({ quality: 80, progressive: true })
      ]
    });
    
    console.log('✅ JPEG optimization complete:', jpegFiles.length, 'files');
    
    // Convert to WebP
    const webpFiles = await imagemin(['public/images/*.jpeg', 'public/img/*.jpeg'], {
      destination: 'public/webp',
      plugins: [
        imageminWebp.default({ quality: 75 })
      ]
    });
    
    console.log('✅ WebP conversion complete:', webpFiles.length, 'files');
    
    // Show file sizes
    console.log('\n📊 Optimization Results:');
    jpegFiles.forEach((file, index) => {
      const originalPath = file.sourcePath;
      const optimizedPath = path.join('public/optimized', path.basename(originalPath));
      console.log(`${index + 1}. ${path.basename(originalPath)} -> optimized`);
    });
    
    console.log(`\n🎉 Image optimization complete!`);
    
  } catch (error) {
    console.error('❌ Error optimizing images:', error);
  }
})();
