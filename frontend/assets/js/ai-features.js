/* ═══════════════════════════════════════════════════════
   AI FEATURES — Gopolang Mmutlwane Portfolio
   1. Smart AI Greeting (time-based + contextual)
   2. Sentiment Analysis Demo
   3. AI Chatbot Assistant
   ═══════════════════════════════════════════════════════ */

// ─── 1. SMART AI GREETING ─────────────────────────────
(function initSmartGreeting(){
    const el = document.getElementById("ai-greeting");
    if(!el) return;

    const hour = new Date().getHours();
    let timeGreeting, emoji, subtext;

    if(hour >= 5 && hour < 12){
        timeGreeting = "Good morning";
        emoji = "☀️";
        subtext = "Starting the day with data? Let's explore.";
    } else if(hour >= 12 && hour < 17){
        timeGreeting = "Good afternoon";
        emoji = "🌤️";
        subtext = "Great time to discover some ML projects.";
    } else if(hour >= 17 && hour < 21){
        timeGreeting = "Good evening";
        emoji = "🌅";
        subtext = "Winding down? Take a look at my latest work.";
    } else {
        timeGreeting = "Hey, night owl";
        emoji = "🌙";
        subtext = "Late-night browsing? You'll find cool stuff here.";
    }

    const greetingText = `${emoji} ${timeGreeting}! Welcome to my portfolio.`;

    // Typewriter effect
    let i = 0;
    const mainEl = el.querySelector(".greeting-main");
    const subEl = el.querySelector(".greeting-sub");
    mainEl.textContent = "";
    subEl.textContent = "";
    subEl.style.opacity = "0";

    function typeChar(){
        if(i < greetingText.length){
            mainEl.textContent += greetingText.charAt(i);
            i++;
            setTimeout(typeChar, 35);
        } else {
            subEl.textContent = subtext;
            subEl.style.opacity = "1";
        }
    }
    setTimeout(typeChar, 800);
})();


