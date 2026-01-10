import "./config/env";

import app from "./app";
import connectDB from "./config/db";

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  await connectDB(); // ⬅️ BLOCK until DB is connected

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

startServer();
