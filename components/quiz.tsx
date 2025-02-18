"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

const mockQuestions: Question[] = [
  {
    id: "1",
    question: "What is compound interest?",
    options: [
      "Interest earned only on the principal amount",
      "Interest earned on both principal and accumulated interest",
      "A fixed interest rate that never changes",
      "Interest paid at the end of a loan term"
    ],
    correctAnswer: 1
  },
  // Add more questions
];

export function Quiz({ onComplete }: { onComplete: () => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const { toast } = useToast();

  const handleAnswer = (answer: number) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const score = newAnswers.filter(
        (ans, idx) => ans === mockQuestions[idx].correctAnswer
      ).length;
      
      toast({
        title: "Quiz Complete!",
        description: `You scored ${score} out of ${mockQuestions.length}`,
      });
      
      onComplete();
    }
  };

  const question = mockQuestions[currentQuestion];

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Quick Quiz</h2>
      <div className="space-y-6">
        <p className="text-lg">{question.question}</p>
        <RadioGroup onValueChange={(value) => handleAnswer(parseInt(value))}>
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={index.toString()} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </Card>
  );
}