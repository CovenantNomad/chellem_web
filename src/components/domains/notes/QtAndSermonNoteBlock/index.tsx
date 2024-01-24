'use client'

import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import QtNoteForm from "../QtNoteForm";
import SermonNoteForm from "../SermonNoteForm/SermonNoteForm";
import { TWorshipData } from "@/types/worship.types";
import NoteInputOptions from "../NoteInputOptions";

type QtAndSermonNoteBlockProps = {
  worship: TWorshipData
}

const defaultViewOptions = [
  {
    id: 0,
    name: 'date',
    isVisible: true,
  },
  {
    id: 1,
    name: 'title',
    isVisible: false,
  },
  {
    id: 2,
    name: 'script',
    isVisible: false,
  },
]

const QtAndSermonNoteBlock = ({ worship }: QtAndSermonNoteBlockProps) => {
  const [isSermonNote, setIsSermonNote] = useState(false)
  const [ viewOptions, setViewOptions ] = useState([
    {
      id: 0,
      name: '날짜',
      isVisible: true,
    },
    {
      id: 1,
      name: '제목',
      isVisible: worship.title ? false : true,
    },
    {
      id: 2,
      name: '본문',
      isVisible: worship.script ? false : true,
    },
  ])

  return (
    <div>
      <div className="flex justify-between items-center px-2">
        <div className="flex justify-center items-center gap-x-3 py-3">
          <span className="inline-block text-sm">QT노트</span>
          <Switch 
            checked={isSermonNote}
            onCheckedChange={setIsSermonNote}
          />
          <span className="inline-block text-sm">설교노트</span>
        </div>
        <NoteInputOptions 
          viewOptions={viewOptions}
          setViewOptions={setViewOptions}
        />
      </div>
      {isSermonNote ? (
        <SermonNoteForm />
      ) : (
        <QtNoteForm
          viewOptions={viewOptions} 
          book={worship.book}
          chapters={worship.chapter}
          script={worship.script}
          serviceType={worship.serviceType}
          title={worship.title}
          date={worship.serviceDateString}
        />
      )}
    </div>
  );
};

export default QtAndSermonNoteBlock;
