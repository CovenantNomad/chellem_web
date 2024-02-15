'use client'

import { useState } from "react";
import Container from "@/components/commons/Container/Container";
import AddNoteHeader from "@/components/domains/notes/AddNoteHeader";
import PlainQtNoteForm from "@/components/domains/notes/PlainQtNoteForm";
import PlainSermonNoteForm from "@/components/domains/notes/PlainSermonNoteForm";
import PlainThanksNoteForm from "@/components/domains/notes/PlainThanksNoteForm";
import PlainDiaryNoteForm from "@/components/domains/notes/PlainDiaryNoteForm";
import PlainContemplationNoteForm from "@/components/domains/notes/PlainContemplationNoteForm";

const AddNotePage = () => {
  const [type, setType] = useState<string>('QT')

  return (
    <Container>
      <AddNoteHeader type={type} setType={setType} />
      <div className="relative h-[calc(100vh-53px)] pt-4 px-4 bg-white">
        {type === 'QT' && <PlainQtNoteForm />}
        {type === 'SERMON' && <PlainSermonNoteForm />}
        {type === 'THANKS' && <PlainThanksNoteForm />}
        {type === 'DIARY' && <PlainDiaryNoteForm />}
        {type === 'CONTEMPLATION' && <PlainContemplationNoteForm />}
      </div>
    </Container>
  );
};

export default AddNotePage;
