# Cole Mlostek - Personal Website

A modern, responsive personal website built with React.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with smooth animations
- **Interactive Navigation**: Smooth scrolling navigation with mobile hamburger menu
- **Contact Form**: Functional contact form (ready for backend integration)
- **Project Showcase**: Display your projects with links to GitHub and live demos
- **Skills Section**: Highlight your technical skills and technologies

## Getting Started

### Prerequisites

Make sure you have Node.js installed on your system. You can download it from [nodejs.org](https://nodejs.org/).

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

To create a production build:

```bash
npm run build
```

This builds the app for production to the `build` folder.

## Customization

### Personal Information

Update the following files with your personal information:

1. **About Section** (`src/components/About.js`):
   - Update the about text
   - Modify the skills list
   - Replace the image placeholder

2. **Contact Information** (`src/components/Contact.js` and `src/components/Footer.js`):
   - Update email addresses
   - Add your LinkedIn and GitHub profiles

3. **Projects** (`src/components/Projects.js`):
   - Replace the sample projects with your actual projects
   - Update project descriptions, technologies, and links

### Styling

All CSS files are organized by component:
- `src/index.css` - Global styles
- `src/App.css` - Main app styles
- `src/components/*.css` - Component-specific styles

### Colors and Branding

The main color scheme uses:
- Primary: #007bff (blue)
- Text: #333 (dark gray)
- Background: #ffffff (white)
- Secondary background: #f8f9fa (light gray)

You can easily customize these colors by updating the CSS variables or color values in the respective CSS files.

## Project Structure

```
src/
├── components/
│   ├── Header.js & Header.css
│   ├── About.js & About.css
│   ├── Projects.js & Projects.css
│   ├── Contact.js & Contact.css
│   └── Footer.js & Footer.css
├── App.js & App.css
├── index.js
└── index.css
```

## Deployment

This project can be deployed to any static hosting service:

- **Netlify**: Connect your GitHub repository and deploy automatically
- **Vercel**: Deploy with zero configuration
- **GitHub Pages**: Use the `gh-pages` package for deployment
- **AWS S3**: Upload the build folder to an S3 bucket

## Technologies Used

- React 18
- CSS3 with modern features (Grid, Flexbox, CSS Variables)
- Responsive design principles
- Smooth scrolling and animations

## License

This project is open source and available under the [MIT License](LICENSE).
