// import { useState } from 'react';
import { useState } from 'react';
import './App.css';
import FormButton from './components/FormButton';
import FormDescription from './components/FormDescription';
import FormItem from './components/FormItem';
import FormLabel from './components/FormLabel';
import prefixData from './data/data.json';

console.log(prefixData);

function App() {
  const formModel = {
    type: 'niji',
    prefix: 'Niji',
    prefixEmoji: '🌈',
    summary: 'summary summary',
    description: 'description description',
    issueNumber: 12,
  };
  const [formData, setFormData] = useState(formModel);

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

            <select id='type'>
              {prefixData.map((data) => {
                return (
                  <option value={data.prefixType}>
                    {data.emoji} {data.displayName}
                  </option>
                );
              })}
            </select>
          </FormItem>

          <FormItem>
            <FormLabel htmlFor='prefix'>🧸 Prefix</FormLabel>

            {/* useStateで変更 */}

            <select size={4} id='prefix' name='prefix'>
              {prefixData[0].prefix.map((data) => {
                return (
                  <option value={data.prefixText}>
                    {data.emoji} {data.prefixText}: {data.description}
                  </option>
                );
              })}
            </select>
          </FormItem>

          <FormItem>
            <FormLabel htmlFor='summary'>🎁 Summary</FormLabel>

            <input type='text' id='summary' name='summary' placeholder='add xxx at README' autoComplete='off' />
            <FormDescription>add, update, delete</FormDescription>
          </FormItem>

          <FormItem>
            <FormLabel htmlFor='description'>📝 Description</FormLabel>

            <textarea className='input-textarea' placeholder='Because ~~, I fix ~~.' rows={3} id='description' name='description'></textarea>
          </FormItem>

          <FormItem>
            <FormLabel htmlFor='issue'>📍 Issue Number</FormLabel>

            <input type='number' defaultValue='' name='issue' id='issue' placeholder='XX' autoComplete='off' min='1' max='9999' />
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
                <FormButton type='generate'>GENERATE</FormButton>
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
