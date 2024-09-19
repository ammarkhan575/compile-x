# Compile-X
Compile-X is a code editor and compiler built with React, Monaco Editor, and TailwindCSS. It allows users to write, edit, and compile code in multiple programming languages using the Judge0 API. The platform provides a seamless coding experience with language and theme selection options, live output, and customizable settings.

## Features

- **Monaco Editor** for writing and editing code with syntax highlighting.
- **Compile code** in multiple programming languages via the Judge0 API.
- **Language and Theme Selection** using React Select.
- **Live Output** window to display compilation results.
- **Resizable Panels** for code editor and output sections.
- **Error Handling and Notifications** using React Toastify.

## Technologies Used

- **React** - Front-end framework.
- **Monaco Editor** - Code editor with syntax highlighting.
- **TailwindCSS** - Utility-first CSS framework for responsive design.
- **React Toastify** - For in-app notifications.
- **React Select** - For language and theme dropdowns.
- **Axios** - For making API requests to Judge0 API.
- **Judge0 API** - Code compilation and execution engine.


## Installation

To set up the project locally:

1. Clone the repository:
   ```
   git clone https://github.com/ammarkhan575/compile-x.git
   ```

2. Navigate to the project directory:
   ```
   cd compile-x
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Set up your environment variables:
   - Create a `.env` file in the root directory.
   - Add your Judge0 API key:
    - REACT_APP_RAPID_API_HOST = 
    - REACT_APP_RAPID_API_KEY = 
    - REACT_APP_RAPID_API_URL = 


5. Start the development server:
   ```
   npm start
   ```

The app should now be running on [http://localhost:3000](http://localhost:3000).

## Usage

1. **Select Language:** Choose your preferred programming language from the dropdown menu.
2. **Write Code:** Use the Monaco editor to write or paste code.
3. **Compile:** Click the "Run" button to compile the code and see the output in the results panel.
4. **Theme Switching:** Toggle between mulitple themes monaco editor.

## Screenshots

<img width="1440" alt="image" src="https://github.com/user-attachments/assets/f6ff77fa-8366-4339-a8b8-0a99711deea0">

## Future Enhancements

- Add support for more languages.
- Improve error handling and show real-time status updates during API requests.
- Implement user authentication for saving code snippets.
- Add a "Share Code" feature to easily share snippets with others.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (\`git checkout -b feature-branch\`).
3. Make your changes.
4. Commit your changes (\`git commit -m 'Add feature'\`).
5. Push to the branch (\`git push origin feature-branch\`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Judge0 API](https://judge0.com/) for code compilation services.
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) for the robust code editor.
- [React Toastify](https://fkhadra.github.io/react-toastify/) for notifications.
