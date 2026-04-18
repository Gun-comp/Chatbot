const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

// 🔥 ใส่ Channel Access Token ของคุณตรงนี้
const ACCESS_TOKEN = "7fnBilPdOCuwI6O1DoRrOUKGI9YxkuRPNEXrHncIhHUMD21eLW4qqGKZTwZnDWPmBqd+dNeplWfh75Lh5E6nzTGMQFHzYM5l2GhENeWF4dp+mkML/1QRwVBPrRSU6GoTnddqWe1P0aH+BxMBboUFcQdB04t89/1O/w1cDnyilFU=";

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.post("/webhook", async (req, res) => {
  const events = req.body.events;

  for (let event of events) {
    if (event.type === "message" && event.message.type === "text") {
      const replyToken = event.replyToken;
      const userMessage = event.message.text;

      let replyText = "❓ พิมพ์ว่า 'เมนู' เพื่อดูสินค้า";

      // 🎮 logic ง่ายๆ
      if (userMessage === "สวัสดี") {
        replyText = "🎮 ยินดีต้อนรับสู่ Elysium Arcade";
      } else if (userMessage === "เมนู") {
        replyText =
          "📜 เมนูร้าน\n\n🎮 เกม\n💰 ราคา\n📦 โปรโมชัน\n\nพิมพ์คำที่ต้องการได้เลย";
      } else if (userMessage === "เกม") {
        replyText = "🔥 มีเกม: Valorant / GTA V / Minecraft";
      } else if (userMessage === "ราคา") {
        replyText = "💰 ราคาเริ่มต้น 100 บาท";
      }

      try {
        await axios.post(
          "https://api.line.me/v2/bot/message/reply",
          {
            replyToken: replyToken,
            messages: [
              {
                type: "text",
                text: replyText,
              },
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );
      } catch (error) {
        console.error("Error replying:", error.response?.data || error.message);
      }
    }
  }

  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});