// initalize everything
// this will import db and model
// also will start the application
// since we made this init.js file, we should reroute the package.json for nodemon to execute the application
// import db.js
// and import model we created

import "./db"
import "./models/Video";
import app from "./server"

const PORT = 4000;

const handleListen = () => console.log(`✅ Server is listening on http://localhost:${PORT}`);

app.listen(PORT, handleListen);