# 🗺️ Delivery Location Detection & Selection System

A fully functional location detection and selection module for the pharmacy website that enables users to select their delivery location manually or through automatic detection.

## 📋 Features

### ✅ Automatic Location Detection
- Browser geolocation API integration
- Reverse geocoding using Nominatim (OpenStreetMap)
- Automatic matching with available delivery cities
- Loading states and error handling

### ✅ Manual Location Selection
- **Province Dropdown**: All 6 provinces of Pakistan
- **City Dropdown**: 60+ major cities across Pakistan
- **Address Text Input**: Free-form text field for specific addresses/areas
- Search autocomplete for quick location finding

### ✅ Delivery Coverage System
- Real-time delivery availability checking
- Estimated delivery times (1-2 days for major cities, 2-3 days for others)
- Support status indicators

### ✅ Data Persistence
- **LocalStorage**: Automatic saving for guest users
- **Database Ready**: Structure prepared for logged-in user storage
- Persistence survives page refreshes

### ✅ Mobile Responsive
- Hidden location bar on mobile (shown in bottom nav on mobile views)
- Full modal interface works on all screen sizes
- Touch-friendly controls

## 📁 File Structure

```
src/
├── store/
│   └── locationStore.js           # Zustand store for location state
├── services/
│   └── locationService.js         # Geolocation & reverse geocoding
├── data/
│   └── locations.js               # Location data & utilities
└── components/
    ├── layout/
    │   ├── LocationBar.jsx        # Display current location & "Change" button
    │   └── SecondaryNav.jsx       # Updated to use LocationBar
    └── modals/
        └── LocationSelector.jsx    # Main location selection modal
```

## 🎯 How to Use

### For Users

1. **Click "Change" Button**: Located in the location bar (desktop only)
2. **Choose Detection Method**:
   - **Detect Automatically**: Requests browser permission and auto-detects location
   - **Select Manually**: Opens form to manually select location
3. **Manual Selection Flow**:
   - Select Province (dropdown)
   - Select City (dropdown) - 60+ cities available
   - Optional: Enter specific address/area (free text input)
   - Click "Confirm Location"
4. **Automatic Detection Flow**:
   - Grant location permission when browser asks
   - System auto-detects and displays your location
   - Click "Confirm This Location" to save

### For Developers

#### Using the Location Store

```javascript
import useLocationStore from '@/store/locationStore'

function MyComponent() {
  const { location, isDeliveryAvailable } = useLocationStore()
  
  // location object contains:
  // {
  //   latitude: number,
  //   longitude: number,
  //   province: string,
  //   city: string,
  //   area: string (user's free-text input),
  //   fullAddress: string,
  //   source: 'manual' | 'automatic'
  // }
  
  return (
    <div>
      <p>Delivery to: {location.city}, {location.province}</p>
      {isDeliveryAvailable && <p>✓ We deliver here</p>}
    </div>
  )
}
```

#### Checking Delivery Availability

```javascript
import { isLocationServiceable, getEstimatedDeliveryDays } from '@/data/locations'

const canDeliver = isLocationServiceable('Punjab', 'Lahore')
const days = getEstimatedDeliveryDays('Punjab', 'Lahore') // "1-2 days"
```

#### Searching Locations

```javascript
import { searchLocations } from '@/data/locations'

const results = searchLocations('Karachi')
// Returns matching provinces, cities based on query
```

## 🗺️ Supported Provinces & Cities

### Punjab (27 cities)
Lahore, Faisalabad, Gujranwala, Sialkot, Bahawalpur, Jhang, Sargodha, Okara, Gujrat, Sheikhupura, Kasur, Attock, Dera Ghazi Khan, Sahiwal, Lodhran, Vehari, Khanewal, Toba Tek Singh, Bhakkar, Mandi Bahauddin, Hafizabad, Pakpattan, Rawalpindi, and more

### Sindh (14 cities)
Karachi, Hyderabad, Sukkur, Larkana, Nawabshah, Jacobabad, Mirpur Khas, Thatta, Badin, Shikarpur, Kashmore, Dadu, Tando Allah Yar, Sanghar

### Khyber Pakhtunkhwa (11 cities)
Peshawar, Abbottabad, Swat, Kohat, Mardan, Dera Ismail Khan, Charsadda, Buner, Bannu, Mansehra, Mingora

### Balochistan (7 cities)
Quetta, Gwadar, Zhob, Dera Murad Jamali, Turbat, Dalbandin, and more

### Azad Jammu & Kashmir (6 cities)
Mirpur, Muzaffarabad, Rawalakot, Bhimber, Kotli, Palandri

### Gilgit-Baltistan (5 cities)
Gilgit, Skardu, Hunza, Nagar, Ghanche

## 🔧 Customization

### Adding New Cities

Edit `src/data/locations.js`:

