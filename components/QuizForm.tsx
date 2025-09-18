'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, ChevronLeft, ChevronRight } from 'lucide-react';
import { QuizAnswers, Question } from '@/types';
import config from '@/data/config.json';

const questions = config.questions as Question[];

export default function QuizForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({
    currency: (searchParams.get('currency') as 'aud' | 'nzd') || undefined,
    experience_level: (searchParams.get('experience_level') as any) || undefined,
    funding: searchParams.get('funding')?.split(',') || [],
    priority: (searchParams.get('priority') as any) || undefined,
  });

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleSingleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleMultipleAnswer = (questionId: string, value: string, checked: boolean) => {
    setAnswers(prev => {
      const currentValues = prev[questionId as keyof QuizAnswers] as string[] || [];
      if (checked) {
        return { ...prev, [questionId]: [...currentValues, value] };
      } else {
        return { ...prev, [questionId]: currentValues.filter(v => v !== value) };
      }
    });
  };

  const isCurrentQuestionAnswered = () => {
    const question = questions[currentQuestion];
    const answer = answers[question.id as keyof QuizAnswers];
    
    if (question.type === 'multiple') {
      return Array.isArray(answer) && answer.length > 0;
    }
    return Boolean(answer);
  };

  const canGoNext = isCurrentQuestionAnswered();
  const canGoPrev = currentQuestion > 0;
  const isLastQuestion = currentQuestion === questions.length - 1;

  const handleNext = () => {
    if (isLastQuestion) {
      handleSubmit();
    } else {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (canGoPrev) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    if (!isCompleteAnswers(answers)) return;

    const params = new URLSearchParams({
      currency: answers.currency!,
      experience_level: answers.experience_level!,
      funding: answers.funding!.join(','),
      priority: answers.priority!,
    });

    router.push(`/results?${params.toString()}`);
  };

  const isCompleteAnswers = (answers: Partial<QuizAnswers>): answers is QuizAnswers => {
    return !!(
      answers.currency &&
      answers.experience_level &&
      answers.funding?.length &&
      answers.priority
    );
  };

  const question = questions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold text-gray-900">
            {question.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {question.type === 'single' ? (
            <RadioGroup
              value={answers[question.id as keyof QuizAnswers] as string || ''}
              onValueChange={(value) => handleSingleAnswer(question.id, value)}
            >
              {question.options.map((option) => (
                <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer font-medium">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          ) : (
            <div className="space-y-3">
              {question.options.map((option) => {
                const isChecked = (answers[question.id as keyof QuizAnswers] as string[] || []).includes(option.value);
                return (
                  <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <Checkbox
                      id={option.value}
                      checked={isChecked}
                      onCheckedChange={(checked) => 
                        handleMultipleAnswer(question.id, option.value, checked as boolean)
                      }
                    />
                    <Label htmlFor={option.value} className="flex-1 cursor-pointer font-medium">
                      {option.label}
                    </Label>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={!canGoPrev}
          className="px-6"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>

        <Button
          onClick={handleNext}
          disabled={!canGoNext}
          className="px-6 bg-blue-600 hover:bg-blue-700"
        >
          {isLastQuestion ? 'Find Matches' : 'Next'}
          {!isLastQuestion && <ChevronRight className="ml-2 h-4 w-4" />}
        </Button>
      </div>

      {/* Sticky Disclaimer */}
      <div className="fixed bottom-0 left-0 right-0 bg-amber-50 border-t border-amber-200 p-4 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center space-x-2 text-sm text-amber-800">
            <AlertTriangle className="h-4 w-4 flex-shrink-0" />
            <span className="font-medium">General information only. Not financial advice.</span>
          </div>
        </div>
      </div>
    </div>
  );
}