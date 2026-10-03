# OKURMEN Changelog

## [1.5.0] - 2026-09-24

### ✨ Added - Unsplash API Integration
- **Professional Images**: Integrated Unsplash API for high-quality professional images across the site
- **Unsplash Service** (`src/services/unsplashService.js`):
  - Dynamic image loading from Unsplash API
  - Smart fallback to Unsplash Source without API key
  - Image caching in localStorage (24h TTL)
  - Predefined categories for different sections
  
### 🎨 Updated Components

#### Hero Section
- Added professional background image from Unsplash
- Categories: `education, technology, students, learning`
- Dynamic loading with gradient overlay
- Cached for improved performance

#### Team Section  
- **21 professional portrait photos** for all team members
- Categories: `professional, portrait, business`
- Automatic distribution across all team categories
- Fallback to person icons if images fail to load

#### OurClassrooms Section
- **4 professional classroom/office images**
- Categories: `modern, classroom, office, tech, coworking`
- Interactive hover effects with scale animation
- Gradient overlays for better text readability

#### AboutUs Section
- Team success/collaboration image in story section
- Categories: `team, collaboration, success, office`
- Integrated with company statistics grid

### 📝 Documentation
- Created `UNSPLASH_INTEGRATION.md` with comprehensive integration guide
- Added `.env.example` for API key configuration
- Created test script `src/test/unsplashTest.js`

### 🔧 Configuration
- Added `VITE_UNSPLASH_ACCESS_KEY` environment variable
- Configured caching strategy (24 hours)
- Set up fallback mechanism for offline/no-API scenarios

### 🚀 Performance
- Implemented lazy loading for all images
- localStorage caching reduces API calls
- Optimized image sizes per section (Hero: 1200x800, Team: 600x600, etc.)
- Fallback images ensure site always works

---

## [1.4.0] - 2026-09-23

### Added - Teacher Dashboard Grading System
- Teachers can grade students (grades 2-5)
- Dynamic progress updates based on grades:
  - Grade 5: +10% progress
  - Grade 4: +5% progress
  - Grade 3: -3% progress
  - Grade 2: -5% progress
- Progress capped between 0-100%
- Fixed `gradeData` state error in TeacherDashboard

### Removed
- Pricing section completely removed from site
- Google Maps iframe removed from Contact section

### Added - TeacherRating Section
- New section explaining grading system
- Professional React Icons (FaChalkboardTeacher, FaTasks, FaChartLine, FaMedal)
- Replaces removed Pricing section

---

## [1.3.0] - 2026-09-22

### Updated
- Mobile responsive optimization with professional utilities
- Replaced all emoji icons with React Icons:
  - FaLightbulb, FaRocket, FaHandshake, FaDollarSign
  - FaTv, FaYoutube, FaMapPin
- Updated YouTube video: `nR7XkTWi9tM`
- CSS fixes: `justify-center` → `justify-content: center`

---

## [1.2.0] - 2026-09-21

### Added - Language System
- Multi-language support: Kyrgyz (KG), Russian (RU), English (EN)
- **Default language: Kyrgyz** (KG)
- LanguageContext with language switcher
- All sections translated to 3 languages

### Added - Team Structure
- 21 team members with photos and roles
- Categories: Founders, Mentors, Trainers, Sales, Management
- Team data file with full information
- Modal details for each team member

---

## [1.1.0] - 2026-09-20

### Added - Additional Sections
- Stats section with counters
- FAQ section with collapsible questions
- HowItWorks section with process steps
- Partners section with logos
- Contact form with validation
- MobileApp promotional section
- VideoSection with YouTube integration

---

## [1.0.0] - 2022

### Initial Release
- Landing page with 20+ sections
- Firebase backend integration
- Vercel deployment: https://okurmen-swart.vercel.app
- GitHub repository: eldar-max/OKURMEN_stutio
- Orange theme with gradient designs
- Hybrid learning platform (Online + Mentor support)

---

## Legend
- ✨ Added - New features
- 🎨 Updated - Design/UI changes
- 🔧 Configuration - Setup changes
- 📝 Documentation - Docs updates
- 🐛 Fixed - Bug fixes
- 🚀 Performance - Performance improvements
- ❌ Removed - Removed features
