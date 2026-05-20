import { useState, useEffect, useRef } from 'react';
import type { ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Terminal, ShieldCheck, Box, Code, Layers, Smartphone, Zap, Play } from 'lucide-react';
import { Highlight, themes } from 'prism-react-renderer';

// --- Reusable 3D Floating Background ---
const FloatingShards = () => {
  const shards = Array.from({ length: 15 });
  return (
    <>
      {shards.map((_, i) => {
        const size = Math.random() * 60 + 20;
        return (
          <div
            key={i}
            className="shard"
            style={{
              width: `${size}px`,
              height: `${size * (Math.random() > 0.5 ? 2 : 0.5)}px`,
              left: `${Math.random() * 100}vw`,
              top: `${Math.random() * 100}vh`,
              clipPath: Math.random() > 0.5 ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none',
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 20 + 15}s`
            }}
          />
        );
      })}
    </>
  );
};

// --- Interactive Code Block Mechanic ---
const InteractiveCodeBlock = ({ code, language = 'java', keyword, output }: { code: string, language?: string, keyword: string, output: string }) => {
  const [inputValue, setInputValue] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [running, setRunning] = useState(false);
  const [runProgress, setRunProgress] = useState(0);
  const [showTerminal, setShowTerminal] = useState(false);
  const [terminalText, setTerminalText] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    
    if (keyword.startsWith(val.toLowerCase())) {
      if (val.toLowerCase() === keyword.toLowerCase()) {
        setUnlocked(true);
      }
    } else {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 400);
      setInputValue(val.slice(0, -1)); // prevent wrong typing
    }
  };

  const handleRun = () => {
    setRunning(true);
    let prog = 0;
    const interval = setInterval(() => {
      prog += 5;
      setRunProgress(prog);
      if (prog >= 100) {
        clearInterval(interval);
        setRunning(false);
        setShowTerminal(true);
        typeOutput();
      }
    }, 50);
  };

  const typeOutput = () => {
    let i = 0;
    setTerminalText('');
    const typeInterval = setInterval(() => {
      setTerminalText(output.slice(0, i));
      i++;
      if (i > output.length) {
        clearInterval(typeInterval);
      }
    }, 30);
  };

  return (
    <div className="code-unlock-container">
      {!unlocked && (
        <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
          <p className="cyan-text" style={{ marginBottom: '0.5rem' }}>🔐 Type the keyword to unlock this code:</p>
          <input 
            type="text" 
            className={`unlock-input ${isShaking ? 'shake' : ''}`}
            value={inputValue}
            onChange={handleInputChange}
            placeholder={`Hint starts with "${keyword[0]}" (length: ${keyword.length})`}
            autoComplete="off"
            spellCheck="false"
          />
        </div>
      )}

      <div className={`code-container ${unlocked ? 'unlocked' : 'blurred'}`}>
        <div className="code-header">
          <span style={{ color: '#8B94B0', fontSize: '0.8rem' }}>{language}</span>
        </div>
        <div style={{ padding: '1.2rem', overflowX: 'auto', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Highlight theme={themes.dracula} code={code} language={language}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre className={className} style={{ ...style, background: 'transparent', margin: 0 }}>
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line, key: i })}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        </div>
      </div>

      {unlocked && !showTerminal && !running && (
        <motion.button 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="run-btn" onClick={handleRun}
        >
          <Play size={18} /> RUN PROGRAM
        </motion.button>
      )}

      {running && (
        <div className="loading-bar-container">
          <div className="loading-bar" style={{ width: `${runProgress}%` }}></div>
        </div>
      )}

      {showTerminal && (
        <motion.div 
          className="output-terminal"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        >
          {terminalText.split('\n').map((line, idx) => (
            <div key={idx}>{line}</div>
          ))}
          <div className="blinking-cursor"></div>
        </motion.div>
      )}
    </div>
  );
};

// --- Framer Motion Variants ---
const slideVariants = {
  initial: { 
    opacity: 0, 
    rotateY: 90, 
    rotateX: -20, 
    scale: 0.5, 
    z: -1000 
  },
  animate: { 
    opacity: 1, 
    rotateY: 0, 
    rotateX: 0, 
    scale: 1, 
    z: 0,
    transition: { duration: 0.8 }
  },
  exit: { 
    opacity: 0, 
    rotateY: -90, 
    rotateX: 20, 
    scale: 1.5,
    z: 500,
    transition: { duration: 0.6 }
  }
};

// --- Slides Data ---
const slidesData = [
  {
    id: 1,
    content: (
      <div className="flex-col justify-center items-center h-full w-full">
        <motion.div animate={{ rotateY: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} style={{ marginBottom: '2rem' }}>
          <Code size={100} color="var(--cyan-glow)" strokeWidth={1.5} />
        </motion.div>
        <h1 className="title" style={{ maxWidth: '1000px' }}>
          Control Statements & Encapsulation
        </h1>
        <p className="cyan-text" style={{ fontSize: '1.5rem', marginTop: '1rem', letterSpacing: '4px' }}>JAVA SYSTEM OVERRIDE</p>
      </div>
    )
  },
  {
    id: 2,
    title: "Introduction to Java",
    icon: <Terminal size={40} color="var(--pink-glow)" />,
    content: (
      <div className="grid-2 w-full h-full">
        <div className="glass-card flex-col">
          <h3 style={{ fontSize: '2rem' }}>What is Java?</h3>
          <p className="body-text">
            Java is a high-level, object-oriented programming language developed by Sun Microsystems in 1995. It is widely used for building software applications.
          </p>
          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }} className="pink-text">Main Features:</h3>
            <ul className="body-text flex-col" style={{ gap: '0.8rem', paddingLeft: '1.5rem' }}>
              <li>Platform Independent <span className="green-text">("Write Once, Run Anywhere")</span></li>
              <li>Object-Oriented</li>
              <li>Secure and Robust</li>
              <li>Simple and Easy to Learn</li>
            </ul>
          </div>
        </div>
        <div className="glass-card flex-col justify-center">
          <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', textAlign: 'center' }}>Where Java is Used</h3>
          <div className="grid-2">
            {[
              { label: 'Web Apps', icon: <Layers /> },
              { label: 'Android Apps', icon: <Smartphone /> },
              { label: 'Banking', icon: <ShieldCheck /> },
              { label: 'Desktop Apps', icon: <Box /> }
            ].map((item, idx) => (
              <div key={idx} className="flex-col items-center" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid rgba(0,240,255,0.2)' }}>
                <div style={{ color: 'var(--cyan-glow)', marginBottom: '0.5rem' }}>{item.icon}</div>
                <span style={{ fontWeight: 600 }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
  {
    id: 3,
    title: "Control Statements",
    icon: <Zap size={40} color="var(--pink-glow)" />,
    content: (
      <div className="flex-col h-full w-full justify-center">
        <p className="body-text" style={{ fontSize: '1.6rem', textAlign: 'center', maxWidth: '900px', margin: '0 auto 4rem auto' }}>
          Control statements are used to control the flow of execution in a program. They decide which block of code runs and how many times it runs.
        </p>
        <div className="grid-3">
          {[
            { title: 'Decision-Making', desc: 'if, if-else, switch', color: 'var(--cyan-glow)' },
            { title: 'Looping', desc: 'for, while, do-while', color: 'var(--pink-glow)' },
            { title: 'Jump', desc: 'break, continue', color: 'var(--neon-green)' }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              className="glass-card flex-col items-center justify-center text-center"
              whileHover={{ rotateY: 15, rotateX: 15 }}
              style={{ padding: '3rem 2rem', borderTop: `3px solid ${item.color}` }}
            >
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: item.color, textShadow: `0 0 10px ${item.color}` }}>{item.title}</h3>
              <p className="body-text">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 4,
    title: "Decision-Making Statements",
    content: (
      <div className="grid-3 w-full h-full" style={{ gap: '1.5rem' }}>
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 className="pink-text" style={{ marginBottom: '1rem' }}>if statement</h3>
          <InteractiveCodeBlock 
            keyword="if"
            code={`int num = 10;
if(num > 0){
  System.out.print("Pos");
}`}
            output="Positive"
          />
        </div>
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 className="pink-text" style={{ marginBottom: '1rem' }}>if-else statement</h3>
          <InteractiveCodeBlock 
            keyword="else"
            code={`int age = 17;
if(age >= 18){
  System.out.print("Adult");
} else {
  System.out.print("Minor");
}`}
            output="Minor"
          />
        </div>
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 className="pink-text" style={{ marginBottom: '1rem' }}>switch statement</h3>
          <InteractiveCodeBlock 
            keyword="switch"
            code={`int d = 3;
switch(d){
  case 1: System.out.print("Mon"); break;
  case 3: System.out.print("Wed"); break;
  default: System.out.print("Other");
}`}
            output="Wed"
          />
        </div>
      </div>
    )
  },
  {
    id: 5,
    title: "Looping Statements",
    content: (
      <div className="grid-3 w-full h-full" style={{ gap: '1.5rem' }}>
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 className="cyan-text" style={{ marginBottom: '1rem' }}>for loop</h3>
          <InteractiveCodeBlock 
            keyword="for"
            code={`for(int i = 1; i <= 5; i++){
    System.out.print(i + " ");
}`}
            output="1 2 3 4 5"
          />
        </div>
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 className="cyan-text" style={{ marginBottom: '1rem' }}>while loop</h3>
          <InteractiveCodeBlock 
            keyword="while"
            code={`int i = 1;
while(i <= 5){
    System.out.print(i + " ");
    i++;
}`}
            output="1 2 3 4 5"
          />
        </div>
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 className="cyan-text" style={{ marginBottom: '1rem' }}>do-while loop</h3>
          <InteractiveCodeBlock 
            keyword="do"
            code={`int i = 1;
do{
    System.out.print(i + " ");
    i++;
} while(i <= 5);
`}
            output="1 2 3 4 5"
          />
        </div>
      </div>
    )
  },
  {
    id: 6,
    title: "Jump Statements",
    content: (
      <div className="grid-2 w-full h-full">
        <div className="glass-card">
          <h3 className="neon-green" style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--neon-green)' }}>break</h3>
          <p className="body-text" style={{ marginBottom: '1rem' }}>Stops the loop immediately.</p>
          <InteractiveCodeBlock 
            keyword="break"
            code={`for(int i = 1; i <= 5; i++){
    if(i == 3){
        break;
    }
    System.out.print(i + " ");
}`}
            output="1 2"
          />
        </div>
        <div className="glass-card">
          <h3 className="neon-green" style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--neon-green)' }}>continue</h3>
          <p className="body-text" style={{ marginBottom: '1rem' }}>Skips the current iteration.</p>
          <InteractiveCodeBlock 
            keyword="continue"
            code={`for(int i = 1; i <= 5; i++){
    if(i == 3){
        continue;
    }
    System.out.print(i + " ");
}`}
            output="1 2 4 5"
          />
        </div>
      </div>
    )
  },
  {
    id: 7,
    title: "Introduction to Encapsulation",
    icon: <ShieldCheck size={40} color="var(--pink-glow)" />,
    content: (
      <div className="grid-2 w-full h-full items-center">
        <div className="flex-col">
          <p className="body-text" style={{ fontSize: '1.8rem', lineHeight: '1.5' }}>
            Encapsulation means wrapping data and methods together into a single unit called a <span className="pink-text">class</span>.
          </p>
          
          <div className="glass-card mt-8 text-left" style={{ marginTop: '2rem' }}>
            <h3 className="cyan-text" style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Why it is Important:</h3>
            <ul className="body-text flex-col" style={{ gap: '1rem', paddingLeft: '1.5rem', fontSize: '1.3rem' }}>
              <li>Protects data</li>
              <li>Hides internal complexity</li>
              <li>Makes code easier to maintain</li>
            </ul>
          </div>
        </div>
        
        <div className="flex-col justify-center items-center">
          <motion.div 
            className="glass-card flex-col items-center text-center"
            style={{ padding: '4rem', borderColor: 'var(--pink-glow)' }}
            animate={{ rotateY: [0, 20, 0, -20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <ShieldCheck size={80} color="var(--pink-glow)" style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Data Hiding</h3>
            <p className="body-text">Variables are kept private and accessed using methods.</p>
          </motion.div>
        </div>
      </div>
    )
  },
  {
    id: 8,
    title: "Getters and Setters",
    content: (
      <div className="grid-2 w-full h-full">
        <div className="glass-card">
          <InteractiveCodeBlock 
            keyword="private"
            code={`class Student {
    private int marks;

    public void setMarks(int m){
        marks = m;
    }
    public int getMarks(){
        return marks;
    }
}
// Using the class:
Student s = new Student();
s.setMarks(85);
System.out.println(s.getMarks());`}
            output="85"
          />
        </div>
        <div className="glass-card flex-col justify-center">
          <h3 className="pink-text" style={{ fontSize: '2rem', marginBottom: '2rem' }}>Explanation:</h3>
          <ul className="body-text flex-col" style={{ gap: '1.5rem', listStyleType: 'none', padding: 0 }}>
            <li><span className="pink-text" style={{fontSize:'1.5rem'}}>private</span> hides the variable</li>
            <li><span className="cyan-text" style={{fontSize:'1.5rem'}}>setter</span> method stores value</li>
            <li><span className="cyan-text" style={{fontSize:'1.5rem'}}>getter</span> method returns value</li>
            <li className="green-text">protects data from direct access</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 9,
    title: "Real-Life Example of Encapsulation",
    content: (
      <div className="flex-col h-full w-full justify-center gap-2" style={{ gap: '2rem' }}>
        <div className="grid-2" style={{ gap: '2rem' }}>
          <div className="glass-card flex-col items-center text-center">
            <Box size={50} color="var(--cyan-glow)" style={{marginBottom: '1rem'}}/>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>ATM Example</h3>
            <p className="body-text">Users interact using buttons and screens, but the internal banking system remains hidden.</p>
          </div>
          <div className="glass-card flex-col items-center text-center">
            <Smartphone size={50} color="var(--cyan-glow)" style={{marginBottom: '1rem'}}/>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Mobile Password</h3>
            <p className="body-text">Phone data stays protected and can only be accessed using the correct password.</p>
          </div>
        </div>
        <div className="glass-card" style={{ textAlign: 'center', padding: '2rem', borderColor: 'var(--neon-green)' }}>
          <h3 className="green-text" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Key Idea:</h3>
          <p className="body-text" style={{ fontSize: '1.5rem', color: 'white' }}>Encapsulation protects internal data and allows controlled access.</p>
        </div>
      </div>
    )
  },
  {
    id: 10,
    title: "Comparison",
    content: (
      <div className="grid-2 w-full h-full">
        <div className="glass-card flex-col items-center text-center" style={{ borderTop: '4px solid var(--cyan-glow)' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Control Statements</h2>
          <ul className="body-text flex-col text-left" style={{ gap: '2rem', fontSize: '1.1rem', width: '100%', padding: '0 2rem' }}>
            <li style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--glass-border)' }}>Control program flow</li>
            <li style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--glass-border)' }}>Used in conditions and loops</li>
            <li style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--glass-border)' }}>Helps decision-making</li>
          </ul>
        </div>
        <div className="glass-card flex-col items-center text-center" style={{ borderTop: '4px solid var(--pink-glow)' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Encapsulation</h2>
          <ul className="body-text flex-col text-left" style={{ gap: '2rem', fontSize: '1.1rem', width: '100%', padding: '0 2rem' }}>
            <li style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--glass-border)' }}>Protects data</li>
            <li style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--glass-border)' }}>Hides complexity</li>
            <li style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--glass-border)' }}>Uses classes and methods</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 11,
    title: "Advantages & Disadvantages",
    content: (
      <div className="flex-col w-full h-full justify-center gap-2" style={{ gap: '2rem' }}>
        <div className="grid-2" style={{ gap: '2rem' }}>
          <div className="glass-card">
            <h3 className="cyan-text" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Control Statements: Pros</h3>
            <ul className="body-text flex-col" style={{ gap: '0.5rem', paddingLeft: '1.5rem' }}>
              <li>Makes programs dynamic</li>
              <li>Helps automate repetition</li>
            </ul>
          </div>
          <div className="glass-card" style={{ borderColor: 'rgba(255,0,0,0.5)' }}>
            <h3 style={{ color: '#ff2d78', fontSize: '1.5rem', marginBottom: '1rem' }}>Control Statements: Cons</h3>
            <ul className="body-text flex-col" style={{ gap: '0.5rem', paddingLeft: '1.5rem' }}>
              <li>Nested conditions are confusing</li>
              <li>Infinite loops may occur</li>
            </ul>
          </div>
        </div>
        <div className="grid-2" style={{ gap: '2rem' }}>
          <div className="glass-card">
            <h3 className="cyan-text" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Encapsulation: Pros</h3>
            <ul className="body-text flex-col" style={{ gap: '0.5rem', paddingLeft: '1.5rem' }}>
              <li>Provides security</li>
              <li>Easier maintenance</li>
            </ul>
          </div>
          <div className="glass-card" style={{ borderColor: 'rgba(255,0,0,0.5)' }}>
            <h3 style={{ color: '#ff2d78', fontSize: '1.5rem', marginBottom: '1rem' }}>Encapsulation: Cons</h3>
            <ul className="body-text flex-col" style={{ gap: '0.5rem', paddingLeft: '1.5rem' }}>
              <li>Requires extra methods</li>
              <li>Increases code length</li>
            </ul>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 12,
    title: "Conclusion",
    content: (
      <div className="flex-col h-full w-full justify-center items-center">
        <motion.div 
          className="glass-card flex-col justify-center" 
          style={{ width: '100%', maxWidth: '900px', border: '2px solid var(--neon-green)', padding: '4rem', textAlign: 'center' }}
          animate={{ boxShadow: ['0 0 20px #39ff14', '0 0 60px #39ff14', '0 0 20px #39ff14'] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <h2 style={{ fontSize: '3rem', marginBottom: '2rem' }} className="green-text">SYSTEM COMPLETE</h2>
          <ul className="body-text flex-col text-left" style={{ gap: '1.5rem', fontSize: '1.3rem', display: 'inline-block', margin: '0 auto' }}>
            <li><span className="cyan-text">Control Structures:</span> if/else, switch, loops (for, while, do-while)</li>
            <li><span className="pink-text">Encapsulation:</span> hiding data using private fields + public getters/setters</li>
            <li><span className="green-text">Benefits:</span> code reusability, security, maintainability</li>
          </ul>
          <p className="body-text" style={{ marginTop: '3rem', fontSize: '1.4rem', fontWeight: 'bold', color: 'white', fontStyle: 'italic' }}>
            "Mastering these concepts forms the backbone of robust Java programming."
          </p>
        </motion.div>
      </div>
    )
  }
];

// --- Main App Component ---
const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    if (currentSlide < slidesData.length - 1) setCurrentSlide(p => p + 1);
  };
  const handlePrev = () => {
    if (currentSlide > 0) setCurrentSlide(p => p - 1);
  };

  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      // Ignore keypresses if the user is typing in an input
      if (document.activeElement?.tagName === 'INPUT') return;

      if (e.key === 'ArrowRight' || e.key === ' ') handleNext();
      else if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const x = Math.round((clientX / window.innerWidth) * 100);
    const y = Math.round((clientY / window.innerHeight) * 100);
    containerRef.current.style.setProperty('--mouse-x', `${x}%`);
    containerRef.current.style.setProperty('--mouse-y', `${y}%`);
  };

  const slide = slidesData[currentSlide];

  return (
    <div className="app-container" ref={containerRef} onMouseMove={handleMouseMove}>
      <FloatingShards />
      <div className="ambient-bg" />

      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${((currentSlide + 1) / slidesData.length) * 100}%` }} />
      </div>

      {/* Slide Counter */}
      <div className="slide-counter cyan-text">
        Slide {currentSlide + 1} of {slidesData.length}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="slide"
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {slide.title && (
            <div className="slide-title">
              {slide.icon && slide.icon}
              <span className="cyan-text">{slide.title}</span>
            </div>
          )}
          <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column' }}>
            {slide.content}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="controls">
        <button className="control-btn" onClick={handlePrev} disabled={currentSlide === 0}>
          <ChevronLeft />
        </button>
        <button className="control-btn" onClick={handleNext} disabled={currentSlide === slidesData.length - 1}>
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default App;
