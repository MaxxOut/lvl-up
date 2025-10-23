import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import type { WordModel } from '@models/word';
import { getLibrary, saveLibrary } from '@utils/local-storage';
// import WordSelection from '../components/WordSelection';
// import WordTranslation from '../components/WordTranslation';
// import WordConstructor from '../components/WordConstructor';
// import WordManualInput from '../components/WordManualInput';
// import LearningResultsDisplay from '../components/LearningResultsDisplay';
// import ArrowLeftIcon from '../components/icons/ArrowLeftIcon';
import { useSettings } from '@contexts/SettingsContext'; // Предположим, у вас есть такой контекст

type LearningStage = 'intro' | 'selection' | 'translation' | 'reverse_translation' | 'constructor' | 'manual_input' | 'results';

const LearningPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const settings = useSettings(); // Используем контекст настроек

  const [unlearnedWords, setUnlearnedWords] = useState<WordModel[]>([]);
  const [currentWord, setCurrentWord] = useState<WordModel | null>(null);
  const [currentStage, setCurrentStage] = useState<LearningStage>('intro');
  const [hasErrors, setHasErrors] = useState(false);
  const [learnedWords, setLearnedWords] = useState<WordModel[]>([]);
  const [sessionWords, setSessionWords] = useState<WordModel[]>([]);
  const [stageList, setStageList] = useState<string[]>([]); // Динамический список этапов
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  useEffect(() => {
    // Формируем список этапов на основе настроек
    const stages = [];
    if (settings.translationStep) stages.push('translation', 'reverse_translation');
    if (settings.constructorStep) stages.push('constructor');
    if (settings.manualInputStep) stages.push('manual_input');
    setStageList(stages);

    // Загружаем слова
    const allWords = getLibrary();
    const wordsForLearning = allWords.filter(word => !word.learnedAt && !word.ignored);
    if (wordsForLearning.length > 0) {
      setUnlearnedWords(wordsForLearning);
      setSessionWords(wordsForLearning);
      setCurrentWord(wordsForLearning[0]);
    }
  }, [settings]);

  const handleNextStage = useCallback(() => {
    const nextIndex = currentStageIndex + 1;
    if (nextIndex < stageList.length) {
      setCurrentStageIndex(nextIndex);
      setCurrentStage(stageList[nextIndex] as LearningStage);
    } else {
      // Все этапы для текущего слова пройдены
      completeWord(hasErrors);
    }
  }, [currentStageIndex, stageList, hasErrors, completeWord]);

  // ... (Остальная логика, включая handleFail, completeWord, и т.д.)

  const handleStartLearning = useCallback(() => {
    setCurrentStage('selection');
    setCurrentStageIndex(0); // Начинаем с первого этапа в списке
  }, []);

  // ... (JSX-разметка с условным рендерингом)
};

export default LearningPage;