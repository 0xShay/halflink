![Screenshot #1 - Homepage](screenshots/HomePage.png)

# Halflink

A primitive URL shortener service built powered by Spring Boot, with a NextJS frontend.

## Tech Stack

- **Backend**: Spring Boot (Java)
- **Database**: PostgreSQL
- **Frontend**: React (NextJS) with TypeScript

## Architecture

The application follows a three-tier architecture:

- **Presentation Layer**: React-based frontend for URL management
- **Application Layer**: Express.js API server handling business logic
- **Data Layer**: PostgreSQL for URL mappings, interacted with via Spring Boot Data JPA

## Getting Started

### Prerequisites

- Java (tested on OpenJDK 21.0.5)
- Maven (tested on Apache Maven 3.6.3)
- Node.js (v18 or higher, tested on v22.17.0)
- PostgreSQL (v14 or higher, tested on psql 18.1)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/0xShay/halflink.git
cd halflink
```

2. Configure database variables:
```bash
cd backend/src/main/resources
# Edit application.properties with your database credentials
```

3. Build and start the backend server:
```bash
cd backend
mvn package
java -jar target/halflink-1.0.0.jar
```

4. Build and start the user interface:
```bash
cd frontend
npm install
npm run build
npm start
```

The application will be available at `http://localhost:3000`

![Screenshot #2 - Successful Shorten](screenshots/LinkShortened.png)
![Screenshot #3 - Manage Link](screenshots/ManageLink.png)

## License

This project is open source and available [under the MIT License](LICENSE).
