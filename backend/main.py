from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uuid
import os
from typing import Dict, List
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")


if not GEMINI_API_KEY:
    print("Warning: GEMINI_API_KEY not configured. The application will not work properly without it.")
    llm = None
else:
    llm = ChatGoogleGenerativeAI(
        model="gemini-2.5-flash",
        google_api_key=GEMINI_API_KEY,
        temperature=0.7
    )


sessions: Dict[str, dict] = {}

class StartInterviewRequest(BaseModel):
    role: str
    seniority: str
    numQuestions: int

class AnswerRequest(BaseModel):
    answer: str

def get_fallback_questions(count: int) -> List[str]:
    """Get generic fallback interview questions."""
    fallback_questions = [
        "Tell me about yourself.",
        "Why do you want to work here?",
        "What are your strengths?",
        "What are your weaknesses?",
        "Where do you see yourself in 5 years?",
        "Can you describe a challenging situation you've faced and how you handled it?",
        "Why are you interested in this position?",
        "How do you handle stress and pressure?",
        "What motivates you?",
        "Describe your ideal work environment."
    ]
    return fallback_questions[:count]

def get_fallback_feedback(session_data: dict) -> dict:
    """Get generic fallback feedback when API calls fail."""
    return {
            "overall_score": 7,
            "strengths": ["Good communication skills", "Relevant experience"],
            "weaknesses": ["Could provide more specific examples"],
            "question_feedback": [
                {
                    "question": answer_data["question"],
                    "answer": answer_data["answer"],
                    "score": 7,
                    "feedback": "Good answer, could elaborate more on specific experiences."
                } for answer_data in session_data["answers"]
            ],
            "feedback_summary": "Strong potential with opportunities for improvement"
        }

@app.post("/interview/start")
async def start_interview(request: StartInterviewRequest):
    """Start a new interview session with generated questions based on role and seniority."""
    session_id = str(uuid.uuid4())
    
    if llm is None:
        print("LLM not initialized due to missing GEMINI_API_KEY")
        questions = get_fallback_questions(request.numQuestions)
    else:
        prompt = f"""
        Generate exactly {request.numQuestions} specific, role-relevant interview questions for a {request.role} position at the {request.seniority} level.
        
        Requirements:
        - Each question should be tailored to the specific role ({request.role})
        - Consider the seniority level ({request.seniority}) when crafting complexity and depth
        - Focus on technical skills, behavioral aspects, and situational judgment relevant to this role
        - Questions should vary in type (behavioral, technical, situational, experience-based)
        - Ensure questions are clear, concise, and professional
        
        Return ONLY a valid JSON array of questions with no additional text before or after.
        Example format: ["Question 1?", "Question 2?", "Question 3?"]
        """
        
        chat_prompt = ChatPromptTemplate.from_messages([("human", prompt)])
        chain = chat_prompt | llm | JsonOutputParser()
         
        try:
            questions = await chain.ainvoke({})
            
            questions = questions[:request.numQuestions]
            
        except Exception as e:
            print(f"Error generating questions: {e}")
            questions = get_fallback_questions(request.numQuestions)
    
    sessions[session_id] = {
        "role": request.role,
        "seniority": request.seniority,
        "questions": questions,
        "answers": [],
        "current_index": 0,
        "started_at": datetime.now()
    }
    
    return {"session_id": session_id}


@app.get("/interview/question")
async def get_question(session_id: str = Query(...)):
    """Get the current question for the interview session."""
    if session_id not in sessions:
        raise HTTPException(status_code=404, detail="Session not found")
    
    session_data = sessions[session_id]
    current_index = session_data["current_index"]
    
    if current_index >= len(session_data["questions"]):
        raise HTTPException(status_code=400, detail="No more questions in this interview")
    
    question_text = session_data["questions"][current_index]
    
    return {"question": question_text}


@app.post("/interview/answer")
async def submit_answer(session_id: str, request: AnswerRequest):
    """Submit an answer to the current question in the interview."""
    if session_id not in sessions:
        raise HTTPException(status_code=404, detail="Session not found")
    
    session_data = sessions[session_id]
    
    session_data["answers"].append({
        "question": session_data["questions"][session_data["current_index"]],
        "answer": request.answer,
        "timestamp": datetime.now()
    })
    
    session_data["current_index"] += 1
    
    if session_data["current_index"] >= len(session_data["questions"]):
        await generate_feedback(session_id)
    
    return {"status": "success"}