// ─── 2. SENTIMENT ANALYSIS DEMO ──────────────────────
(function initSentimentDemo(){
    const form = document.getElementById("sentiment-form");
    const input = document.getElementById("sentiment-input");
    const result = document.getElementById("sentiment-result");
    if(!form || !input || !result) return;

    // Simple rule-based sentiment model (no API needed)
    const positiveWords = [
        "good","great","excellent","amazing","wonderful","fantastic","awesome",
        "love","happy","joy","brilliant","perfect","best","beautiful","nice",
        "outstanding","superb","impressive","incredible","remarkable","success",
        "win","exciting","delightful","pleased","grateful","thanks","thank",
        "appreciate","enjoy","fun","cool","innovative","powerful","strong",
        "talented","smart","clever","genius","helpful","kind","positive"
    ];
    const negativeWords = [
        "bad","terrible","awful","horrible","hate","angry","sad","worst",
        "poor","ugly","fail","failure","wrong","broken","boring","stupid",
        "annoying","disappointed","disappointing","useless","weak","painful",
        "disgusting","dreadful","pathetic","mediocre","negative","problem",
        "issue","bug","error","crash","slow","waste","frustrating","difficult"
    ];
    const intensifiers = ["very","really","extremely","absolutely","totally","so","super","incredibly"];

    function analyzeSentiment(text){
        const words = text.toLowerCase().replace(/[^a-z\s]/g, "").split(/\s+/);
        let score = 0;
        let intensity = 1;
        const found = { positive: [], negative: [] };

        words.forEach((word, idx) => {
            if(intensifiers.includes(word)){
                intensity = 1.5;
                return;
            }
            if(positiveWords.includes(word)){
                score += 1 * intensity;
                found.positive.push(word);
            } else if(negativeWords.includes(word)){
                score -= 1 * intensity;
                found.negative.push(word);
            }
            intensity = 1;
        });

        // Check for negation
        const negations = ["not","no","never","don't","doesn't","didn't","isn't","aren't","wasn't","won't","can't","couldn't"];
        words.forEach((word, idx) => {
            if(negations.includes(word) && idx < words.length - 1){
                score *= -0.5;
            }
        });

        // Normalize to -1 to 1
        const maxScore = Math.max(words.length * 0.3, 1);
        const normalized = Math.max(-1, Math.min(1, score / maxScore));

        let label, color, icon, confidence;
        if(normalized > 0.15){
            label = "Positive";
            color = "#10b981";
            icon = "😊";
            confidence = Math.min(99, Math.round(50 + normalized * 45));
        } else if(normalized < -0.15){
            label = "Negative";
            color = "#ef4444";
            icon = "😔";
            confidence = Math.min(99, Math.round(50 + Math.abs(normalized) * 45));
        } else {
            label = "Neutral";
            color = "#f59e0b";
            icon = "😐";
            confidence = Math.round(40 + Math.random() * 20);
        }

        return { label, color, icon, confidence, score: normalized, found };
    }

    form.addEventListener("submit", function(e){
        e.preventDefault();
        const text = input.value.trim();
        if(!text) return;

        // Show analyzing state
        result.innerHTML = `<div class="sentiment-analyzing"><div class="analyzing-dots"><span></span><span></span><span></span></div><span>Analyzing sentiment...</span></div>`;
        result.style.display = "block";

        setTimeout(() => {
            const analysis = analyzeSentiment(text);

            result.innerHTML = `
                <div class="sentiment-output" style="border-color: ${analysis.color}">
                    <div class="sentiment-header">
                        <span class="sentiment-emoji">${analysis.icon}</span>
                        <div>
                            <div class="sentiment-label" style="color: ${analysis.color}">${analysis.label}</div>
                            <div class="sentiment-confidence">Confidence: ${analysis.confidence}%</div>
                        </div>
                    </div>
                    <div class="sentiment-bar-track">
                        <div class="sentiment-bar-fill" style="width: ${Math.abs(analysis.score) * 100}%; background: ${analysis.color}"></div>
                    </div>
                    <div class="sentiment-detail">
                        ${analysis.found.positive.length ? `<span class="detail-positive">Positive cues: ${analysis.found.positive.join(", ")}</span>` : ""}
                        ${analysis.found.negative.length ? `<span class="detail-negative">Negative cues: ${analysis.found.negative.join(", ")}</span>` : ""}
                        ${(!analysis.found.positive.length && !analysis.found.negative.length) ? `<span class="detail-neutral">No strong sentiment detected</span>` : ""}
                    </div>
                </div>
            `;
        }, 800);
    });
})();


