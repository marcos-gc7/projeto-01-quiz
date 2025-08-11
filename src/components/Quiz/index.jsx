import { useState } from 'react'
import { QuestionAnswer } from '../QuestionAnswer'

import S from './styles.module.css'
import { Button } from '../Button'

const QUESTIONS = [
  {
    id: 1,
    question: 'Qual é o meu nome?',
    answers: ['Miguel', 'Luis', 'Marcos', 'Matheus'],
    correctAnswer: 'Marcos',
  },
  {
    id: 2,
    question: 'Qual é a minha idade?',
    answers: ['15', '22', '18', '25'],
    correctAnswer: '18',
  },
  {
    id: 3,
    question: 'O que eu sou?',
    answers: ['Desenvolvedor', 'Soldado', 'Designer', 'Dropshipper'],
    correctAnswer: 'Desenvolvedor',
  },
  {
    id: 4,
    question: 'Quem é Ivanildo?',
    answers: ['Blade', 'Pelé', 'Tiringa', 'Camavinga'],
    correctAnswer: 'Tiringa',
  }
]

export function Quiz () {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0)
  const [isCurrentQuestionAnswered, setIsCurrentQuestionAnswered] = useState(false)

  const handleAnswerQuestion = (event, question, answer) => {
    if (isCurrentQuestionAnswered) {
      return
    }

    const isCorrectAnswer = question.correctAnswer === answer

    const resultClassName = isCorrectAnswer ? S.correct : S.incorrect
    event.currentTarget.classList.toggle(resultClassName)

    if (isCorrectAnswer) {
      setCorrectAnswerCount(correctAnswerCount + 1)
    }

    setIsCurrentQuestionAnswered(true)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < QUESTIONS.length) {
      setCurrentQuestionIndex(index => index + 1)
    }

    setIsCurrentQuestionAnswered(false)
  }

  const currentQuestion = QUESTIONS[currentQuestionIndex]

  return (
    <div className={S.container}>
      <div className={S.card}>
        <div className={S.quiz}>
          <header className={S.quizHeader}>
            <span className={S.questionCount}>PERGUNTA 1/3</span>
            <p className={S.question}>
              {currentQuestion.question}
            </p>
          </header>

          <ul className={S.answers}>
            {currentQuestion.answers.map(answer => (
              <li key={answer} className={S.answerItem}>
                <QuestionAnswer 
                answer={answer} 
                question={currentQuestion}
                handleAnswerQuestion={handleAnswerQuestion}
                />
              </li>
            ))}
          </ul>

            {isCurrentQuestionAnswered && (
              <Button onClick={handleNextQuestion}>Próxima Pergunta</Button>
            )}
        </div>
      </div>
    </div>
  )
}