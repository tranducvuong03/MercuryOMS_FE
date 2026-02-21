import { useEffect, useState, useRef } from "react"
import { products } from "../../data/products"
import "./ShopChatWidget.css"
import { FaComments, FaStore } from "react-icons/fa";

type ChatMessage = { sender: "user" | "shop"; text: string; time: string }

const storageKey = (shopId: number) => `chat_shop_${shopId}`

const ShopChatWidget = () => {
  const [chats, setChats] = useState<{ shopId: number; shop: any; messages: ChatMessage[] }[]>([])
  const [open, setOpen] = useState(false)
  const [activeShopId, setActiveShopId] = useState<number | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    buildList()

    const onOpen = (e: Event) => {
      const ev = e as CustomEvent
      const shopId = Number(ev.detail?.shopId)
      const initial = ev.detail?.initialText as string | undefined
      if (!shopId) return
      setOpen(true)
      setActiveShopId(shopId)
      if (initial) {
        // send initial message after small delay to ensure chat panel opened
        setTimeout(() => sendMessage(shopId, initial), 120)
      }
    }

    window.addEventListener("openShopChat", onOpen as EventListener)
    window.addEventListener("storage", buildList)
    return () => {
      window.removeEventListener("openShopChat", onOpen as EventListener)
      window.removeEventListener("storage", buildList)
    }
  }, [])

  function buildList() {
    const keys = Object.keys(localStorage).filter(k => k.startsWith("chat_shop_"))
    const list = keys.map(k => {
      const id = Number(k.replace("chat_shop_", ""))
      const shop = findShopById(id)
      const messages: ChatMessage[] = JSON.parse(localStorage.getItem(k) || "[]")
      return { shopId: id, shop, messages }
    }).filter(item => item.shop)
    // sort by last message time desc
    list.sort((a, b) => {
      const ta = a.messages[a.messages.length - 1]?.time || ""
      const tb = b.messages[b.messages.length - 1]?.time || ""
      return tb.localeCompare(ta)
    })
    setChats(list)
  }

  function findShopById(id: number) {
    const p = products.find(p => p.shop?.id === id)
    return p?.shop
  }

  function sendMessage(shopId: number, text: string) {
    if (!text.trim()) return
    const key = storageKey(shopId)
    const cur: ChatMessage[] = JSON.parse(localStorage.getItem(key) || "[]")
    const msg: ChatMessage = { sender: "user", text: text.trim(), time: new Date().toISOString() }
    const next = [...cur, msg]
    localStorage.setItem(key, JSON.stringify(next))
    // simulate reply
    setTimeout(() => {
      const reply: ChatMessage = { sender: "shop", text: "Cảm ơn bạn! Shop sẽ phản hồi sớm.", time: new Date().toISOString() }
      const cur2: ChatMessage[] = JSON.parse(localStorage.getItem(key) || "[]")
      localStorage.setItem(key, JSON.stringify([...cur2, reply]))
      buildList()
    }, 900)
    buildList()
  }

  function handleSend() {
    if (!activeShopId) return
    const txt = inputRef.current?.value || ""
    sendMessage(activeShopId, txt)
    if (inputRef.current) inputRef.current.value = ""
  }

  function openChatFor(shopId: number) {
    setActiveShopId(shopId)
    setOpen(true)
  }

  function deleteChat(shopId: number) {
    localStorage.removeItem(storageKey(shopId))
    if (activeShopId === shopId) setActiveShopId(null)
    buildList()
  }

  const activeChat = chats.find(c => c.shopId === activeShopId)
  const activeShop = activeShopId ? findShopById(activeShopId) : null
  const activeMessages: ChatMessage[] = activeChat
    ? activeChat.messages
    : activeShopId
      ? JSON.parse(localStorage.getItem(storageKey(activeShopId)) || "[]")
      : []

  return (
    <div className={`shop-chat-widget ${open ? "open" : ""}`}>
      <div className="widget-toggle" onClick={() => setOpen(o => !o)}>
        <FaComments />
        {chats.length > 0 && <span className="badge">{chats.length}</span>}
      </div>

      {open && (
        <div className="widget-panel">
          <div className="chat-list">
            <div className="list-header">Tin nhắn với shop</div>
            <div className="list-items">
              {chats.length === 0 && <div className="empty">Chưa có cuộc trò chuyện nào.</div>}
              {chats.map(c => (
                <div key={c.shopId} className={`chat-item ${activeShopId === c.shopId ? 'active' : ''}`} onClick={() => openChatFor(c.shopId)}>
                  <div className="ci-left">
                    <div className="ci-avatar">
                      {c.shop?.logo ? (
                        <img src={c.shop.logo} alt={c.shop.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} />
                      ) : (
                        <span style={{ fontSize: '24px' }}><FaStore /></span>
                      )}
                    </div>
                    <div className="ci-meta">
                      <div className="ci-name">{c.shop.name}</div>
                      <div className="ci-last">{c.messages[c.messages.length - 1]?.text || '—'}</div>
                    </div>
                  </div>
                  <div className="ci-right">
                    <button className="ci-delete" onClick={(e) => { e.stopPropagation(); deleteChat(c.shopId) }}>🗑</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="chat-panel">
            {(activeChat || activeShop) ? (
              <>
                <div className="chat-header">Chat — {activeChat ? activeChat.shop.name : activeShop?.name}</div>
                <div className="chat-messages">
                  {activeMessages.length === 0 && <div className="empty">Chưa có tin nhắn. Viết tin nhắn để bắt đầu.</div>}
                  {activeMessages.map((m, i) => (
                    <div key={i} className={`msg ${m.sender === 'user' ? 'from-user' : 'from-shop'}`}>
                      <div className="msg-text">{m.text}</div>
                      <div className="msg-time">{new Date(m.time).toLocaleString()}</div>
                    </div>
                  ))}
                </div>
                <div className="chat-input-row">
                  <input ref={inputRef} placeholder="Gửi tin nhắn..." />
                  <button onClick={handleSend}>Gửi</button>
                </div>
              </>
            ) : (
              <div className="chat-empty-panel">Chọn một shop để bắt đầu trò chuyện</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ShopChatWidget
