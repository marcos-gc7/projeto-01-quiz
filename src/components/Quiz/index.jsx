import { useState } from 'react'
import { QuestionAnswer } from '../QuestionAnswer'

import S from './styles.module.css'

import { Button } from '../Button'
import { Result } from '../Result'
import { ProgressBar } from '../ProgressBar'

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
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0)
  const [isCurrentQuestionAnswered, setIsCurrentQuestionAnswered] = useState(false)
  const [isTakingQuiz, setIsTakingQuiz] = useState(true)

  const currentQuestionNumber = currentQuestionIndex + 1
  const quizSize = QUESTIONS.length

  const handleAnswerQuestion = (event, question, answer) => {
    if (isCurrentQuestionAnswered) {
      return
    }

    const isCorrectAnswer = question.correctAnswer === answer

    const resultClassName = isCorrectAnswer ? S.correct : S.incorrect
    event.currentTarget.classList.toggle(resultClassName)

    if (isCorrectAnswer) {
      setCorrectAnswersCount(correctAnswersCount + 1)
    }

    setIsCurrentQuestionAnswered(true)
  }

  const handleNextQuestion = () => {
    if (currentQuestionNumber < quizSize) {
      setCurrentQuestionIndex(index => index + 1)
    } else {
      setIsTakingQuiz(false)
    }

    setIsCurrentQuestionAnswered(false)
  }

  const handleTryAgain = () => {
    setIsTakingQuiz(true)
    setCorrectAnswersCount(0)
    setCurrentQuestionIndex(0)
  }

  const currentQuestion = QUESTIONS[currentQuestionIndex]
  const navigationButtonText = currentQuestionNumber === quizSize ? 'Ver Resultado' : 'Próxima Pergunta'

  return (
    <div className={S.container}>
      <div className={S.card}>
        {isTakingQuiz ? (
          <div className={S.quiz}>
            <ProgressBar 
            size={quizSize}
            currentStep={currentQuestionNumber}
            />

          <header className={S.quizHeader}>
            <span className={S.questionCount}>
              PERGUNTA {currentQuestionNumber}/{quizSize}
            </span>
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
              <Button onClick={handleNextQuestion}>
                {navigationButtonText}
              </Button>
            )}
        </div>
        ) : (
          <Result 
          correctAnswersCount={correctAnswersCount}
          quizSize={quizSize}
          handleTryAgain={handleTryAgain}
          />
        )}
      </div>
    </div>
  )
}