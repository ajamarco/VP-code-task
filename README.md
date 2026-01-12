## Overview

This application provides a comprehensive product browsing experience with real-time search, advanced filtering, and sorting capabilities.

## Features

### Core Functionality

- **Real-time Search**: Debounced search input (500ms) for optimal API performance
- **Dynamic Filtering**:
  - Price range filtering with predefined ranges and custom range input
  - Brand filtering with checkbox selection
  - Active filters display with easy removal
- **Sorting Options**: Multiple sort criteria including relevance, price, and rating
- **Pagination**: Navigate through product results with page controls
- **Responsive Design**: Mobile-first approach with adaptive layouts

### Technical Highlights

- **State Management**: Centralized Redux Toolkit store with feature-based slices
- **Type Safety**: Full TypeScript implementation with comprehensive type definitions
- **Modern React**: Functional components with hooks (React 19)
- **Optimized Performance**: Debounced search, efficient re-renders, and loading states
- **Clean Architecture**: Feature-based folder structure for scalability

## Tech Stack

- **Frontend Framework**: React 19.2.0
- **Language**: TypeScript 5.9.3
- **State Management**: Redux Toolkit 2.11.2
- **Styling**: Tailwind CSS 4.1.18
- **Build Tool**: Vite 7.2.4
- **Code Quality**: ESLint with React hooks plugin