async def generate_feedback(session_id: str):
    """Generate feedback when the interview is complete"""
    if session_id not in sessions:
        return
    
    session_data = sessions[session_id]
    
    if llm is None:
        print("LLM not initialized due to missing GEMINI_API_KEY, using fallback feedback")
        session_data["feedback"] = get_fallback_feedback(session_data)
        return
    
    answers_summary = []
    for i, answer_data in enumerate(session_data["answers"]):
        answers_summary.append(f"Q{i+1}: {answer_data['question']}\nA{i+1}: {answer_data['answer']}")
    
    num_answers = len(session_data["answers"])
    
    prompt = f"""
    You are an experienced career coach and interview expert providing comprehensive feedback to a job candidate who just completed an interview for the {session_data['role']} position at the {session_data['seniority']} level.
    
    INTERVIEW TRANSCRIPT:
    {'\\n\\n'.join(answers_summary)}
    
    EVALUATION CRITERIA:
    For each answer, evaluate based on:
    1. Technical competency and relevance to the role
    2. Depth of knowledge and experience demonstrated
    3. Specificity of examples and evidence provided
    4. Communication clarity and professionalism
    5. Problem-solving approach and critical thinking
    6. Alignment with role requirements and company values
    
    FEEDBACK REQUIREMENTS:
    - Reference specific words/phrases from the candidate's actual response
    - Identify both strengths and areas for improvement in each answer
    - Provide actionable suggestions for improvement
    - Assess how well the answer demonstrates required skills for the role
    - Be constructive but honest in your assessment
    - Frame feedback from the candidate's perspective for self-improvement
    
    OUTPUT FORMAT:
    Return ONLY the following JSON object with no additional text:
    {{{{
      "overall_score": number between 1-10 (weighted average of question-specific scores),
      "summary_strengths": ["specific strength 1", "specific strength 2", "specific strength 3"],
      "development_areas": ["specific area 1", "specific area 2", "specific area 3"],
      "detailed_feedback": [
        {{{{
          "question_asked": "exact question text as provided above",
          "candidate_response": "exact answer text as provided above",
          "rating": number between 1-10,
          "strengths": ["specific positive aspect 1", "specific positive aspect 2"],
          "improvements": ["specific improvement 1", "specific improvement 2"],
          "alignment_to_role": "how well this answer demonstrates relevant skills for the {session_data['role']} role",
          "follow_up_suggestions": ["suggestion 1", "suggestion 2"]
        }}}}
      ],
      "recommendation_summary": "Short (maximum three sentences long) reflective summary of how did the candidate perform with actionable insights",
      "next_steps": "specific next steps for the candidate to improve their interview performance"
    }}}}
    
    CRITICAL: Ensure the 'detailed_feedback' array contains exactly {num_answers} items corresponding to the questions asked.
    Each rating must be justified based on the actual content of the candidate's response.
    """
    
    chat_prompt = ChatPromptTemplate.from_messages([("human", prompt)])
    chain = chat_prompt | llm | JsonOutputParser()
    
    try:
        feedback_json = await chain.ainvoke({})
        print(f"Parsed feedback: {feedback_json}")  
        required_fields = ['overall_score', 'summary_strengths', 'development_areas', 'detailed_feedback', 'recommendation_summary']
        if all(field in feedback_json for field in required_fields):
            mapped_feedback = {
                "overall_score": feedback_json.get('overall_score', 5),
                "strengths": feedback_json.get('summary_strengths', []),
                "weaknesses": feedback_json.get('development_areas', []),
                "question_feedback": [
                    {
                        "question": item.get('question_asked', ''),
                        "answer": item.get('candidate_response', ''),
                        "score": item.get('rating', 5),
                        "feedback": f"Strengths: {', '.join(item.get('strengths', []))}. "
                                   f"Improvements: {', '.join(item.get('improvements', []))}. "
                                   f"Role alignment: {item.get('alignment_to_role', '')}"
                    }
                    for item in feedback_json.get('detailed_feedback', [])
                ],
                "feedback_summary": feedback_json.get('recommendation_summary', 'No recommendation provided')
            }
            session_data["feedback"] = mapped_feedback
            return 
        else:
            print("Missing required fields in parsed feedback")
            print(f"Available fields: {list(feedback_json.keys())}")
        
        session_data["feedback"] = get_fallback_feedback(session_data)
    except Exception as e:
        print(f"Error generating feedback: {e}")
        session_data["feedback"] = get_fallback_feedback(session_data)


@app.get("/interview/feedback")
async def get_feedback(session_id: str = Query(...)):
    """Get the feedback for a completed interview session."""
    if session_id not in sessions:
        raise HTTPException(status_code=404, detail="Session not found")
    
    session_data = sessions[session_id]
    
    if "feedback" not in session_data:
        raise HTTPException(status_code=400, detail="Interview not completed yet")
    
    return session_data["feedback"]


@app.get("/")
async def root():
    """Health check endpoint."""
    return {"message": "Interviewly is up and running!"}