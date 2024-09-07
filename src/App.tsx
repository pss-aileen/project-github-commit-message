// import { useState } from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import FormButton from './components/FormButton';
import FormDescription from './components/FormDescription';
import FormItem from './components/FormItem';
import FormLabel from './components/FormLabel';
import data from './data/data.json';
import FormPrefixSelect from './components/FormPrefixSelect';
import FormSummaryInput from './components/FormSummaryInput';
import FormTypeSelect from './components/FormTypeSelect';

function App() {
  const commitMessageInitialData = {
    prefix: '',
    emoji: '',
    emojiCode: '',
    summary: '',
    description: '',
    issueId: null,
  };

  const [selectedTypeId, setSelectedTypeId] = useState('0');
  const [currentPrefixData, setCurrentPrefixData] = useState(data[Number(selectedTypeId)].prefix);
  const [selectedPrefixId, setSelectedPrefixId] = useState(0);
  const [commitMessageData, setCommitMessageData] = useState<{
    prefix: string;
    emoji: string;
    emojiCode: string;
    summary: string | null;
    description: string | null;
    issueId: string | null;
  }>(commitMessageInitialData);
  const [summary, setSummary] = useState('');
  const [previousSummary, setPreviousSummary] = useState('');
  const [description, setDescription] = useState('');
  const [issueId, setIssueId] = useState('');
  const [generatedCommitMessage, setGeneratedCommitMessage] = useState('🌝✨');
  const [previewCommitMessage, setPreviewCommitMessage] = useState('Preview is showen here.');
  const [isFirstLoad, setIsFirstLoad] = useState(false);
  const [copyButtonText, setCopyButtonText] = useState('COPY');

  useEffect(() => {
    setCurrentPrefixData(data[Number(selectedTypeId)].prefix);
    setSelectedPrefixId(0);
  }, [selectedTypeId]);

  useEffect(() => {
    excuteOption();
  }, [currentPrefixData]);

  useEffect(() => {
    if (!isFirstLoad) return;

    let generatedCommitMessage = '';
    const prefix = `${commitMessageData.emojiCode} ${commitMessageData.prefix}:`;
    generatedCommitMessage += prefix;
    if (summary) generatedCommitMessage += ' ' + summary;
    if (issueId) generatedCommitMessage += ' #' + issueId;
    if (description) generatedCommitMessage += '\n' + description;

    setGeneratedCommitMessage(generatedCommitMessage);
    setPreviewCommitMessage(`${commitMessageData.emoji} ${commitMessageData.prefix}: ${summary} ${issueId ? `#` + issueId : ''}`);
  }, [commitMessageData]);

  function updateSelectedPrefixId(id: number) {
    setSelectedPrefixId(id);
  }

  function excuteOption() {
    const selectedPrefix = currentPrefixData[selectedPrefixId];
    const currentPrefix = 'option' in selectedPrefix ? selectedPrefix.option : undefined;
    if (!currentPrefix) {
      setSummary(previousSummary);
      return;
    }
    if (currentPrefix === 'tilDateSet') {
      const today = new Date();
      const year = today.getFullYear();
      const day = today.getDate();
      const monthShortName = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(today);

      const newSummary = `${day.toString().padStart(2, '0')} ${monthShortName} ${year} Report`;
      setPreviousSummary(summary);
      setSummary(newSummary);
    }
  }

  // button function
  function updateCommitMessageData() {
    const newData = {
      prefix: currentPrefixData[selectedPrefixId].prefixText,
      emoji: currentPrefixData[selectedPrefixId].emoji,
      emojiCode: currentPrefixData[selectedPrefixId].emojiCode,
      summary: summary || '', // summary が null の場合は空文字に設定
      description: description || '', // description が null の場合は空文字に設定
      issueId: issueId || null, // issueId が null の場合はそのまま
    };

    setCommitMessageData(newData);
    setIsFirstLoad(true);
  }

  // reset button
  function reset() {
    setSummary('');
    setPreviousSummary('');
    setDescription('');
    setIssueId('');
    setGeneratedCommitMessage('🧙🪄');
    setPreviewCommitMessage('Preview is showen here.');
  }

  // copy button
  function copy() {
    const text = generatedCommitMessage;
    navigator.clipboard.writeText(text);
    setCopyButtonText('CLIPED!');
    setTimeout(() => {
      setCopyButtonText('COPY');
    }, 1000);
  }

  return (
    <>
      <div className='font-mono text-gray-700 mx-auto mb-10 mt-10 max-w-xl px-5'>
        <div className='flex items-center justify-between gap-4'>
          <h1 className='text-3xl font-bold text-pink-600'>Commit Easily</h1>

          <FormButton type='reset' onClick={reset}>
            RESET
          </FormButton>
        </div>

        <form className='mt-8'>
          <FormItem>
            <FormLabel htmlFor='type'>📦 Type</FormLabel>

            <FormTypeSelect selectedTypeId={selectedTypeId} onUpdate={setSelectedTypeId} data={data} />
          </FormItem>

          <FormItem>
            <FormLabel htmlFor='prefix'>🧸 Prefix</FormLabel>

            <FormPrefixSelect data={currentPrefixData} onUpdate={updateSelectedPrefixId} selectedPrefixId={selectedPrefixId} />
          </FormItem>

          <FormItem>
            <FormLabel htmlFor='summary'>🎁 Summary ({String(summary.length).padStart(2, '0')}/62)</FormLabel>

            <FormSummaryInput summary={summary} setSummary={setSummary} />
            <FormDescription>add, update, delete. Max chars is 62 (72-(emoji+prefix)).</FormDescription>
          </FormItem>

          <FormItem>
            <FormLabel htmlFor='description'>📝 Description ({String(description.length).padStart(3, '0')})</FormLabel>

            <textarea className='input-textarea' placeholder='Because ~~, I fix ~~.' rows={3} id='description' name='description' onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
          </FormItem>

          <FormItem>
            <FormLabel htmlFor='issue'>📍 Issue Number</FormLabel>

            <input type='number' value={issueId} name='issue' id='issue' placeholder='XX' autoComplete='off' min='1' max='9999' onChange={(e) => setIssueId(e.target.value)} />
            {/* <FormDescription>This value will be saved in LocalStorage.</FormDescription> */}
          </FormItem>

          <FormItem>
            <FormLabel htmlFor='message-output'>🔮 Generated Commit Message</FormLabel>

            {/* 余力があればgitも作る、一旦そのまま */}
            {/* <select>
              <option value=''>GitHub Desktop</option>
              <option value=''>git</option>
            </select> */}

            <input type='text' name='' id='' value={previewCommitMessage} onChange={(e) => setPreviewCommitMessage(e.target.value)} readOnly />
            <textarea className='bg-gray-100 border-dotted border-gray-300' rows={3} name='generatedMessage' id='message-output' value={generatedCommitMessage} onChange={(e) => setGeneratedCommitMessage(e.target.value)}></textarea>
            <FormDescription>The first line is the summary. The second line is the description.</FormDescription>
          </FormItem>

          <FormItem>
            <ul className='flex gap-4 mt-5'>
              <li className='flex-1'>
                <FormButton type='generate' onClick={updateCommitMessageData}>
                  GENERATE
                </FormButton>
              </li>
              <li className='flex-1'>
                <FormButton type='copy' onClick={copy}>
                  {copyButtonText}
                </FormButton>
              </li>
            </ul>
          </FormItem>
        </form>

        <footer className='mt-8'>
          <small className='text-sm'>
            {'\u00A9'} Commit Easily by{' '}
            <a href='https://github.com/pss-aileen' className='text-pink-700'>
              Aileen
            </a>
          </small>
        </footer>
      </div>
    </>
  );
}

export default App;
