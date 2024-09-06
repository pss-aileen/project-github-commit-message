// import { useState } from 'react';
import { useEffect, useRef, useState } from 'react';
import './App.css';
import FormButton from './components/FormButton';
import FormDescription from './components/FormDescription';
import FormItem from './components/FormItem';
import FormLabel from './components/FormLabel';
import data from './data/data.json';
import formModel from './data/formModel';
import FormPrefixOption from './components/FormPrefixOption';
import FormPrefixSelect from './components/FormPrefixSelect';
import FormSummaryInput from './components/FormSummaryInput';
import FormTypeSelect from './components/FormTypeSelect';

function App() {
  const commitMessageInitialData = {
    prefix: '',
    emoji: '',
    summary: '',
    description: '',
    issueId: null,
    option: null,
  };

  const [selectedTypeId, setSelectedTypeId] = useState('0');
  const [currentPrefixData, setCurrentPrefixData] = useState(data[Number(selectedTypeId)].prefix);
  const [selectedPrefixId, setSelectedPrefixId] = useState(0);
  const [commitMessageData, setCommitMessageData] = useState(commitMessageInitialData);
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [issueId, setIssueId] = useState('');
  const [option, setOption] = useState('');
  const [generatedCommitMessage, setGeneratedCommitMessage] = useState('🌝✨');
  const [isFirstLoad, setIsFirstLoad] = useState(false);

  useEffect(() => {
    setCurrentPrefixData(data[Number(selectedTypeId)].prefix);
    setSelectedPrefixId(0);
  }, [selectedTypeId]);

  // console.log('selectedTypeId: ', selectedTypeId);
  // console.log('selectedPrefixId: ', selectedPrefixId);

  function updateSelectedPrefixId(id: number) {
    setSelectedPrefixId(id);
  }

  function updateCommitMessageData() {
    const newData = {
      prefix: currentPrefixData[selectedPrefixId].prefixText,
      emoji: currentPrefixData[selectedPrefixId].emoji,
      summary: summary ? summary : null,
      description: description ? description : null,
      issueId: issueId ? issueId : null,
      option: null,
    };

    setCommitMessageData(newData);
    setIsFirstLoad(true);
    console.log(newData);
  }

  useEffect(() => {
    if (!isFirstLoad) return;

    let generatedCommitMessage = '';
    const prefix = `${commitMessageData.emoji} ${commitMessageData.prefix}:`;
    generatedCommitMessage += prefix;
    if (summary) generatedCommitMessage += ' ' + summary;
    if (issueId) generatedCommitMessage += ' #' + issueId;
    if (description) generatedCommitMessage += '\n' + description;

    setGeneratedCommitMessage(generatedCommitMessage);
  }, [commitMessageData]);

  return (
    <>
      <div className='font-mono text-gray-700 mx-auto mb-10 mt-10 max-w-xl px-5'>
        <div className='flex items-center justify-between gap-4'>
          <h1 className='text-3xl font-bold text-pink-600'>Commit Easily</h1>

          <FormButton type='reset'>RESET</FormButton>
        </div>

        <form>
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
            <FormDescription>This value will be saved in LocalStorage.</FormDescription>
          </FormItem>

          <FormItem>
            <FormLabel htmlFor=''>🔮 Generated Commit Message</FormLabel>

            <select>
              <option value=''>GitHub Desktop</option>
              <option value=''>git</option>
            </select>

            <textarea className='bg-gray-100 border-dotted border-gray-300' rows={3} name='generatedMessage' id='message-output' value={generatedCommitMessage} onChange={(e) => setGeneratedCommitMessage(e.target.value)}></textarea>
            <FormDescription>One line is summary. Second line is description.</FormDescription>
          </FormItem>

          <FormItem>
            <ul className='flex gap-4 mt-5'>
              <li className='flex-1'>
                <FormButton type='generate' onClick={updateCommitMessageData}>
                  GENERATE
                </FormButton>
              </li>
              <li className='flex-1'>
                <FormButton type='copy'>COPY</FormButton>
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
