import { useState, useRef } from 'react';

export const useTerminal = () => {
  const [animatedLines, setAnimatedLines] = useState([]);
  const [startAnimation, setStartAnimation] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentProject, setCurrentProject] = useState('LockChain');
  const intervalRef = useRef(null);

  const cleanupTerminal = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setAnimatedLines([]);
    setStartAnimation(false);
    setIsAnalyzing(false);
  };

  const handleAnalyze = async (projectId = 'LockChain') => {
    try {
      setCurrentProject(projectId);
      setAnimatedLines([]);
      setIsAnalyzing(true);
      
      setAnimatedLines(prev => [...prev, 'git ls-files | xargs tokei --output json']);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
      try {
        // Always use relative URL for API calls - works in both production and development
        const apiUrl = '/api/analyze?project=' + projectId;
          
        console.log(`Analyzing ${projectId} project using API endpoint: ${apiUrl}`);
        const res = await fetch(apiUrl);        if (!res.ok) {
          throw new Error(`API responded with status: ${res.status}`);
        }
        
        const data = await res.json();
      const lines = categorizeAndFormatStats(data, projectId);
      
      let i = 0;
      setStartAnimation(true);        intervalRef.current = setInterval(() => {
          if (i < lines.length) {
            setAnimatedLines(prev => [...prev, lines[i]]);
            i++;
          } else {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            setIsAnalyzing(false);
          }
        }, 100);
      } catch (analysisError) {
        console.error('Analysis error:', analysisError);
        setAnimatedLines(prev => [
          ...prev,
          'Error: Failed to analyze code',
          `Details: ${analysisError.message}`,
          '',
          'Please check the console for more information.'
        ]);
        setIsAnalyzing(false);
      }

    } catch (err) {
      console.error('Code analysis error:', err);
      setAnimatedLines([
        'Error: Unexpected issue during code analysis',
        `Details: ${err.message}`,
        '',
        'Please check the console for more information.'
      ]);
      setIsAnalyzing(false);
    }
  };

  const categorizeAndFormatStats = (stats, projectId) => {
    const categorized = {
      '📦 Backend': [],
      '📱 App Fragments (Kotlin / Java)': [],
      '🎨 Layout & Config Files': [],
      '📊 Build / Misc': [],
    };

    const displayedLanguages = {};
    
    for (const [lang, info] of Object.entries(stats)) {
      if (lang === 'Total') continue;
      
      displayedLanguages[lang] = info.code;
      
      let line = `${lang}: ${info.code.toLocaleString()} lines`;
      
      // Add comments to certain languages
      if (projectId === 'LockChain' && (lang === 'JavaScript' || lang === 'TypeScript')) {
        line = `${lang}: ${info.code.toLocaleString()} lines # Build files`;
      } else if (lang === 'JSON') {
        line = `${lang}: ${info.code.toLocaleString()} lines # Mostly configuration files`;
      }

      if (['Kotlin', 'Java'].includes(lang)) {
        categorized['📱 App Fragments (Kotlin / Java)'].push(line);
      } else if (['XML', 'HTML'].includes(lang)) {
        categorized['🎨 Layout & Config Files'].push(line);
      } else if (lang === 'JSON') {
        categorized['🎨 Layout & Config Files'].push(line);
      } else if (['TypeScript', 'JavaScript'].includes(lang)) {
        categorized['📦 Backend'].push(line);
      } else {
        categorized['📊 Build / Misc'].push(line);
      }
    }

    const allLines = [
      'git ls-files | xargs cloc --git --exclude-dir=node_modules,dist,build,vendor,external',
      'cloc v1.92  T=0.10 s (872.0 files/s, 89422.0 lines/s)',
      '-------------------------------------------------------------------------------',
      'Language                     files          blank        comment           code',
      '-------------------------------------------------------------------------------',
      ...categorized['📦 Backend'],
      ...categorized['📱 App Fragments (Kotlin / Java)'],
      ...categorized['🎨 Layout & Config Files'],
      ...categorized['📊 Build / Misc'],
      '-------------------------------------------------------------------------------',
    ];

    const displayedTotal = Object.values(displayedLanguages).reduce((acc, curr) => acc + curr, 0);
    
    allLines.push('');
    allLines.push(`📊 SUMMARY: ${displayedTotal.toLocaleString()} lines of code # Displayed languages only`);

    return allLines;
  }

  return {
    animatedLines,
    isAnalyzing,
    handleAnalyze,
    cleanupTerminal
  };
};
