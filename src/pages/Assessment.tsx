import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock, Activity, ShieldAlert, Users, Loader2 } from "lucide-react";

type AssessmentState = "landing" | "questions" | "lead-form" | "results";

const questions = [
  {
    id: 1,
    question: "How do you currently track your compliance requirements?",
    options: [
      { text: "Manual spreadsheets and emails", score: 10 },
      { text: "A mix of tools like Jira and Confluence", score: 20 },
      { text: "A dedicated GRC platform", score: 30 },
      { text: "Automated, continuous compliance monitoring", score: 40 },
    ],
  },
  {
    id: 2,
    question: "How often do you review your security policies and procedures?",
    options: [
      { text: "Rarely, or only when an audit is due", score: 10 },
      { text: "Annually", score: 20 },
      { text: "Quarterly", score: 30 },
      { text: "Continuously, triggered by system changes", score: 40 },
    ],
  },
  {
    id: 3,
    question: "How are your employees trained on compliance and security?",
    options: [
      { text: "We have no formal training program", score: 10 },
      { text: "One-off onboarding sessions", score: 20 },
      { text: "Annual interactive training", score: 30 },
      { text: "Continuous, role-specific training with phishing simulations", score: 40 },
    ],
  },
  {
    id: 4,
    question: "What is your approach to managing third-party vendor risk?",
    options: [
      { text: "We don't formally assess vendors", score: 10 },
      { text: "We send a basic security questionnaire", score: 20 },
      { text: "We require SOC 2 reports from major vendors", score: 30 },
      { text: "Automated vendor risk monitoring and scoring", score: 40 },
    ],
  },
  {
    id: 5,
    question: "How prepared are you for an unexpected compliance audit?",
    options: [
      { text: "Not prepared, it would take weeks to gather evidence", score: 10 },
      { text: "Somewhat prepared, but it would disrupt regular work", score: 20 },
      { text: "Well prepared, evidence is mostly centralized", score: 30 },
      { text: "Always ready, evidence is automatically mapped to controls", score: 40 },
    ],
  },
];

const Assessment = () => {
  const [currentState, setCurrentState] = useState<AssessmentState>("landing");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOptionSelect = (score: number) => {
    setAnswers({ ...answers, [currentQuestionIndex]: score });
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentState("lead-form");
    }
  };

  const calculateScore = () => {
    const totalScore = Object.values(answers).reduce((acc, curr) => acc + curr, 0);
    // Max possible score is 200 (5 questions * 40 points)
    // Convert to percentage
    return Math.round((totalScore / 200) * 100);
  };

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const finalScore = calculateScore();
    const detailedAnswers = questions.map((q, idx) => {
      const selectedScore = answers[idx];
      const selectedOption = q.options.find(opt => opt.score === selectedScore)?.text || "N/A";
      return {
        question: q.question,
        answer: selectedOption,
        score: selectedScore
      };
    });

    try {
      await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name, 
          email, 
          company, 
          phone, 
          score: finalScore, 
          answers: detailedAnswers 
        }),
      });
      setCurrentState("results");
    } catch (err) {
      console.error("Submission failed:", err);
      // Even if it fails, show them results
      setCurrentState("results");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-teal-500/30">
      {/* Simple Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900">ReguLattice</span>
          </a>
          <a href="/" className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">
            Exit Assessment
          </a>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 md:py-20">
        <AnimatePresence mode="wait">
          {currentState === "landing" && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-sm font-semibold uppercase tracking-wider mb-6">
                  Free Assessment
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                  Compliance Posture <br className="hidden md:block" /> Assessment
                </h1>
                <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10">
                  5 questions. 4 key dimensions. 2 minutes. Get your Compliance Readiness Score and a personalized action plan instantly.
                </p>
                <button
                  onClick={() => setCurrentState("questions")}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-xl shadow-teal-600/20"
                >
                  Start Assessment <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-6 text-slate-800">What You Receive</h3>
                <p className="text-slate-500 mb-8">Instantly, at no cost, with no account required to view results.</p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Compliance Snapshot</h4>
                      <p className="text-sm text-slate-500">A structured summary of your organization's current governance posture.</p>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center shrink-0">
                      <Activity className="w-6 h-6 text-rose-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Readiness Score</h4>
                      <p className="text-sm text-slate-500">A 0-100 score quantifying your audit readiness and potential exposure.</p>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Operational Recommendations</h4>
                      <p className="text-sm text-slate-500">Prioritized, actionable steps for each compliance gap specific to your footprint.</p>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                      <ShieldAlert className="w-6 h-6 text-orange-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Risk Visibility</h4>
                      <p className="text-sm text-slate-500">A clear picture of where security gaps exist in your operational chain.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentState === "questions" && (
            <motion.div
              key="questions"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-2xl mx-auto mt-12"
            >
              <div className="mb-8 flex items-center justify-between text-sm font-semibold text-slate-500">
                <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                <span>{Math.round((currentQuestionIndex / questions.length) * 100)}% Completed</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full mb-10 overflow-hidden">
                <motion.div 
                  className="h-full bg-teal-500" 
                  initial={{ width: `${(currentQuestionIndex / questions.length) * 100}%` }}
                  animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                />
              </div>

              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-slate-900 leading-snug">
                {questions[currentQuestionIndex].question}
              </h2>

              <div className="space-y-4">
                {questions[currentQuestionIndex].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleOptionSelect(opt.score)}
                    className="w-full text-left p-6 rounded-2xl border-2 border-slate-200 hover:border-teal-500 hover:bg-teal-50 transition-all font-medium text-slate-700 hover:text-teal-900 group flex items-center justify-between"
                  >
                    <span>{opt.text}</span>
                    <div className="w-5 h-5 rounded-full border-2 border-slate-300 group-hover:border-teal-500 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {currentState === "lead-form" && (
            <motion.div
              key="lead-form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100 mt-8"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-teal-600" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Assessment Complete!</h2>
                <p className="text-slate-500">Enter your details below to generate your score and personalized action plan.</p>
              </div>

              <form onSubmit={handleSubmitLead} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Work Email <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                    placeholder="jane@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Company</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                    placeholder="Acme Corp"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone (Optional)</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                    placeholder="+1 234 567 890"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 mt-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all disabled:opacity-70"
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "See My Results"}
                </button>
              </form>
            </motion.div>
          )}

          {currentState === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 text-center mb-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-400 to-emerald-400" />
                <h2 className="text-3xl font-bold mb-2">Your Compliance Posture Score</h2>
                <p className="text-slate-500 mb-8">Based on your responses, here is your calculated readiness.</p>
                
                <div className="w-48 h-48 mx-auto rounded-full border-[12px] border-teal-100 flex items-center justify-center mb-8 relative">
                  <div className="absolute inset-0 rounded-full border-[12px] border-teal-500 border-t-transparent border-r-transparent transform -rotate-45" />
                  <div className="text-5xl font-extrabold text-slate-900">{calculateScore()}<span className="text-2xl text-slate-400">/100</span></div>
                </div>

                <div className="max-w-2xl mx-auto bg-slate-50 p-6 rounded-2xl">
                  <h3 className="font-bold text-lg mb-2">Next Steps</h3>
                  <p className="text-slate-600 mb-6">
                    A score of {calculateScore()} indicates room for improvement. While you have some foundational elements, moving towards an automated GRC system will drastically reduce audit times and compliance risks.
                  </p>
                  <a href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 transition-colors">
                    Return Home
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Assessment;
