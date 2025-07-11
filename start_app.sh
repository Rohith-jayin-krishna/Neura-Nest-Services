#!/bin/bash

# Navigate to the frontend directory
# This assumes start_app.sh is in the project root (neura-nest/)
cd frontend

echo "Starting both backend and frontend in VS Code integrated terminal..."
# Run the 'start-all' script defined in frontend/package.json
npm run start-all

echo "All servers stopped."