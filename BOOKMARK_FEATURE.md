# Twitter Clone - Bookmark Feature

## 📑 Bookmark Functionality Overview

This Twitter clone now includes a comprehensive bookmark feature that allows users to save tweets for later viewing. The implementation includes:

### ✨ Features

1. **Functional Like/Bookmark Button**
   - Located in the tweet interaction bar
   - Toggles between bookmark and unbookmark states
   - Visual feedback with different icons for saved/unsaved states
   - Real-time state updates

2. **Card Format Display**
   - Bookmarked tweets are displayed in a beautiful card format
   - Each bookmark includes a snapshot of the original tweet
   - Visual indicators showing when the tweet was bookmarked
   - Clean, offset card layout for easy browsing

3. **Timestamp Display**
   - Shows when each tweet was originally created
   - Shows when each tweet was bookmarked
   - Uses relative time format (e.g., "2 hours ago")

4. **Delete Functionality**
   - Delete/remove button appears on hover
   - Confirmation through toast notifications
   - Smooth animations for removal

5. **User Authentication Integration**
   - Bookmarks are tied to authenticated users
   - Automatic sign-in redirect for unauthenticated users
   - Personal bookmark collections per user

### 🏗️ Technical Implementation

#### API Endpoints

- `POST /api/addBookmark` - Add or remove a bookmark (toggle functionality)
- `GET /api/getBookmarks` - Fetch user's bookmarks
- `GET /api/checkBookmark` - Check if a specific tweet is bookmarked
- `DELETE /api/deleteBookmark` - Remove a specific bookmark

#### Components

- `BookmarkCard.tsx` - Individual bookmark display component
- `useBookmarks.ts` - Custom hook for bookmark management
- Updated `Tweet.tsx` - Includes bookmark functionality
- Updated `bookmarks.tsx` - Main bookmarks page

#### Database Structure

Bookmarks are stored in Firebase Firestore with the following structure:
```javascript
{
  tweetId: string,           // Original tweet ID
  text: string,              // Tweet content snapshot
  username: string,          // Tweet author
  profileImg: string,        // Author profile image
  image?: string,            // Tweet image (if any)
  originalCreatedAt: string, // Original tweet timestamp
  userId: string,            // Bookmark owner's ID
  userDisplayName: string,   // Bookmark owner's name
  createdAt: timestamp       // When bookmark was created
}
```

### 🎯 How to Use

1. **Bookmark a Tweet:**
   - Click the bookmark icon on any tweet
   - The icon will change to indicate it's saved
   - A toast notification confirms the action

2. **View Bookmarks:**
   - Navigate to the Bookmarks page from the sidebar
   - See all your saved tweets in an organized list
   - Each bookmark shows when it was saved

3. **Remove Bookmarks:**
   - Hover over a bookmarked tweet
   - Click the red delete button that appears
   - The bookmark is immediately removed

### 🚀 Getting Started

1. Ensure Firebase is properly configured
2. Start the development server: `npm run dev`
3. Sign in to your account
4. Start bookmarking tweets!

### 📱 Responsive Design

The bookmark feature is fully responsive and works seamlessly across:
- Desktop browsers
- Tablet devices  
- Mobile phones

### 🎨 UI/UX Features

- Smooth animations and transitions
- Dark/light mode support
- Hover effects and visual feedback
- Loading states and error handling
- Toast notifications for user feedback

The bookmark feature enhances the user experience by allowing them to curate their own collection of meaningful tweets for future reference.
