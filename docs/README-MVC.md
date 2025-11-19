# NRGUG API - MVC Architecture

A RESTful API built with Go using the MVC (Model-View-Controller) pattern for managing news, events, and clients data.

## 🏗️ Architecture Overview

The API follows the MVC pattern with clear separation of concerns:

```
apis/
├── main.go                 # Application entry point
├── models/                 # Data models and DTOs
│   ├── news.go
│   ├── event.go
│   └── client.go
├── controllers/            # HTTP request handlers
│   ├── news_controller.go
│   ├── event_controller.go
│   └── client_controller.go
├── database/              # Data access layer
│   ├── connection.go
│   ├── news_repository.go
│   ├── event_repository.go
│   └── client_repository.go
└── routes/                # Route definitions
    └── routes.go
```

## 📦 Package Structure

### Models (`models/`)
- **Purpose**: Define data structures and request/response DTOs
- **Files**:
  - `news.go` - News article models
  - `event.go` - Event models  
  - `client.go` - Client models

### Controllers (`controllers/`)
- **Purpose**: Handle HTTP requests and responses
- **Responsibilities**:
  - Parse request data
  - Call repository methods
  - Format responses
  - Handle errors
- **Files**:
  - `news_controller.go` - News-related endpoints
  - `event_controller.go` - Event-related endpoints
  - `client_controller.go` - Client-related endpoints

### Database (`database/`)
- **Purpose**: Data access layer (Repository pattern)
- **Responsibilities**:
  - Database connection management
  - CRUD operations
  - Query execution
- **Files**:
  - `connection.go` - Database connection setup
  - `*_repository.go` - Repository implementations

### Routes (`routes/`)
- **Purpose**: Define API endpoints and routing
- **Responsibilities**:
  - Map URLs to controllers
  - Set up middleware
  - Configure HTTP methods

## 🚀 Benefits of MVC Architecture

1. **Separation of Concerns**: Each layer has a single responsibility
2. **Maintainability**: Easy to modify individual components
3. **Testability**: Each layer can be tested independently
4. **Scalability**: Easy to add new features or modify existing ones
5. **Code Reusability**: Controllers and repositories can be reused
6. **Clean Code**: Better organization and readability

## 🔧 Key Features

- **Repository Pattern**: Clean data access abstraction
- **Dependency Injection**: Controllers depend on repository interfaces
- **Error Handling**: Consistent error responses across all endpoints
- **JSON Serialization**: Automatic request/response marshaling
- **Database Connection Pooling**: Efficient database connections
- **Environment Configuration**: Flexible database configuration

## 📝 API Endpoints

### News
- `GET /api/news` - Get all news articles
- `POST /api/news` - Create new news article
- `GET /api/news/{id}` - Get specific news article
- `PUT /api/news/{id}` - Update news article
- `DELETE /api/news/{id}` - Delete news article

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create new event
- `GET /api/events/{id}` - Get specific event
- `PUT /api/events/{id}` - Update event
- `DELETE /api/events/{id}` - Delete event

### Clients
- `GET /api/clients` - Get all clients
- `POST /api/clients` - Create new client
- `GET /api/clients/{id}` - Get specific client
- `PUT /api/clients/{id}` - Update client
- `DELETE /api/clients/{id}` - Delete client

### Health Check
- `GET /health` - API health status

## 🛠️ Development

### Running the API
```bash
# Install dependencies
go mod tidy

# Run the API
go run main.go

# Or build and run
go build -o nrgug-api-mvc main.go
./nrgug-api-mvc
```

### Testing
```bash
# Run the test script
./test_api.sh

# Test individual endpoints
curl http://localhost:8080/health
curl http://localhost:8080/api/news
```

## 🔄 Data Flow

1. **Request** → Routes → Controller
2. **Controller** → Repository → Database
3. **Database** → Repository → Controller
4. **Controller** → JSON Response → Client

## 🎯 Best Practices Implemented

- **Single Responsibility Principle**: Each package has one responsibility
- **Dependency Inversion**: Controllers depend on abstractions, not concretions
- **Error Handling**: Consistent error responses
- **Input Validation**: Request validation in controllers
- **Database Transactions**: Proper transaction handling
- **Connection Management**: Efficient database connection pooling

## 📈 Future Enhancements

- Add middleware for logging, authentication, and rate limiting
- Implement service layer for business logic
- Add comprehensive unit tests
- Implement database migrations
- Add API documentation with Swagger
- Add caching layer
- Implement pagination for list endpoints
