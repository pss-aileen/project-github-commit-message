// import { useState } from 'react';
import { useEffect, useRef, useState } from 'react';
import './App.css';
import FormButton from './components/FormButton';
import FormDescription from './components/FormDescription';
import FormItem from './components/FormItem';
import FormLabel from './components/FormLabel';
import prefixData from './data/data.json';

// console.log(prefixData);

function App() {
  const formModel = {
    type: 'init',
    prefix: 'init',
    emoji: 'init',
    emojiCode: 'init',
    summary: 'init',
    description: 'init',
    issueNumber: '',
  };

  const [formData, setFormData] = useState(formModel);
  const [typeOptionIndex, setTypeOptionIndex] = useState(0);
  const [prefixOption, setPrefixOption] = useState(prefixData[typeOptionIndex].prefix);
  const [prefixId, setPrefixId] = useState(0);
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const issueNumberRef = useRef(0);
  const [message, setMessage] = useState('🌝✨');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setPrefixOption(prefixData[typeOptionIndex].prefix);
    console.log('setPrefixOption');
  }, [typeOptionIndex]);

  function updateModel() {
    const newModel = { ...formData };
    newModel.prefix = prefixData[typeOptionIndex].prefix[prefixId].prefixText;
    newModel.emoji = prefixData[typeOptionIndex].prefix[prefixId].emoji;
    newModel.emojiCode = prefixData[typeOptionIndex].prefix[prefixId].emojiCode;
    newModel.summary = summary;
    newModel.description = description;
    newModel.issueNumber = issueNumberRef.current.valueAsNumber;
    setFormData(newModel);
    setLoaded(true);
    console.log('update model');
  }

  useEffect(() => {
    if (!loaded) return; // 初回ロード時またはロードが完了していない場合は何もしない

    const content = `${formData.emoji} ${formData.prefix}: ${formData.summary} #${formData.issueNumber}` + `\n` + description;
    setMessage(content);
    console.log(content);
  }, [formData]);

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

            <select id='type' onChange={(e) => setTypeOptionIndex(e.target.value)}>
              {prefixData.map((data, index) => {
                return (
                  <option value={index} key={data.id}>
                    {data.emoji} {data.displayName}
                  </option>
                );
              })}
            </select>
          </FormItem>

          <FormItem>
            <FormLabel htmlFor='prefix'>🧸 Prefix</FormLabel>

            <select size={4} id='prefix' name='prefix' onChange={(e) => setPrefixId(e.target.value)}>
              {prefixOption.map((data, index) => {
                const selected = index === 0 ? true : false;
                return (
                  <option value={data.id} key={data.id} selected={selected}>
                    {data.emoji} {data.prefixText}: {data.description}
                  </option>
                );
              })}
            </select>
          </FormItem>

          <FormItem>
            <FormLabel htmlFor='summary'>🎁 Summary ({String(summary.length).padStart(2, '0')}/62)</FormLabel>

            <input type='text' id='summary' name='summary' placeholder='add xxx at README' autoComplete='off' onChange={(e) => setSummary(e.target.value)} value={summary} />
            <FormDescription>add, update, delete. Max chars is 62 (72-(emoji+prefix)).</FormDescription>
          </FormItem>

          <FormItem>
            <FormLabel htmlFor='description'>📝 Description ({String(description.length).padStart(3, '0')})</FormLabel>

            <textarea className='input-textarea' placeholder='Because ~~, I fix ~~.' rows={3} id='description' name='description' onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
          </FormItem>

          <FormItem>
            <FormLabel htmlFor='issue'>📍 Issue Number</FormLabel>

            <input type='number' defaultValue='' name='issue' id='issue' placeholder='XX' autoComplete='off' min='1' max='9999' ref={issueNumberRef} />
            <FormDescription>This value will be saved in LocalStorage.</FormDescription>
          </FormItem>

          <FormItem>
            <FormLabel htmlFor=''>🔮 Generated Commit Message</FormLabel>

            <select>
              <option value=''>GitHub Desktop</option>
              <option value=''>git</option>
            </select>

            <textarea className='bg-gray-100 border-dotted border-gray-300' rows={3} name='generatedMessage' id='message-output' value={message}></textarea>
            <FormDescription>One line is summary. Second line is description.</FormDescription>
          </FormItem>

          <FormItem>
            <ul className='flex gap-4 mt-5'>
              <li className='flex-1'>
                <FormButton type='generate' onClick={updateModel}>
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
