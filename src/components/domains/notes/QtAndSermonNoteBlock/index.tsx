'use client'

import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import QtNoteForm from "../QtNoteForm";
import SermonNoteForm from "../SermonNoteForm/SermonNoteForm";
import { TWorshipData } from "@/types/worship.types";
import NoteInputOptions from "../NoteInputOptions";
import { Tables } from "@/types/database.types";

type QtAndSermonNoteBlockProps = {
  worship: Tables<'worships'>
}

const QtAndSermonNoteBlock = ({ worship }: QtAndSermonNoteBlockProps) => {
  const [ viewOptions, setViewOptions ] = useState([
    {
      id: 0,
      name: '날짜',
      isVisible: true,
    },
    {
      id: 1,
      name: '제목',
      isVisible: true,
    },
    {
      id: 2,
      name: '본문',
      isVisible: true,
    },
  ])

  return (
    <div className="h-[calc(100vh-120px)] px-5 bg-white">
      {worship.serviceType === 'DAYBREAK SERVICE' ? (
        <QtNoteForm
          viewOptions={viewOptions} 
          book={worship.book}
          chapters={worship.chapter}
          script={worship.script}
          serviceType={worship.serviceType}
          title={worship.title}
          date={worship.serviceDateString}
        />
      ) : (
        <SermonNoteForm 
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
