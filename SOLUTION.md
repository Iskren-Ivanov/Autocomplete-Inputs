# Solution Docs

1. GitHub Users API Integration

Endpoint: https://api.github.com/search/users?q={query}&per_page={numOfResults}

Description: Fetches a list of GitHub users whose logins start with the provided query. Returns user details including login names and user IDs.

Example Request: https://api.github.com/search/users?q=foo&per_page=10

Usage: Integrated into the Autocomplete component to fetch and display GitHub users as suggestions based on user input.

2. Implementation Notes

State Management: Added state management to handle search input, dropdown visibility, and selection.

Recent Searches: Implemented functionality to store and display the last 10 searches, enhancing user experience by providing quick access to previous queries.

Keyboard Navigation: Implemented keyboard shortcuts to navigate through suggestions using arrow keys and select items with the Enter key.