# SocialSpark Architecture

## Project Structure

```
src/app/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── layout/         # Layout components (header, sidebar)
│   └── posts/          # Post-related components
│
├── pages/              # Page components (routes)
│   └── home/           # Home page
│
├── services/           # Business logic & API services
│   ├── api.service.ts      # Base API service with HttpClient
│   ├── auth.service.ts     # Authentication service
│   ├── post.service.ts     # Post operations service
│   └── user.service.ts     # User operations service (future)
│
├── models/             # TypeScript interfaces & types
│   ├── post.model.ts       # Post interface
│   ├── user.model.ts       # User interface
│   └── ...
│
├── shared/             # Shared utilities & helpers
│   └── utils/          # Utility functions
│
└── environments/       # Environment configurations
    ├── environment.ts      # Development config
    └── environment.prod.ts # Production config
```

## Services Pattern

All services follow this pattern:
- Extend or use `ApiService` for HTTP calls
- Use RxJS Observables for async operations
- Provide authentication headers automatically
- Handle errors consistently

## API Integration

When backend is ready:
1. Update `environment.ts` with your API URL
2. Services are already configured to use the API
3. Components inject services and use them
4. Models define the data structure

## Example Usage

```typescript
// In component
constructor(private postService: PostService) {}

createPost() {
  this.postService.createPost({ content: 'Hello' })
    .subscribe(post => {
      // Handle success
    });
}
```

