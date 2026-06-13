import { useState } from 'react'

const FeedbackWidget = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center">
      
      {/* The Feedback Vertical Tab (Always visible, pushed left when panel opens) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#1b4e8f] text-white font-medium py-3 px-2 rounded-r-md shadow-md flex items-center justify-center gap-2 hover:bg-[#153e72] transition-colors h-[120px]"
        style={{
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          transform: 'rotate(180deg)'
        }}
      >
        <span className="text-[14px] tracking-widest mt-1">Feedback</span>
        <span className="text-[18px] mb-1 font-light">{isOpen ? '–' : '+'}</span>
      </button>

      {/* The Feedback Panel (Expands to the right of the button) */}
      <div 
        className={`bg-white shadow-xl border border-gray-200 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'w-[320px] opacity-100' : 'w-0 opacity-0'
        }`}
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
      >
        <div className="p-5" style={{ width: '320px' }}>
          <form className="flex flex-col gap-3" onSubmit={(e) => { e.preventDefault(); setIsOpen(false); }}>
            <input 
              type="text" 
              placeholder="Name" 
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-[14px] outline-none focus:border-[#1A9E6E] text-gray-700"
            />
            <input 
              type="email" 
              placeholder="Email" 
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-[14px] outline-none focus:border-[#1A9E6E] text-gray-700"
            />
            <input 
              type="tel" 
              placeholder="Phone Number" 
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-[14px] outline-none focus:border-[#1A9E6E] text-gray-700"
            />
            <textarea 
              placeholder="Message here.." 
              required
              rows={4}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-[14px] outline-none focus:border-[#1A9E6E] text-gray-700 resize-none"
            ></textarea>
            
            <div className="flex justify-center mt-2">
              <button 
                type="submit"
                className="bg-[#00b289] hover:bg-[#009673] text-white font-bold px-8 py-2 rounded-full text-[14px] transition-colors"
              >
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  )
}

export default FeedbackWidget
