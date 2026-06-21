const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
    <h1>AidLoans</h1>
    <form method="POST" action="/submit">
      <input name="fullname" placeholder="Full Name"><br><br>
      <input name="phone" placeholder="Phone Number"><br><br>
      <button type="submit">Submit</button>
    </form>
  `);
});

app.post("/submit", async (req, res) => {
  const { fullname, phone } = req.body;

  const text =
    `New submission\nName: ${fullname}\nPhone: ${phone}`;

  try {
    await axios.post(
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
      {
        chat_id: process.env.CHAT_ID,
        text
      }
    );

    res.send("Application submitted successfully.");
  } catch (err) {
    res.send("Error sending application.");
  }
});

app.listen(process.env.PORT || 3000);
