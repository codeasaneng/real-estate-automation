# BestCity Real Estate Platform - Test Cases

---

## TC-FUNC-001: User Navigation and Routing
**Priority:** High | **Module:** Frontend Navigation

### Steps
1. Open application (http://localhost:3000)
2. Click "Properties" in navigation
3. Click on property card
4. Click "About" in navigation
5. Click "FAQ" in navigation
6. Click "Blog" in navigation
7. Click on a blog post
8. Navigate to invalid URL (/invalid-page)
9. Resize browser to mobile width
10. Click hamburger menu
11. Click navigation links in mobile menu

### Result: **PASS** ✅

---

## TC-FUNC-002: Property Listing and Filtering
**Priority:** High | **Module:** Properties Page

### Steps
1. Navigate to /properties
2. Verify property cards display
3. Click "Filters" button
4. Select "Under $1M" in price range
5. Select "Villa" in property type
6. Enter "Miami" in location search
7. Enter min ROI: 7, max ROI: 10
8. Select "Active" funding status
9. Select "Price: Low to High" sort
10. Click on property card

### Result: **FAIL** ❌

---

## TC-SEC-001: Security - Authentication and Authorization
**Priority:** Critical | **Module:** Backend Authentication & Security

### Steps
1. Review JWT implementation in `server/middlewares/user_actions/auth.js`
2. Check JWT secret in .env
3. Verify if .env in version control
4. Review .gitignore
5. Check frontend token storage
6. Run `npm audit`
7. Review vulnerability report

### Result: **FAIL** ❌

---

## TC-PERF-001: Performance - Page Load and Rendering
**Priority:** High | **Module:** Frontend Performance

### Steps
1. Run `npm run build`
2. Analyze bundle sizes
3. Navigate to home page
4. Measure FCP, LCP, TTI metrics
5. Navigate to /property-3d
6. Monitor CPU and memory usage
7. Test with throttled network (Fast 3G)
8. Use React DevTools Profiler
9. Check for memory leaks

### Result: **PARTIAL PASS** ⚠️

---

## TC-FUNC-003: Wallet Connectivity and Blockchain Integration
**Priority:** Critical | **Module:** Cryptocurrency Wallet Integration

### Steps
1. Navigate to home page
2. Click "Connect" button in navbar
3. Verify wallet connection modal appears
4. Navigate to property detail page
5. Click "Connect Wallet to Invest" button
6. Select MetaMask wallet
7. Approve connection in MetaMask
8. Verify wallet address displays
9. Enter investment amount
10. Verify USD to ETH conversion
11. Click "Invest" button
12. Confirm transaction in wallet

### Result: **FAIL** ❌

---

## TC-FUNC-004: Property Detail Page Display
**Priority:** High | **Module:** Property Detail Page

### Steps
1. Navigate to /properties
2. Click on first property card
3. Verify property image loads
4. Verify property title displays
5. Verify price in USD displays
6. Verify price in ETH displays
7. Verify location displays
8. Verify ROI percentage displays
9. Verify funding progress bar displays
10. Verify investor count displays
11. Verify property description displays
12. Verify amenities list displays

### Result: **PASS** ✅

---

## TC-FUNC-005: Property Navigation Bug - Second Property
**Priority:** Critical | **Module:** Property Navigation

### Steps
1. Navigate to /properties
2. Note the URL/title of second property card
3. Click on second property card
4. Verify URL matches second property ID
5. Verify page content is for second property (not first)

### Result: **FAIL** ❌

---

## TC-FUNC-006: Mobile Responsiveness
**Priority:** High | **Module:** Responsive Design

### Steps
1. Open application at desktop size (1920x1080)
2. Verify layout looks correct
3. Resize to tablet size (768x1024)
4. Verify layout adapts correctly
5. Resize to mobile size (375x667)
6. Verify layout adapts correctly
7. Test hamburger menu on mobile
8. Verify all content accessible on mobile
9. Test property cards on mobile
10. Test filters on mobile

### Result: **PASS** ✅

---

## TC-FUNC-007: Footer Links and Navigation
**Priority:** Low | **Module:** Footer

### Steps
1. Scroll to page footer
2. Click "Privacy Policy" link
3. Verify privacy page loads
4. Go back to home
5. Click "Terms of Service" link (if exists)
6. Verify terms page loads
7. Check social media links (if exist)
8. Verify footer displays on all pages

### Result: **PASS** ✅

---

## TC-FUNC-008: Blog Page Functionality
**Priority:** Medium | **Module:** Blog

### Steps
1. Navigate to /blog
2. Verify blog posts display
3. Click on first blog post
4. Verify blog post detail page loads
5. Verify blog title displays
6. Verify blog content displays
7. Verify blog date displays
8. Click back to blog list
9. Verify navigation works

### Result: **PASS** ✅

---

## TC-FUNC-009: Property Images and Gallery
**Priority:** Medium | **Module:** Property Images

### Steps
1. Navigate to any property detail page
2. Verify main property image loads
3. Check if image gallery exists
4. Click on thumbnail images (if exist)
5. Verify main image changes
6. Test image zoom functionality (if exists)
7. Verify images are optimized
8. Check image loading speed

### Result: **PASS** ✅

---

## TC-FUNC-010: 3D Property Visualization
**Priority:** Medium | **Module:** 3D Rendering

### Steps
1. Navigate to /property-3d
2. Verify 3D scene loads
3. Test mouse controls (rotate, zoom, pan)
4. Verify 3D model renders correctly
5. Check performance (FPS)
6. Test on different browsers
7. Verify fallback for unsupported devices

### Result: **PARTIAL PASS** ⚠️

---

## TC-FUNC-011: Search Functionality
**Priority:** Medium | **Module:** Search

### Steps
1. Navigate to properties page
2. Locate search input field
3. Enter property name in search
4. Verify results filter
5. Enter location in search
6. Verify results update
7. Clear search
8. Verify all properties display again

### Result: **FAIL** ❌

---

## TC-FUNC-012: Property Card Information
**Priority:** High | **Module:** Property Cards

### Steps
1. Navigate to /properties
2. Verify all property cards display
3. Check each card has image
4. Check each card has title
5. Check each card has price
6. Check each card has location
7. Check each card has ROI
8. Check each card has status badge
9. Check each card has funding progress
10. Verify cards are clickable

### Result: **PASS** ✅

---

## TC-UI-001: Visual Design and Styling
**Priority:** Medium | **Module:** UI/UX

### Steps
1. Navigate through all pages
2. Verify consistent color scheme
3. Verify consistent typography
4. Check button styles are consistent
5. Verify spacing and alignment
6. Check for visual bugs or overlaps
7. Verify animations are smooth
8. Check loading states display

### Result: **PASS** ✅

---

## TC-UI-002: Error Pages
**Priority:** Medium | **Module:** Error Handling

### Steps
1. Navigate to invalid URL (/invalid-test-page)
2. Verify 404 page displays
3. Check 404 page has home link
4. Click home link
5. Verify navigation back to home works
6. Test with various invalid URLs

### Result: **PASS** ✅

---

## Test Summary

| Test Case | Type | Status |
|-----------|------|--------|
| TC-FUNC-001 | Functional | ✅ PASS |
| TC-FUNC-002 | Functional | ❌ FAIL |
| TC-SEC-001 | Security | ❌ FAIL |
| TC-PERF-001 | Performance | ⚠️ PARTIAL |
| TC-FUNC-003 | Functional | ❌ FAIL |
| TC-FUNC-004 | Functional | ✅ PASS |
| TC-FUNC-005 | Functional | ❌ FAIL |
| TC-FUNC-006 | Functional | ✅ PASS |
| TC-FUNC-007 | Functional | ✅ PASS |
| TC-FUNC-008 | Functional | ✅ PASS |
| TC-FUNC-009 | Functional | ✅ PASS |
| TC-FUNC-010 | Functional | ⚠️ PARTIAL |
| TC-FUNC-011 | Functional | ❌ FAIL |
| TC-FUNC-012 | Functional | ✅ PASS |
| TC-UI-001 | UI/UX | ✅ PASS |
| TC-UI-002 | UI/UX | ✅ PASS |

**Results:** 10 Pass • 5 Fail • 2 Partial (59% Pass Rate)
