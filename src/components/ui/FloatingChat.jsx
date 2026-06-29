import { useState, useRef, useEffect } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { ArrowLeft, Send, ImagePlus, X } from 'lucide-react'
import { contactInfo } from '../../data/contactInfo'

const PHARMACY_NAME = `${contactInfo.businessName} - Support`
const PHONE = contactInfo.phone

const QUICK_ANSWERS = [
  { id: 1, text: "What is your contact info? 📞" },
  { id: 2, text: "Track my order 🚚" },
  { id: 3, text: "What is your return policy? 📦" },
  { id: 4, text: "I would like to order medication. 💊" },
]

const AUTOMATED_REPLIES = {
  "What is your contact info? 📞": `You can reach us at ${PHONE}. We're here to assist you!`,
  "Track my order 🚚": "Please provide your order number and we'll look it up for you right away.",
  "What is your return policy? 📦": "We offer a 7-day return policy on most products. Please contact us with your order details.",
  "I would like to order medication. 💊": `Upload your prescription or call ${PHONE}. Customer support will reach out soon!`,
}

const INITIAL_MESSAGES = [
  {
    id: 0,
    from: 'bot',
    text: `Hi there 👋 Welcome to ${PHARMACY_NAME}! You can also reach us at ${PHONE}. We're here to assist you!`,
    time: '',
    isAuto: true,
  }
]

