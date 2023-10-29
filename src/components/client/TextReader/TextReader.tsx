import React, { useState, useEffect, ChangeEvent } from 'react';
import { useSelectedFiles } from '../Files/FilesProvider';
import Api from '@/app/api';
import { Button, Input } from 'antd';

const TextReader = () => {
  const { currentPlay, selected } = useSelectedFiles();
  const [text, setText] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const { TextArea } = Input;

  useEffect(() => {
    fetch(currentPlay.path)
      .then((r) => r.text())
      .then((text) => {
        setText(text);
        console.log('text decoded:', text);
      });
  }, [currentPlay.path]);

  const saveText = async () => {
    const fileName = currentPlay.path.split('/').pop();
    if (text !== '') {
      try {
        const response = await Api.Files.updateText(fileName!, text);
        console.log(fileName);
        setIsEditing(false); // Exit edit mode after saving
        console.log('Text saved successfully', response.data);
      } catch (error) {
        console.error('Failed to save text:', error);
      }
    } else {
      console.log('text field is not changed');
    }
  };

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <div className="bg-white min-h-[500px]">
      <div className="p-[10px]">
        <TextArea
          className="bg-slate-400 p-[15px] w-[100%]"
          onChange={handleTextChange}
          value={text}
          onClick={() => setIsEditing(true)}
          // Use autoSize to make the input field grow with the content
          autoSize={{ minRows: 10, maxRows: 20 }}
        />
      </div>
      {isEditing && (
        <div className="p-[10px]">
          <Button onClick={saveText}>Save</Button>
        </div>
      )}
    </div>
  );
};

export default TextReader;