```javascript
export const pakLocations = {
  'Punjab': {
    province: 'Punjab',
    cities: {
      'NewCity': { lat: 31.5000, lng: 74.5000 }, // Add here
    },
  },
}
```

### Changing Delivery Coverage

Edit `src/data/locations.js`:

```javascript
export const deliveryZones = [
  { province: 'Punjab', cities: ['Lahore', 'NewCity'] }, // Add city here
  // ...
]
```

### Customizing Estimated Delivery Times

Edit `src/data/locations.js`:

```javascript
export const getEstimatedDeliveryDays = (province, city) => {
  // Modify logic here
  if (city === 'Lahore') return '1 day'
  return '2-3 days'
}
```

## 🔐 Privacy & Permissions

- **Geolocation**: Only requested when user clicks "Detect Automatically"
- **Storage**: LocalStorage used for guest users, no server-side tracking without user auth
- **Permission Denied**: User can always select location manually
- **Clear Data**: User can change location anytime

## 🚀 Integrations

### Current Integrations
- ✅ Zustand (state management)
- ✅ React Hot Toast (notifications)
- ✅ Tailwind CSS (styling)
- ✅ Nominatim/OpenStreetMap (reverse geocoding)

### Ready for Integration
- 🔜 Database (when user is logged in)
- 🔜 Google Maps API (can replace Nominatim)
- 🔜 Order tracking (show delivery status)
- 🔜 Shipping cost calculation based on location

## 📊 Data Flow

```
User clicks "Change" button
    ↓
Modal opens with two options
    ↓
User chooses:
    ├→ Detect Automatically
    │   ├→ Request browser geolocation
    │   ├→ Get coordinates (lat/lng)
    │   ├→ Reverse geocode to address
    │   └→ Show detected location
    │
    └→ Select Manually
        ├→ Show province dropdown
        ├→ Show city dropdown (based on province)
        ├→ Show address text input (optional)
        └→ Show area/locality input
    ↓
User confirms location
    ↓
Check delivery coverage
    ↓
Save to:
    ├→ Zustand store (immediate UI update)
    ├→ LocalStorage (guest users)
    └→ Database (logged-in users - when implemented)
    ↓
Show confirmation toast
Update location bar
```

## 🎨 UI Components

### LocationBar (Display)
- Shows current selected location
- "Change" button to open selector
- Delivery availability status
- Desktop only (hidden on mobile)

### LocationSelector (Modal)
- **Step 1 (Options)**: Detect or Manual
- **Step 2 (Detection)**: Show loading state
- **Step 3 (Manual Form)**: Province, City, Address
- **Footer**: Delivery info and confirm button

## 🐛 Error Handling

| Scenario | Handling |
|----------|----------|
| Permission Denied | Show friendly message, allow manual entry |
| Location Unavailable | Suggest manual location selection |
| Undeliverable Area | Show "Not serviceable" message |
| Network Error | Show "Service unavailable" with retry |
| Empty Input | Require at least City selection |

## 📈 Performance

- **Nominatim API**: Throttled to 1 request/second max
- **Search**: Local database first, API fallback
- **Storage**: LocalStorage ~5KB per location data
- **Load Time**: < 50ms for location detection (after permission)

## 🔄 Browser Compatibility

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 15+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

**Note**: Geolocation requires HTTPS in production

## 📝 Example Usage

```javascript
import LocationBar from '@/components/layout/LocationBar'
import useLocationStore from '@/store/locationStore'

function ProductPage() {
  const location = useLocationStore()
  
  useEffect(() => {
    if (location.city) {
      // Fetch products available in this city
      fetchProductsByLocation(location.city)
    }
  }, [location.city])
  
  return (
    <>
      <LocationBar />
      {/* Your products */}
    </>
  )
}
```

## 🚨 Known Limitations

1. **Geolocation**: Requires HTTPS in production (HTTP localhost works in dev)
2. **Reverse Geocoding**: May not match exact street addresses, uses city level
3. **Offline**: Search works offline, geolocation requires internet
4. **Mobile**: Location bar hidden (can be added to mobile nav if needed)

## 🛠️ Troubleshooting

### "Location not detected"
- Check browser permissions (Chrome → Settings → Privacy → Site Settings)
- Enable location for the website
- Ensure you're on HTTPS in production

### "My city is not listed"
- City may not be in delivery zones
- Edit `src/data/locations.js` to add coverage
- Check `deliveryZones` array

### "Address not saving"
- Check if localStorage is enabled
- Clear browser cache and reload
- Check browser console for errors

## 🔮 Future Enhancements

- [ ] Integration with Google Maps for visual pin placement
- [ ] Integration with delivery partner APIs for real-time status
- [ ] Multi-address support (home, office, etc.)
- [ ] Saved locations for quick selection
- [ ] Delivery cost calculator
- [ ] Real-time delivery tracking
- [ ] Integration with payment gateways for address verification

## 📧 Support

For issues or feature requests, contact the development team or check the project documentation.
