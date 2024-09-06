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
  // 入力系は別にリアルタイムである必要はないから、上3つはごっそり消していい
  // submitする時にデータ取得して、modelにいれこんで、そこからデータ作成？

  // console.log(formData, prefixId);

  useEffect(() => {
    setPrefixOption(prefixData[typeOptionIndex].prefix);
  }, [typeOptionIndex]);

  function updateModel() {
    const newModel = { ...formData };
    newModel.prefix = prefixData[typeOptionIndex].prefix[prefixId].prefixText;
    newModel.emoji = prefixData[typeOptionIndex].prefix[prefixId].emoji;
    newModel.emojiCode = prefixData[typeOptionIndex].prefix[prefixId].emojiCode;
    // newModel.summary = summary;
    // newModel.description = description;
    // newModel.issueNumber = issueNumber;
    setFormData(newModel);
  }

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

            {/* selectの内容がかわるたびに、useStateでPrefixの中身を変更する */}

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
              {prefixOption.map((data) => {
                return (
                  <option value={data.id} key={data.id}>
                    {data.emoji} {data.prefixText}: {data.description}
                  </option>
                );
              })}
            </select>
          </FormItem>

          <FormItem>
            <FormLabel htmlFor='summary'>🎁 Summary ({String(summary.length).padStart(2, '0')}/62)</FormLabel>

            <input type='text' id='summary' name='summary' placeholder='add xxx at README' autoComplete='off' onChange={(e) => setSummary(e.target.value)} />
            <FormDescription>add, update, delete. Max chars is 62 (72-(emoji+prefix)).</FormDescription>
          </FormItem>

          <FormItem>
            <FormLabel htmlFor='description'>📝 Description ({String(description.length).padStart(3, '0')})</FormLabel>

            <textarea className='input-textarea' placeholder='Because ~~, I fix ~~.' rows={3} id='description' name='description' onChange={(e) => setDescription(e.target.value)}></textarea>
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

            <textarea className='bg-gray-100 border-dotted border-gray-300' rows={3} name='generatedMessage' id='message-output'>
              🌝✨
            </textarea>
            <FormDescription>One line is summary. Second line is description.</FormDescription>
          </FormItem>

          <FormItem>
            {/* generateを押すと、指定されている内容を全てかきあつめて指定のフォーマットで繋げる */}
            {/* copyはただただコピー */}
            <ul className='flex gap-4 mt-5'>
              <li className='flex-1'>
                <FormButton type='generate' onClick={() => console.log(issueNumberRef.current.valueAsNumber)}>
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
