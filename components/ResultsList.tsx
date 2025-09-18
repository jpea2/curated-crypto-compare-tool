'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp, Filter, RotateCcw } from 'lucide-react';
import ProviderCard from './ProviderCard';
import { MatchResult, QuizAnswers, ExcludedProvider } from '@/types';
import Link from 'next/link';
import { explainNonMatches } from '@/lib/matchEngine';

interface ResultsListProps {
  results: MatchResult[];
  answers: QuizAnswers;
}

export default function ResultsList({ results, answers }: ResultsListProps) {
  const [showAllMatches, setShowAllMatches] = useState(true);
  const [showExcluded, setShowExcluded] = useState(false);

  const topMatches = results.filter(result => result.isTopMatch);
  const otherMatches = results.filter(result => !result.isTopMatch);

  const displayedResults = showAllMatches ? results : topMatches;

  const excluded: ExcludedProvider[] = explainNonMatches(answers);

  const getAnswerSummary = () => {
    const summary = [];
    summary.push(`${answers.currency.toUpperCase()} currency`);

    const experienceLevels: Record<QuizAnswers['experience_level'], string> = {
      beginner: 'Beginner level',
      intermediate: 'Intermediate level',
      advanced: 'Advanced level'
    };
    summary.push(experienceLevels[answers.experience_level]);

    if (answers.funding.includes('bank_transfer')) summary.push('Bank transfer');
    if (answers.funding.includes('card_buy')) summary.push('Card purchases');

    const priorities: Record<QuizAnswers['priority'], string> = {
      fees: 'Low fees',
      ease: 'Easy setup',
      coins: 'Wide coin range',
      advanced: 'Advanced features'
    };
    summary.push(priorities[answers.priority]);

    return summary;
  };

  return (
    <div className="space-y-8">
      {/* Results Summary */}
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-md border-0">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {results.length} Results
        </h2>
        <p className="text-sm text-gray-500 mb-2">Your Responses</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {getAnswerSummary().map((item, index) => (
            <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
              {item}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Button asChild variant="outline" size="sm">
            <Link href="/quiz">
              <RotateCcw className="w-4 h-4 mr-2" />
              Retake Quiz
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="sm">
            <Link href="/methodology">
              <Filter className="w-4 h-4 mr-2" />
              How Matching Works
            </Link>
          </Button>
        </div>
      </div>

      {/* Top Matches */}
      {topMatches.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Matches</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topMatches.map(result => (
              <ProviderCard 
                key={result.provider.id} 
                result={result} 
                isTopMatch={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* Show All Toggle */}
      {otherMatches.length > 0 && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setShowAllMatches(!showAllMatches)}
            className="px-6"
          >
            {showAllMatches ? (
              <>
                <ChevronUp className="w-4 h-4 mr-2" />
                Show High-Match Only
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-2" />
                Show All {results.length} Matches
              </>
            )}
          </Button>
        </div>
      )}

      {/* All Other Matches */}
      {showAllMatches && otherMatches.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            All Other Matches ({otherMatches.length})
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherMatches.map(result => (
              <ProviderCard 
                key={result.provider.id} 
                result={result} 
                isTopMatch={false}
              />
            ))}
          </div>
        </div>
      )}

      {/* Excluded Providers */}
      {excluded.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center justify-center mb-4">
            <Button
              variant="outline"
              onClick={() => setShowExcluded(!showExcluded)}
              className="px-6"
            >
              {showExcluded ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-2" />
                  Hide Excluded Providers
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-2" />
                  Show Excluded Providers ({excluded.length})
                </>
              )}
            </Button>
          </div>

          {showExcluded && (
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-md border-0">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Why Some Providers Weren't Included</h4>
              <div className="space-y-4">
                {excluded.map(({ provider, reasons }) => (
                  <div key={provider.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="font-medium text-gray-900 mb-2">{provider.name}</div>
                    <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                      {reasons.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* No Results */}
      {results.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">No Exact Matches Found</h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your criteria or selecting different funding options.
          </p>
          <Button asChild>
            <Link href="/quiz">
              <RotateCcw className="w-4 h-4 mr-2" />
              Modify Your Answers
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