const getTime = () => {
  const now = new Date()
  return now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
}

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [view, setView] = useState('home') // 'home' | 'chat'
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [inputVal, setInputVal] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    if (view === 'chat') {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, view])

  const sendMessage = (text) => {
    if (!text.trim()) return
    const userMsg = { id: Date.now(), from: 'user', text, time: getTime() }
    setMessages(prev => [...prev, userMsg])
    setInputVal('')
    setView('chat')
    setIsTyping(true)

    const reply = AUTOMATED_REPLIES[text]
    setTimeout(() => {
      setIsTyping(false)
      const botReply = {
        id: Date.now() + 1,
        from: 'bot',
        text: reply || "Thanks for your message! We'll be with you as soon as we can.\n\nIf you prefer not to wait, we'll follow up via the contact info you provided.",
        time: getTime(),
        isAuto: true,
      }
      setMessages(prev => [...prev, botReply])
    }, 1200)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(inputVal)
    }
  }

  return (
    <>
      {/* ── WhatsApp floating button ── */}
      <a
        href={`https://wa.me/${PHONE.replace(/\D/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-[140px] right-4 md:bottom-6 md:right-6 z-50 w-12 h-12 md:w-16 md:h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="text-[28px] md:text-[36px]" />
      </a>

      {/* ── Need Help trigger button ── */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-[80px] right-4 md:bottom-6 md:left-6 md:right-auto z-50 flex items-center gap-2 md:gap-3 bg-[#0fafb8] text-[#073b45] px-3 py-2 md:px-5 md:py-3 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all font-bold text-[13px] md:text-[16px]"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          <div className="bg-[#073b45] text-white rounded-tl-xl rounded-tr-xl rounded-br-xl rounded-bl-sm p-2 md:p-2.5 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          Need help?
        </button>
      )}

      {/* ── Chat Panel ── */}
      {isOpen && (
        <div
          className="fixed bottom-[80px] right-4 md:bottom-6 md:left-6 md:right-auto z-50 flex flex-col rounded-2xl overflow-hidden"
          style={{
            width: '320px',
            maxHeight: '500px',
            boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {/* ─── VIEW: HOME ─── */}
          {view === 'home' && (
            <>
              {/* Header */}
              <div className="bg-[#0fafb8] px-5 pt-5 pb-6 relative">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-3 right-3 text-[#073b45] hover:opacity-60 transition-opacity"
                >
                  <X size={18} strokeWidth={2.5} />
                </button>
                <h2 className="font-extrabold text-[#073b45] text-[17px]">Chat with us</h2>
                <p className="text-[#073b45] text-[13px] mt-1 leading-snug">
                  👋 Hi, message us with any questions. We're happy to help!
                </p>
              </div>

              {/* Return to chat */}
              <div className="bg-white px-4 py-4">
                <button
                  onClick={() => setView('chat')}
                  className="w-full bg-[#073B45] hover:bg-[#0FAFB8] text-white hover:text-[#073B45] font-bold py-3 rounded-xl text-[14px] transition-colors"
                >
                  Return to chat
                </button>
              </div>

              {/* Instant Answers */}
              <div className="bg-white px-4 pb-5 flex-1 overflow-y-auto">
                <p className="text-center text-[13px] font-semibold text-gray-500 mb-3">Instant answers</p>
                <div className="flex flex-col gap-2">
                  {QUICK_ANSWERS.map(qa => (
                    <button
                      key={qa.id}
                      onClick={() => sendMessage(qa.text)}
                      className="w-full text-left border border-gray-200 hover:border-[#0fafb8] hover:bg-[#f0faf8] rounded-xl px-4 py-3 text-[13px] text-gray-700 font-medium transition-colors"
                    >
                      {qa.text}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ─── VIEW: CHAT ─── */}
          {view === 'chat' && (
            <>
              {/* Chat Header */}
              <div className="bg-[#0fafb8] px-4 py-3 flex items-center gap-3">
                <button
                  onClick={() => setView('home')}
                  className="text-[#073b45] hover:opacity-60 transition-opacity"
                >
                  <ArrowLeft size={20} strokeWidth={2.5} />
                </button>
                <div>
                  <p className="font-extrabold text-[#073b45] text-[14px] leading-tight">{PHARMACY_NAME}</p>
                </div>
              </div>

              {/* Messages */}
              <div
                className="flex-1 overflow-y-auto bg-white px-4 py-4 flex flex-col gap-3"
                style={{ minHeight: '280px', maxHeight: '340px' }}
              >
                {messages.map(msg => (
                  <div key={msg.id} className={`flex flex-col ${msg.from === 'user' ? 'items-end' : 'items-start'}`}>
                    {msg.from === 'bot' ? (
                      <div className="bg-gray-100 text-gray-800 rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[85%]">
                        <p className="text-[13px] whitespace-pre-line leading-relaxed">{msg.text}</p>
                        {msg.isAuto && <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                          <span>↺</span> Automated · {msg.time || getTime()}
                        </p>}
                      </div>
                    ) : (
                      <div className="bg-[#0fafb8] text-[#073b45] rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[75%]">
                        <p className="text-[13px] leading-relaxed">{msg.text}</p>
                        <p className="text-[10px] text-[#073b45]/60 mt-1 text-right">{msg.time}</p>
                      </div>
                    )}
                  </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex items-start">
                    <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-2.5">
                      <div className="flex gap-1 items-center h-4">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Leave note */}
              <div className="bg-white px-4 pt-0 pb-1 text-center">
                <p className="text-[10px] text-[#0A66C2] leading-tight">
                  If you leave the chat, you will be notified by email when {PHARMACY_NAME} replies
                </p>
              </div>

              {/* Input */}
              <div className="bg-white border-t border-gray-100 px-3 py-2 flex items-center gap-2">
                <button className="text-gray-400 hover:text-gray-600 transition-colors p-1">
                  <ImagePlus size={18} />
                </button>
                <input
                  type="text"
                  value={inputVal}
                  onChange={e => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Write message"
                  className="flex-1 text-[13px] outline-none text-gray-700 placeholder:text-gray-400 bg-transparent"
                />
                <button
                  onClick={() => sendMessage(inputVal)}
                  disabled={!inputVal.trim()}
                  className="text-primary hover:opacity-70 disabled:opacity-30 transition-opacity p-1"
                >
                  <Send size={18} />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}

export default FloatingChat
