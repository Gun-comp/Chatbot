const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

//ใส่ Channel Access Token
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

      //  logic 
      if (["สวัสดี", "Hello", "hello"].includes(userMessage)) {
        replyText = "🎮 ยินดีต้อนรับสู่ Elysium Arcade \nคุณลูกค้า สามารถ พิมคำว่า เมนู ได้เลย";
      } else if (userMessage === "เมนู") {
        replyText =
          "📜 เมนูร้าน\n\n🎮 เกม\n💰 ราคา\n📦 โปรโมชัน\n\nพิมพ์คำที่ต้องการได้เลย";
      } else if (userMessage === "เกม") {
        replyText = "🔥 มีเกม: Valorant / GTA V / Minecraft";
      } else if (userMessage === "ราคา") {
        replyText = "Valorant ราคา 100 บาท ถ้าสนใจ ให้พิมคำว่า Valorant หรือ วาโร \nGTA V ราคา 200 บาท ถ้าสนใจให้พิมคำว่า GTA V หรือ gta5 \nMinecraft ราคา 150 บาท ถ้าสนใจพิมคำว่า Minecarft หรือ มายคราฟ";
      } else if (["สนใจ", "ซื้อ"].includes(userMessage)) {
        replyText = "ได้เลยครับ ลูกค้า \nรบกวนลูกค้าโอนเงินเสร็จแล้ว รบกวนส่งสลิปมาด้วยนะครับ \nPromptPay:093-143-xxxx \nโอนเงินเสร็จแล้ว ให้พิมคำว่า เรียบร้อย";
      } else if (["เรียบร้อย","เรียบร้อยครับ",].includes(userMessage)) {
        replyText = "ขอบคุณครับ อย่าลืมมาใช้บริการอีกครั้งน้าา \nร้านค้า Elysium Arcade มีกิจกรรมให้เล่นเยอะมาก สามารถเข้าร่วมกิจกรรมได้นะครับ\nหลังจากเข้าร่มกิจกรรมสามารถ นำมาใช้เป็นส่วนลดได้";
      } else if(["Valorant","วาโร"].includes(userMessage)) {
        replyText = "ราคา เกม 100 บาท\nถ้าลูกค้าสนใจ ให้พิม สนใจ";
      } else if(["GTA V","gta5","จีทีเอ"].includes(userMessage)) {
        replyText = "ราคา เกม 200 บาท\nถ้าลูกค้าสนใจ ให้พิม สนใจ";
      } else if(["Minecraft","มายคราฟ"].includes(userMessage)) {
        replyText = "ราคา เกม 150 บาท\nถ้าลูกค้าสนใจ ให้พิม สนใจ";
      } else if (userMessage === "โปรโมชั่น") {
        replyText = "ตอนนี้ไม่โปรโมชั่น ใดๆนะคับ ถ้ามีโปรโมชั่นหลังจากนี้จะแจ้งให้ทราบนะครับ";
      } else if (userMessage === "Game&Price") {
        replyText = "🔥 มีเกม: Valorant / GTA V / Minecraft \nValorant ราคา 100 บาท ถ้าสนใจ ให้พิมคำว่า Valorant หรือ วาโร \nGTA V ราคา 200 บาท ถ้าสนใจให้พิมคำว่า GTA V หรือ gta5 \nMinecraft ราคา 150 บาท ถ้าสนใจพิมคำว่า Minecarft หรือ มายคราฟ";
      } else if (userMessage === "ติดต่อฉัน") {
        replyText = "ตอนนี้ยังไม่มีช่องทางติดต่อ ทางอื่น ถ้ามีช่องทางติดต่ออื่นๆหลังจากนี้จะแจ้งให้ทราบนะครับ";
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