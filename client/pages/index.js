import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import io from "socket.io-client";

const socket = io("https://schoolrab.onrender.com");

export default function Home() {
  const [message, setMessage] = useState("");
  const [list, setList] = useState([]);

  const handleSendMessage = () => {
    //サーバーへ送信
    socket.emit("send_message", { message: message });
  };

  //サーバーから受信
  socket.on("received_message", (data) => {
    // console.log(data);
    setList([...list, data]);
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>チャットアプリ</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <h2>チャットアプリ</h2>
        <div className={styles.chatInputButton}>
          <input
            type="text"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            placeholder="ちゃっと・・・"
            value={message}
          />
          <button
            onClick={() => {
              handleSendMessage();
              setMessage("");
            }}
          >
            チャット送信
          </button>
        </div>
        {/* {JSON.stringify(list)} */}
        <div>
          {list.map((chat) => (
            <div key={chat.message} className={styles.chatArea}>
              {chat.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