// ─── 3. AI CHATBOT ASSISTANT ──────────────────────────
(function initChatbot(){
    const toggle = document.getElementById("chatbot-toggle");
    const panel = document.getElementById("chatbot-panel");
    const closeBtn = document.getElementById("chatbot-close");
    const chatForm = document.getElementById("chatbot-form");
    const chatInput = document.getElementById("chatbot-input");
    const chatMessages = document.getElementById("chatbot-messages");
    if(!toggle || !panel) return;

    const NAME = "Gopolang Mmutlwane";

    // Intent matching — ordered by specificity (most specific first)
    const intents = [

        // ── Education ──
        { patterns: ["where did you study","where did he study","where did i study","which university","which school","what university","what school","where study","studied where"],
          response: () => `${NAME} studied at university and earned a <strong>BSc in Mathematical Science</strong> majoring in Mathematics & Computer Science (2019–2024). He's based in <strong>Johannesburg, South Africa</strong>.` },

        { patterns: ["education","study","degree","graduate","qualification","bsc","bachelor","math","diploma","matric"],
          response: () => `${NAME} holds a <strong>BSc in Mathematical Science</strong> (Mathematics & Computer Science) which he completed between 2019 and 2024. This strong mathematical foundation is what powers his data science and ML work.` },

        // ── Thesis / Final Year ──
        { patterns: ["thesis","final year","healthcare","readmission","capstone"],
          response: () => `For his <strong>final year thesis (2024)</strong>, ${NAME} developed machine learning models to predict patient readmission rates using clinical data. He achieved <strong>82% accuracy</strong> using ensemble methods and feature engineering techniques. Tags: Machine Learning, Healthcare Analytics, Python.` },

        // ── Specific Projects ──
        { patterns: ["churn","customer churn","telecom"],
          response: () => `<strong>Customer Churn Prediction</strong> — Built a predictive model achieving <strong>85% accuracy</strong> using Random Forest. Used advanced feature engineering and SMOTE for class imbalance. Impact: reduced churn by 30% and saved $1.5M annually (450% ROI). Tech: Python, Scikit-learn, Pandas.` },

        { patterns: ["fraud","fraud detection","transaction"],
          response: () => `<strong>Real-Time Fraud Detection System</strong> — Deployed an ensemble of Isolation Forest + LSTM neural network for a financial institution processing 1M+ daily transactions. Achieved <strong>94% precision</strong> with 45ms latency, preventing <strong>$4.2M</strong> in fraudulent transactions. Tech: Python, TensorFlow, Kafka.` },

        { patterns: ["sentiment","nlp","text analysis","bert","natural language"],
          response: () => `<strong>Sentiment Analysis System</strong> — Real-time sentiment analysis using a fine-tuned BERT model. Processes 1000+ reviews/minute with <strong>92% accuracy</strong> for multi-class classification. You can actually try a live demo on this portfolio — scroll to the "Try My Sentiment Analyzer" section! Tech: Python, PyTorch, BERT.` },

        { patterns: ["dashboard","sales","power bi","bi","business intelligence","analytics dashboard"],
          response: () => `<strong>Sales Analytics Dashboard</strong> — An interactive BI dashboard with real-time sales tracking, predictive analytics, and automated reporting. Built for data-driven decision making. Tech: Power BI, DAX, SQL.` },

        { patterns: ["image classif","computer vision","cnn","image recognition","visual"],
          response: () => `<strong>Image Classification Model</strong> — Multi-class image classifier using CNN with transfer learning. Achieved <strong>92% accuracy</strong> on a 10-class dataset with data augmentation techniques. Tech: Python, Keras, OpenCV.` },

        { patterns: ["recommend","recommendation","collaborative","content-based"],
          response: () => `<strong>Recommendation Engine</strong> — A hybrid recommendation system combining collaborative filtering and content-based methods. Increased user engagement by <strong>35%</strong> and serves 100K+ users. Tech: Python, Surprise, Flask.` },

        { patterns: ["economic","time series","forecast","statistical analysis study"],
          response: () => `<strong>Statistical Analysis: Economic Trends Study (2023)</strong> — Conducted comprehensive statistical analysis of economic indicators using time series forecasting. Presented findings at a university research symposium. Tech: Statistics, Time Series, R.` },

        // ── All Projects Overview ──
        { patterns: ["project","portfolio","all project","work","what have you built","what did you build","busy with","working on","current project"],
          response: () => `${NAME} has <strong>a growing portfolio of projects</strong>. Here are the key ones:<br><br>🔹 <strong>Customer Churn Prediction</strong> — 85% accuracy, Random Forest (Python, Scikit-learn)<br>🔹 <strong>Fraud Detection System</strong> — 94% precision, LSTM + Isolation Forest (TensorFlow, Kafka)<br>🔹 <strong>Sentiment Analysis</strong> — 92% accuracy, fine-tuned BERT (PyTorch)<br>🔹 <strong>Sales Analytics Dashboard</strong> — Real-time BI (Power BI, DAX, SQL)<br>🔹 <strong>Image Classification</strong> — 92% accuracy, CNN (Keras, OpenCV)<br>🔹 <strong>Recommendation Engine</strong> — 35% engagement boost (Flask, Surprise)<br>🔹 <strong>Healthcare Thesis</strong> — Patient readmission prediction (2024)<br>🔹 <strong>Economic Trends Study</strong> — Time series analysis (R)<br><br>Ask me about any specific project for more details!` },

        // ── Skills & Tech ──
        { patterns: ["python","programming language","what language","coding language"],
          response: () => `${NAME}'s top programming languages:<br>🐍 <strong>Python</strong> — 90% proficiency (primary language)<br>📊 <strong>R</strong> — 75% proficiency<br>🗃️ <strong>SQL</strong> — 80% proficiency<br><br>Python is his go-to for everything from ML modeling to data pipelines.` },

        { patterns: ["skill","tech","stack","tool","framework","technology","what can you do","what do you know"],
          response: () => `${NAME}'s full tech stack:<br><br>📝 <strong>Languages:</strong> Python (90%), R (75%), SQL (80%)<br>🤖 <strong>ML/DL:</strong> Scikit-learn (85%), TensorFlow (70%), PyTorch (65%), Keras<br>📊 <strong>Data Tools:</strong> Pandas, NumPy, Matplotlib, Power BI<br>☁️ <strong>Cloud & DevOps:</strong> AWS, Docker, Git<br><br><strong>Expertise areas:</strong><br>• Machine Learning — Supervised/Unsupervised, Ensemble Methods, Feature Engineering (90%)<br>• Deep Learning — CNN, RNN, LSTM, Transfer Learning, NLP (85%)<br>• Data Engineering — ETL Pipelines, Spark, Cloud Architecture (80%)<br>• Data Analysis — Statistics, A/B Testing, Visualization, BI Dashboards (95%)` },

        { patterns: ["tensorflow","pytorch","keras","scikit","sklearn","machine learning framework","deep learning framework","ml framework"],
          response: () => `${NAME}'s ML/DL framework proficiency:<br>📦 <strong>Scikit-learn</strong> — 85% (go-to for classical ML)<br>🔥 <strong>TensorFlow</strong> — 70% (used in fraud detection, production models)<br>⚡ <strong>PyTorch</strong> — 65% (used for BERT fine-tuning, NLP)<br>🧠 <strong>Keras</strong> — Used for CNN image classification projects` },

        // ── Expertise Areas ──
        { patterns: ["machine learning","ml","supervised","unsupervised","ensemble"],
          response: () => `${NAME}'s Machine Learning expertise (90% proficiency):<br>• Supervised & Unsupervised Learning<br>• Ensemble Methods & Boosting (XGBoost, Random Forest)<br>• Feature Engineering & Selection<br>• Model Optimization & Hyperparameter Tuning<br><br>Key projects: Customer Churn Prediction (85% acc), Recommendation Engine (35% engagement boost).` },

        { patterns: ["deep learning","neural network","cnn","rnn","lstm","transfer learning"],
          response: () => `${NAME}'s Deep Learning expertise (85% proficiency):<br>• Neural Networks — CNN, RNN, LSTM<br>• Computer Vision & NLP<br>• Transfer Learning<br>• Model Deployment at Scale<br><br>Key projects: Fraud Detection (LSTM, 94% precision), Image Classification (CNN, 92% acc), Sentiment Analysis (BERT, 92% acc).` },

        { patterns: ["data engineer","etl","pipeline","spark","big data","cloud"],
          response: () => `${NAME}'s Data Engineering expertise (80% proficiency):<br>• ETL Pipeline Development<br>• Big Data Processing with Apache Spark<br>• Database Design & Optimization<br>• Cloud Data Architecture (AWS)<br>• Streaming data with Apache Kafka` },

        { patterns: ["data analysis","statistic","a/b test","visualization","hypothesis","dashboard"],
          response: () => `${NAME}'s Data Analysis expertise (95% proficiency — his strongest area!):<br>• Statistical Analysis & Hypothesis Testing<br>• A/B Testing & Experimentation<br>• Advanced Data Visualization (Matplotlib, Power BI)<br>• Business Intelligence Dashboards<br><br>Key project: Sales Analytics Dashboard built with Power BI, DAX, and SQL.` },

        // ── Achievements & Research ──
        { patterns: ["kaggle","competition","hackathon","award","achievement","accomplish"],
          response: () => `${NAME}'s achievements:<br><br>🏆 <strong>Kaggle Competitions</strong> — Participated in 5+ competitions, best ranking <strong>Top 25%</strong>, published 3 notebooks<br>🥈 <strong>University Hackathon</strong> — <strong>2nd Place</strong> in Data Science Challenge 2023 (24-hour competition)<br>📜 <strong>Certifications</strong> — 3 professional data science certifications completed in 2024<br>📄 <strong>Research</strong> — Final year thesis on healthcare ML + economic time series study presented at research symposium` },

        { patterns: ["certif","certificate","certified"],
          response: () => `${NAME} has earned <strong>3 professional data science certifications</strong>, all completed in 2024. These complement his BSc degree and demonstrate ongoing commitment to the field.` },

        // ── GitHub ──
        { patterns: ["github","repo","repository","open source","code","source code","git"],
          response: () => `${NAME}'s GitHub: <strong>github.com/Gopolang24</strong><br><br>📊 <strong>15+</strong> public repositories<br>💻 <strong>200+</strong> commits in 2024<br>⭐ <strong>25+</strong> stars received<br><br>Featured repos:<br>🔹 <strong>ml-algorithms-from-scratch</strong> — ML algorithms implemented from scratch in Python (⭐12, 🔀3)<br>🔹 <strong>data-analysis-toolkit</strong> — Data analysis scripts & visualization templates (⭐8, 🔀2)` },

        // ── Contact & Location ──
        { patterns: ["contact","email","reach","phone","call","message","connect","get in touch","how to contact"],
          response: () => `You can reach ${NAME} through:<br><br>📧 <strong>Email:</strong> pantsog24@gmail.com<br>📱 <strong>Phone:</strong> +27 66 230 5349<br>💼 <strong>LinkedIn:</strong> linkedin.com/in/gopolang-mmutlwane<br>🐙 <strong>GitHub:</strong> github.com/Gopolang24<br><br>Or use the <strong>Contact section</strong> at the bottom of this portfolio to send a message directly!` },

        { patterns: ["where","location","based","live","city","country","from","johannesburg","south africa"],
          response: () => `${NAME} is based in <strong>Johannesburg, South Africa</strong>. He's open to both local and remote opportunities.` },

        // ── Availability / Hiring ──
        { patterns: ["available","job","position","role","opportunity","hiring","hire","open","looking for","freelance","remote","employ"],
          response: () => `${NAME} is <strong>currently available for opportunities!</strong> He's open to:<br>• Data Scientist roles<br>• Machine Learning Engineer positions<br>• Data Analyst positions<br>• Freelance / contract work<br>• Remote or on-site in Johannesburg, South Africa<br><br>📧 Contact him at pantsog24@gmail.com or use the Contact section to start a conversation.` },

        // ── Who / About ──
        { patterns: ["who","about you","yourself","introduce","tell me about","what do you do"],
          response: () => `${NAME} is a <strong>Data Scientist & Machine Learning Engineer</strong> based in Johannesburg, South Africa. He holds a <strong>BSc in Mathematical Science</strong> (Maths & Computer Science, 2019–2024).<br><br>He specializes in building production-ready ML systems — from predictive analytics to deep learning — transforming complex data into scalable solutions. With a growing portfolio of projects, 85% average model accuracy, and expertise across ML, DL, Data Engineering, and Analytics, he's ready for industry challenges.<br><br>Ask me about his projects, skills, education, or how to hire him!` },

        // ── General greetings ──
        { patterns: ["hello","hi ","hey","greet","sup","what's up","howzit","good morning","good afternoon","good evening"],
          response: () => `Hey there! 👋 I'm ${NAME}'s AI assistant. I know all about his education, projects, skills, achievements, and more. Try asking me:<br><br>• "Where did you study?"<br>• "What projects have you built?"<br>• "Tell me about the fraud detection system"<br>• "What are your skills?"<br>• "How can I contact you?"` },

        { patterns: ["thank","thanks","cheers","appreciate"],
          response: () => `You're welcome! 😊 If you have more questions about ${NAME}, feel free to ask. I'm here to help!` },

        { patterns: ["bye","goodbye","see you","later","peace"],
          response: () => `Goodbye! 👋 Thanks for visiting ${NAME}'s portfolio. Feel free to reach out at pantsog24@gmail.com or through the Contact section. Have a great day!` },

        // ── Fun / Meta ──
        { patterns: ["are you real","are you ai","are you a bot","who made you","how were you built"],
          response: () => `I'm a lightweight AI assistant built right into this portfolio! I don't use any external API — I'm powered by a local knowledge base containing everything about ${NAME}'s education, projects, skills, and achievements. Pretty cool for a static website, right? 😄` },

        { patterns: ["what can i ask","help","what do you know","how do you work","what can you do"],
          response: () => `I can answer questions about ${NAME} including:<br><br>🎓 <strong>Education</strong> — "Where did you study?"<br>💼 <strong>Projects</strong> — "What projects have you built?" or ask about specific ones<br>🛠️ <strong>Skills</strong> — "What's your tech stack?"<br>🏆 <strong>Achievements</strong> — "Tell me about competitions"<br>📍 <strong>Location</strong> — "Where are you based?"<br>📧 <strong>Contact</strong> — "How can I reach you?"<br>💼 <strong>Availability</strong> — "Are you available for hire?"<br>🐙 <strong>GitHub</strong> — "Show me your repos"` },
    ];

    function getResponse(input){
        const lower = input.toLowerCase();

        // Score each intent by how many patterns match
        let bestMatch = null;
        let bestScore = 0;

        for(const intent of intents){
            let score = 0;
            for(const p of intent.patterns){
                if(lower.includes(p)){
                    // Longer patterns score higher (more specific)
                    score += p.length;
                }
            }
            if(score > bestScore){
                bestScore = score;
                bestMatch = intent;
            }
        }

        if(bestMatch && bestScore > 0){
            return bestMatch.response();
        }

        return `I'm not sure about that specific question, but I know a lot about ${NAME}! Try asking about:<br><br>• 🎓 Education — "Where did you study?"<br>• 💼 Projects — "What projects have you worked on?"<br>• 🛠️ Skills — "What's your tech stack?"<br>• 🏆 Achievements — "Tell me about your competitions"<br>• 📧 Contact — "How can I reach you?"<br>• 💼 Hiring — "Are you available?"`;
    }

    // Toggle panel
    toggle.addEventListener("click", () => {
        panel.classList.toggle("open");
        toggle.classList.toggle("open");
        if(panel.classList.contains("open")){
            chatInput.focus();
        }
    });

    closeBtn.addEventListener("click", () => {
        panel.classList.remove("open");
        toggle.classList.remove("open");
    });

    // Add bot message
    function addMessage(text, sender){
        const msg = document.createElement("div");
        msg.className = `chat-msg ${sender}`;
        
        if(sender === "bot"){
            msg.innerHTML = `<div class="msg-avatar"><i class="fas fa-robot"></i></div><div class="msg-bubble">${text}</div>`;
        } else {
            msg.innerHTML = `<div class="msg-bubble">${text}</div>`;
        }
        chatMessages.appendChild(msg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Typing indicator
    function showTyping(){
        const typing = document.createElement("div");
        typing.className = "chat-msg bot typing-indicator";
        typing.innerHTML = `<div class="msg-avatar"><i class="fas fa-robot"></i></div><div class="msg-bubble"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>`;
        chatMessages.appendChild(typing);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return typing;
    }

    // Handle submit
    chatForm.addEventListener("submit", function(e){
        e.preventDefault();
        const text = chatInput.value.trim();
        if(!text) return;

        addMessage(text, "user");
        chatInput.value = "";

        const typingEl = showTyping();

        setTimeout(() => {
            typingEl.remove();
            const response = getResponse(text);
            addMessage(response, "bot");
        }, 600 + Math.random() * 600);
    });

    // Welcome message
    setTimeout(() => {
        addMessage(`Hi! 👋 I'm Gopolang's AI assistant. Ask me anything about his skills, projects, or how to get in touch!`, "bot");
    }, 1000);
})();




