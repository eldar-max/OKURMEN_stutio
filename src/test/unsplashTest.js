// Тестовый скрипт для проверки Unsplash Service
import { 
  getRandomImage, 
  getImageCollection, 
  getTeamPortraits, 
  getClassroomImages,
  cacheImage,
  getCachedImage 
} from '../services/unsplashService.js';

console.log('🧪 Testing Unsplash Service...\n');

// Test 1: Random Image
console.log('Test 1: Getting random education image...');
getRandomImage('education', { width: 800, height: 600 })
  .then(url => {
    console.log('✅ Success:', url);
  })
  .catch(err => {
    console.error('❌ Error:', err);
  });

// Test 2: Image Collection
console.log('\nTest 2: Getting collection of 5 office images...');
getImageCollection('office', 5)
  .then(urls => {
    console.log('✅ Success: Received', urls.length, 'images');
    urls.forEach((url, i) => console.log(`  ${i + 1}. ${url}`));
  })
  .catch(err => {
    console.error('❌ Error:', err);
  });

// Test 3: Team Portraits
console.log('\nTest 3: Getting 21 team portraits...');
getTeamPortraits(21)
  .then(urls => {
    console.log('✅ Success: Received', urls.length, 'portraits');
  })
  .catch(err => {
    console.error('❌ Error:', err);
  });

// Test 4: Classroom Images
console.log('\nTest 4: Getting 4 classroom images...');
getClassroomImages(4)
  .then(urls => {
    console.log('✅ Success: Received', urls.length, 'classroom images');
  })
  .catch(err => {
    console.error('❌ Error:', err);
  });

// Test 5: Caching
console.log('\nTest 5: Testing cache functionality...');
const testUrl = 'https://images.unsplash.com/test-image';
cacheImage('test_key', testUrl);
const cached = getCachedImage('test_key');
if (cached === testUrl) {
  console.log('✅ Cache works correctly');
} else {
  console.error('❌ Cache failed');
}

console.log('\n✨ All tests completed!\n');
console.log('📝 Note: Images are loaded via Unsplash Source (fallback) without API key.');
console.log('To use full API, add VITE_UNSPLASH_ACCESS_KEY to .env file.\n');
